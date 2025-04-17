const express = require('express');
const axios = require('axios');
const { VapiClient } = require('@vapi-ai/server-sdk');

require('dotenv').config();

const app = express();
app.use(express.json());

const vapi = new VapiClient({ token: process.env.VAPI_API_KEY });

// Store language preferences and state for each call
const callStore = new Map();

// Default supported languages
const supportedLanguages = [
  'English', 'Spanish', 'French', 'German', 'Italian', 
  'Portuguese', 'Chinese', 'Japanese', 'Korean', 'Russian',
  'Arabic', 'Hindi', 'Dutch', 'Swedish', 'Greek'
];

// Health check endpoint
app.get('/', (req, res) => {
  res.send('✅ Voice Translator server is up and running!');
});

// Debug endpoint to see active calls
app.get('/debug/calls', (req, res) => {
  const callData = Array.from(callStore.entries()).map(([callId, data]) => ({
    callId,
    ...data
  }));
  res.json({ activeCalls: callData });
});

app.post('/vapi/events', async (req, res) => {
  const { type, callId, transcription, channel, payload } = req.body;
  console.log(`📥 Received event: ${type} for call ${callId} on channel ${channel}`);
  
  // Respond immediately to meet webhook timing requirements
  res.sendStatus(200);
  
  // Handle call start event
  if (type === 'call-start') {
    console.log(`🟢 New call started: ${callId}`);
    callStore.set(callId, { 
      customerLang: null,
      assistantLang: null,
      stage: 'language-selection',
      lastUpdated: new Date()
    });
    
    // Welcome the user and ask for language preference
    try {
      await vapi.calls.speak(callId, {
        channel: 'assistant',
        text: 'Welcome to the language translator. Please say your preferred language or say "detect" to auto-detect your language.',
      });
    } catch (e) {
      console.error('Error in welcome message:', e);
    }
    return;
  }
  
  // Handle call end and clean up
  if (type === 'call-end') {
    console.log(`🔴 Call ended: ${callId}`);
    callStore.delete(callId);
    return;
  }
  
  if (type === 'transcriber-response' && transcription) {
    try {
      console.log(`🎤 Transcription: "${transcription}" on channel ${channel}`);
      
      // Get or initialize call data
      if (!callStore.has(callId)) {
        callStore.set(callId, { 
          customerLang: null, 
          assistantLang: null,
          stage: 'language-selection',
          lastUpdated: new Date()
        });
      }
      
      const callData = callStore.get(callId);
      
      // Handle language selection stage
      if (callData.stage === 'language-selection' && channel === 'customer') {
        // Check if the user said "detect"
        if (transcription.toLowerCase().includes('detect')) {
          await handleLanguageDetection(callId, transcription, channel);
          return;
        }
        
        // Check if user specified a supported language
        const requestedLang = findMatchingLanguage(transcription);
        
        if (requestedLang) {
          callData.customerLang = requestedLang;
          // Set opposite side to English by default, can be changed later
          callData.assistantLang = requestedLang === 'English' ? 'Spanish' : 'English';
          callData.stage = 'translation';
          callStore.set(callId, callData);
          
          await vapi.calls.speak(callId, {
            channel: 'assistant',
            text: `I'll translate from ${callData.customerLang} to ${callData.assistantLang}. You can say "switch languages" at any time to swap them.`,
          });
          console.log(`🔄 Set languages: Customer=${callData.customerLang}, Assistant=${callData.assistantLang}`);
        } else {
          // Language not recognized
          await vapi.calls.speak(callId, {
            channel: 'assistant',
            text: `I didn't recognize that language. Please choose from: English, Spanish, French, German, or say "detect" to auto-detect.`,
          });
        }
        return;
      }
      
      // Handle language switching command
      if (transcription.toLowerCase().includes('switch language') || 
          transcription.toLowerCase().includes('change language')) {
        const temp = callData.customerLang;
        callData.customerLang = callData.assistantLang;
        callData.assistantLang = temp;
        callStore.set(callId, callData);
        
        await vapi.calls.speak(callId, {
          channel: 'assistant',
          text: `Languages switched. Now translating from ${callData.customerLang} to ${callData.assistantLang}.`,
        });
        console.log(`🔄 Languages switched: Customer=${callData.customerLang}, Assistant=${callData.assistantLang}`);
        return;
      }
      
      // Perform translation if we're in translation stage
      if (callData.stage === 'translation') {
        await translateAndSpeak(callId, transcription, channel, callData);
      }
    } catch (e) {
      console.error('❌ Error processing transcription:', e);
    }
  }
});

