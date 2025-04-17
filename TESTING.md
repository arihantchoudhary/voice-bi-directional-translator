# Testing Your Voice Translator Locally

This guide explains how to test your translator application without a real phone call using the included simulator.

## Prerequisites

- Your voice translator server is running (with `node index.js`)
- Your .env file contains valid VAPI_API_KEY and OPENAI_API_KEY values

## Testing Steps

### 1. Start the Test Simulator

Open a new terminal window, then run:

```bash
node test.js
```

You'll see a menu like this:

```
===== VAPI Webhook Simulator =====
1. Simulate call start
2. Send customer transcription
3. Send assistant transcription
4. Simulate call end
5. Generate new call ID
6. Exit
=================================
Current call ID: test-call-1234567890
```

### 2. Testing Workflow

Follow these steps to test the complete flow:

#### A. Start a call

1. Choose option `1` to simulate a call start
2. Check your server terminal - you should see:
   - Call start event logged
   - Welcome message asking for language preference 

#### B. Select a language

1. Choose option `2` to send a customer message
2. Enter a language (e.g., "English", "Spanish", "French") or "detect"
3. Check your server terminal - you should see:
   - The language being set
   - A confirmation message about translation setup

#### C. Test translation

1. Choose option `2` to send a customer message
2. Enter some text in your chosen language (e.g., "Hello, how are you?")
3. Check your server terminal - you should see:
   - The text being received
   - Language detection (if you chose "detect")
   - Translation being performed
   - The translated response

#### D. Test language switching

1. Choose option `2` to send a customer message
2. Enter "switch languages" or "change language"
3. Check your server terminal - you should see:
   - Confirmation that languages were swapped
   - The new translation direction

#### E. Test assistant messages

1. Choose option `3` to send an assistant message
2. Enter some text in the assistant's language
3. Check your server terminal - you should see the translation flow in reverse

#### F. End the call

1. Choose option `4` to end the call
2. Check your server terminal - you should see call cleanup happening

### 3. Checking Debug Information

While testing, you can view active calls and their language settings by visiting:
`http://localhost:3000/debug/calls` in your browser.

## Expected Console Output

Your server console should show detailed logs like:

```
📥 Received event: call-start for call test-call-1234567890 on channel assistant
🟢 New call started: test-call-1234567890

📥 Received event: transcriber-response for call test-call-1234567890 on channel customer
🎤 Transcription: "Spanish" on channel customer
🔄 Set languages: Customer=Spanish, Assistant=English

📥 Received event: transcriber-response for call test-call-1234567890 on channel customer
🎤 Transcription: "Hola, ¿cómo estás?" on channel customer
🔄 Translating from Spanish to English: "Hola, ¿cómo estás?"
📢 Translated: "Hello, how are you?"
```

## Troubleshooting Test Issues

If you encounter errors during testing:

1. Make sure your server is running with `node index.js` before starting the test script
2. Check that your .env file contains valid API keys
3. Verify both terminals are running from the same project directory
4. If the server crashes, restart it and generate a new call ID in the test script
5. Visit the `/debug/calls` endpoint to verify call state is being maintained correctly
