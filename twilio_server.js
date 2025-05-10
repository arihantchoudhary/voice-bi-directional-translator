// Example Twilio integration (not part of the Langbase workflow)
// This server needs 'express' and 'twilio' installed: npm install express twilio
// It also needs the 'translationCallAgent' function. 
// Since that function is now part of the Next.js API route, 
// this server would need to be adapted to CALL the Next.js API endpoint 
// (e.g., http://localhost:3000/api/agent) instead of calling the function directly.

import express from 'express';
import twilio from 'twilio';
import fetch from 'node-fetch'; // Need to install: npm install node-fetch

const { VoiceResponse } = twilio.twiml;
const app = express();
app.use(express.urlencoded({ extended: true })); // To parse form data from Twilio

// Load environment variables (you might use a library like dotenv)
// Ensure TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN are set in your environment
// Also, ensure NEXT_PUBLIC_API_BASE_URL or similar points to your Next.js app
const NEXT_API_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:3000/api/agent'; // Adjust if your Next.js app runs elsewhere

app.post('/voice', async (req, res) => {
  const twiml = new VoiceResponse();
  
  // Get speech input from caller
  const gather = twiml.gather({
    input: 'speech',
    speechTimeout: 'auto', // Let Twilio decide timeout based on speech
    action: '/process-speech', // Send the result to this endpoint
    language: 'auto' // Auto-detect language
  });
  
  // You can customize this prompt
  gather.say('Please speak after the tone. I will translate your message.'); 
  
  // If the user doesn't speak, redirect back to /voice to listen again
  twiml.redirect('/voice'); 

  res.type('text/xml');
  res.send(twiml.toString());
});

app.post('/process-speech', async (req, res) => {
  const twiml = new VoiceResponse();
  const userInput = req.body.SpeechResult;
  const callSid = req.body.CallSid; // Useful for logging

  console.log(`[${callSid}] Received speech: ${userInput}`);

  if (userInput) {
    try {
      // Call our Next.js API endpoint which runs the Langbase workflow
      console.log(`[${callSid}] Calling Langbase API: ${NEXT_API_URL}`);
      const apiResponse = await fetch(NEXT_API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ input: userInput }),
      });

      if (!apiResponse.ok) {
        const errorText = await apiResponse.text();
        console.error(`[${callSid}] Langbase API error: ${apiResponse.status} - ${errorText}`);
        twiml.say('Sorry, I encountered an error processing your request.');
      } else {
        const result = await apiResponse.json();
        console.log(`[${callSid}] Langbase API response:`, result);
        
        // Respond with translated text using the detected language for voice synthesis
        twiml.say({
          // Use the language detected from the *caller's* input for the voice response
          language: result.originalLanguage, 
          // You can customize the voice based on language or preferences
          voice: 'Polly.Joanna' // Example voice, check Twilio docs for options
        }, result.audioResponse); // audioResponse contains the text translated to the caller's language
      }
    } catch (error) {
      console.error(`[${callSid}] Error calling Langbase API:`, error);
      twiml.say('Sorry, there was a problem connecting to the translation service.');
    }
  } else {
    // Handle cases where speech recognition failed or was empty
    console.log(`[${callSid}] No speech input received.`);
    twiml.say('Sorry, I didn\'t catch that. Please try speaking again.');
  }
  
  // Redirect back to /voice to gather more speech after responding
  twiml.redirect('/voice'); 
  
  res.type('text/xml');
  res.send(twiml.toString());
});

const PORT = process.env.TWILIO_PORT || 3001; // Use a different port than the Next.js app
app.listen(PORT, () => {
  console.log(`Twilio voice handler server running on port ${PORT}`);
  console.log(`It will forward requests to the Next.js API at ${NEXT_API_URL}`);
});
