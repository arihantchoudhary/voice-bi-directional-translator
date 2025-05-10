// Echo Translator Service with LLM Support
// This code sets up a phone number that repeats what you say in a different language
// with support for both traditional machine translation and LLM-based translation

require('dotenv').config();
const express = require('express');
const { Translate } = require('@google-cloud/translate').v2;
const VoiceResponse = require('twilio').twiml.VoiceResponse;
const axios = require('axios');
const { redis } = require('./redis-client'); // For caching responses

// Initialize express app
const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Initialize Google Translate
const translate = new Translate({
  projectId: process.env.GOOGLE_PROJECT_ID,
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS,
});

// Available languages and their codes
const LANGUAGES = {
  'spanish': 'es',
  'french': 'fr',
  'german': 'de',
  'italian': 'it',
  'japanese': 'ja',
  'mandarin': 'zh',
  'korean': 'ko',
  'russian': 'ru',
  'portuguese': 'pt',
  'arabic': 'ar'
};

// Translation method options
const TRANSLATION_METHODS = {
  'llm': 'LLM Translation',
  'machine': 'Machine Translation'
};

// Cache configuration
const CACHE_TTL = 60 * 60; // 1 hour in seconds

// LLM translation function
async function translateWithLLM(text, targetLanguage) {
  // Check cache first
  const cacheKey = `llm:${text}:${targetLanguage}`;
  const cachedTranslation = await redis.get(cacheKey);
  
  if (cachedTranslation) {
    console.log('Cache hit for LLM translation');
    return cachedTranslation;
  }
  
  try {
    // Using OpenAI API as an example - replace with your preferred LLM provider
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: process.env.LLM_MODEL || "gpt-4",
        messages: [
          {
            role: "system",
            content: `You are a professional translator. Translate the following text to ${targetLanguage}. Return only the translation, nothing else.`
          },
          {
            role: "user",
            content: text
          }
        ],
        temperature: 0.3, // Lower temperature for more consistent translations
        max_tokens: 1000
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );
    
    const translation = response.data.choices[0].message.content.trim();
    
    // Cache the result
    await redis.set(cacheKey, translation, 'EX', CACHE_TTL);
    
    return translation;
  } catch (error) {
    console.error('LLM translation error:', error);
    throw new Error('LLM translation failed');
  }
}

// Traditional machine translation function
async function translateWithMachine(text, targetLanguage) {
  // Check cache first
  const cacheKey = `machine:${text}:${targetLanguage}`;
  const cachedTranslation = await redis.get(cacheKey);
  
  if (cachedTranslation) {
    console.log('Cache hit for machine translation');
    return cachedTranslation;
  }
  
  try {
    const langCode = LANGUAGES[targetLanguage];
    const [translation] = await translate.translate(text, langCode);
    
    // Cache the result
    await redis.set(cacheKey, translation, 'EX', CACHE_TTL);
    
    return translation;
  } catch (error) {
    console.error('Machine translation error:', error);
    throw new Error('Machine translation failed');
  }
}

// Initial greeting endpoint
app.post('/call', async (req, res) => {
  const twiml = new VoiceResponse();
  
  twiml.gather({
    input: 'speech dtmf',
    action: '/method-select',
    numDigits: 1,
    timeout: 3,
    language: 'en-US',
  }).say({
    voice: 'Polly.Joanna',
  }, 'Welcome to the Echo Translator. Press 1 for LLM-based translation or 2 for traditional machine translation.');

  res.type('text/xml');
  res.send(twiml.toString());
});

// Translation method selection endpoint
app.post('/method-select', async (req, res) => {
  const twiml = new VoiceResponse();
  const input = req.body.Digits || req.body.SpeechResult;
  let translationMethod;
  
  if (input === '1' || input.toLowerCase().includes('llm')) {
    translationMethod = 'llm';
    twiml.say(`You selected LLM-based translation for more nuanced results.`);
  } else if (input === '2' || input.toLowerCase().includes('machine')) {
    translationMethod = 'machine';
    twiml.say(`You selected traditional machine translation for faster results.`);
  } else {
    twiml.say('Sorry, I did not recognize that choice. Let\'s try again.');
    twiml.redirect('/call');
    res.type('text/xml');
    return res.send(twiml.toString());
  }
  
  twiml.gather({
    input: 'speech dtmf',
    action: `/language-select?method=${translationMethod}`,
    numDigits: 1,
    timeout: 3,
    language: 'en-US',
  }).say({
    voice: 'Polly.Joanna',
  }, 'Please say or press a number to select a language: ' +
     '1 for Spanish, 2 for French, 3 for German, 4 for Italian, 5 for Japanese, ' +
     '6 for Mandarin, 7 for Korean, 8 for Russian, 9 for Portuguese, or 0 for Arabic.');

  res.type('text/xml');
  res.send(twiml.toString());
});