// Helper to find a matching language from user input
function findMatchingLanguage(input) {
  const normalizedInput = input.toLowerCase().trim();
  
  for (const lang of supportedLanguages) {
    if (normalizedInput.includes(lang.toLowerCase())) {
      return lang;
    }
  }
  
  return null;
}

// Handle language detection
async function handleLanguageDetection(callId, transcription, channel) {
  try {
    console.log(`🔍 Attempting to detect language for: "${transcription}"`);
    
    // Use OpenAI to detect the language
    const { data } = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: 'Detect the language of the following text. Respond with only the language name in English, e.g., "English", "Spanish", "French", etc.' },
          { role: 'user', content: transcription }
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    
    const detectedLang = data.choices[0].message.content.trim();
    console.log(`🔍 Detected language: ${detectedLang}`);
    
    const callData = callStore.get(callId);
    
    // Check if detected language is supported
    if (supportedLanguages.some(lang => detectedLang.toLowerCase().includes(lang.toLowerCase()))) {
      const matchedLang = supportedLanguages.find(lang => 
        detectedLang.toLowerCase().includes(lang.toLowerCase())
      );
      
      callData.customerLang = matchedLang;
      callData.assistantLang = matchedLang === 'English' ? 'Spanish' : 'English';
      callData.stage = 'translation';
      callStore.set(callId, callData);
      
      await vapi.calls.speak(callId, {
        channel: 'assistant',
        text: `I detected ${callData.customerLang}. I'll translate to ${callData.assistantLang}.`,
      });
    } else {
      await vapi.calls.speak(callId, {
        channel: 'assistant',
        text: `I couldn't confidently detect your language. Please specify your language in English.`,
      });
    }
  } catch (e) {
    console.error('❌ Error detecting language:', e);
    
    // Fallback to asking the user to specify
    await vapi.calls.speak(callId, {
      channel: 'assistant',
      text: `I'm having trouble detecting your language. Please specify your language in English.`,
    });
  }
}

// Translate and speak the translation
async function translateAndSpeak(callId, transcription, channel, callData) {
  try {
    let sourceLang, targetLang;
    
    if (channel === 'customer') {
      sourceLang = callData.customerLang;
      targetLang = callData.assistantLang;
    } else {
      sourceLang = callData.assistantLang;
      targetLang = callData.customerLang;
    }
    
    console.log(`🔄 Translating from ${sourceLang} to ${targetLang}: "${transcription}"`);
    
    const { data } = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: `Translate from ${sourceLang} to ${targetLang}. Provide only the translation, no explanations.` },
          { role: 'user', content: transcription }
        ],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );
    
    const translated = data.choices[0].message.content.trim();
    console.log(`📢 Translated: "${translated}"`);
    
    const speakChannel = channel === 'customer' ? 'assistant' : 'customer';
    
    await vapi.calls.speak(callId, {
      channel: speakChannel,
      text: translated,
    });
    
    // Update last activity timestamp
    callData.lastUpdated = new Date();
    callStore.set(callId, callData);
  } catch (e) {
    console.error('❌ Error translating/TTS:', e);
  }
}

// Clean up old calls every 15 minutes
setInterval(() => {
  const now = new Date();
  for (const [callId, data] of callStore.entries()) {
    // Remove calls that haven't been updated in 30 minutes
    if ((now - data.lastUpdated) > 30 * 60 * 1000) {
      console.log(`🧹 Cleaning up inactive call: ${callId}`);
      callStore.delete(callId);
    }
  }
}, 15 * 60 * 1000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server listening on http://localhost:${PORT}`));