// Language selection endpoint
app.post('/language-select', async (req, res) => {
  const twiml = new VoiceResponse();
  const input = req.body.Digits || req.body.SpeechResult;
  const translationMethod = req.query.method || 'machine';
  let targetLanguage;
  
  // Map input to language code
  if (input) {
    const languageMap = {
      '1': 'spanish',
      '2': 'french',
      '3': 'german',
      '4': 'italian',
      '5': 'japanese',
      '6': 'mandarin',
      '7': 'korean',
      '8': 'russian',
      '9': 'portuguese',
      '0': 'arabic',
      // Add more speech recognition patterns
      'spanish': 'spanish',
      'french': 'french',
      'german': 'german',
      'italian': 'italian',
      'japanese': 'japanese',
      'mandarin': 'mandarin',
      'chinese': 'mandarin',
      'korean': 'korean',
      'russian': 'russian',
      'portuguese': 'portuguese',
      'arabic': 'arabic'
    };
    
    targetLanguage = languageMap[input.toLowerCase()];
  }
  
  if (targetLanguage) {
    // Store the language code in the session
    twiml.say(`You selected ${targetLanguage}. Please speak after the tone, and I will repeat in ${targetLanguage}.`);
    
    twiml.gather({
      input: 'speech',
      action: `/translate?language=${targetLanguage}&method=${translationMethod}`,
      language: 'en-US',
      speechTimeout: 'auto',
    });
  } else {
    twiml.say('Sorry, I did not recognize that language. Let\'s try again.');
    twiml.redirect(`/method-select`);
  }

  res.type('text/xml');
  res.send(twiml.toString());
});

// Translation endpoint
app.post('/translate', async (req, res) => {
  const twiml = new VoiceResponse();
  const targetLanguage = req.query.language;
  const translationMethod = req.query.method || 'machine';
  const speech = req.body.SpeechResult;
  
  if (speech && targetLanguage) {
    try {
      let translation;
      
      // Perform translation based on selected method
      if (translationMethod === 'llm') {
        translation = await translateWithLLM(speech, targetLanguage);
      } else {
        translation = await translateWithMachine(speech, targetLanguage);
      }
      
      // Say the original text
      twiml.say({
        voice: 'Polly.Joanna',
      }, `You said: ${speech}`);
      
      // Say the translated text (using appropriate voice if available)
      let voiceOption = {};
      
      // Map languages to appropriate Twilio voices when available
      const voiceMap = {
        'spanish': 'Polly.Conchita',
        'french': 'Polly.Celine',
        'german': 'Polly.Marlene',
        'italian': 'Polly.Carla',
        'japanese': 'Polly.Mizuki',
        'mandarin': 'Polly.Zhiyu',
        'portuguese': 'Polly.Camila',
      };
      
      if (voiceMap[targetLanguage]) {
        voiceOption.voice = voiceMap[targetLanguage];
      }
      
      twiml.say(voiceOption, `${targetLanguage} translation: ${translation}`);
      
      // Ask if they want to continue
      twiml.gather({
        input: 'speech dtmf',
        action: `/continue?method=${translationMethod}`,
        numDigits: 1,
        timeout: 5,
      }).say({
        voice: 'Polly.Joanna',
      }, 'Press 1 or say "continue" to translate another phrase. Press 2 or say "change language" to select a different language. ' +
         'Press 3 or say "change method" to switch translation methods. Press any other key or say "goodbye" to end the call.');
      
    } catch (error) {
      console.error('Translation error:', error);
      twiml.say('Sorry, there was an error translating your speech. Please try again later.');
      twiml.hangup();
    }
  } else {
    twiml.say('I didn\'t hear anything. Let\'s try again.');
    twiml.redirect(`/language-select?method=${translationMethod}`);
  }
  
  res.type('text/xml');
  res.send(twiml.toString());
});

// Continue or end call endpoint
app.post('/continue', async (req, res) => {
  const twiml = new VoiceResponse();
  const input = req.body.Digits || req.body.SpeechResult;
  const translationMethod = req.query.method || 'machine';
  
  if (input === '1' || input.toLowerCase().includes('continue')) {
    // Continue with the same language
    twiml.redirect(`/language-select?method=${translationMethod}`);
  } else if (input === '2' || input.toLowerCase().includes('change language')) {
    // Go back to language selection
    twiml.redirect(`/language-select?method=${translationMethod}`);
  } else if (input === '3' || input.toLowerCase().includes('change method')) {
    // Go back to method selection
    twiml.redirect('/call');
  } else {
    // End the call
    twiml.say('Thank you for using the Echo Translator. Goodbye!');
    twiml.hangup();
  }
  
  res.type('text/xml');
  res.send(twiml.toString());
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
