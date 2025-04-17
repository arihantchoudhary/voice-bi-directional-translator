# Voice Translator

A real-time voice translator application using VAPI and OpenAI.

## Installation Guide

Here's a step‑by‑step guide to get your translator agent running locally:

### Install prerequisites

Make sure you have Node.js (v16+) and npm installed.

Sign up for VAPI and OpenAI and grab your API keys.

### Create your project folder

```bash
mkdir voice‑translator  
cd voice‑translator
```

### Initialize & install dependencies

```bash
npm init ‑y
npm install express axios @vapi‑ai/server-sdk dotenv
```

### Create your .env file

Create your .env file in the project root with:

```ini
VAPI_API_KEY=sk‑your_vapi_key_here
OPENAI_API_KEY=sk‑your_openai_key_here
PORT=3000   # or any port you prefer
```

### Start your server

```bash
node index.js
```

You should see `Listening on http://localhost:3000`.

### Troubleshooting

If you encounter any issues during installation or when running your application, please refer to the [Troubleshooting Guide](TROUBLESHOOTING.md).

### Install and run ngrok

```bash
npm install -g ngrok
ngrok http 3000
```

Copy the HTTPS URL it gives you (e.g. https://abcd1234.ngrok.io).

### Configure VAPI webhook

1. Log in to your VAPI dashboard at https://dashboard.vapi.ai
2. In the left-hand menu, navigate to **Call Settings** → **Webhooks**
3. In the "Server URL" field, enter your full ngrok URL followed by `/vapi/events`: 
   ```
   https://your-unique-subdomain.ngrok-free.app/vapi/events
   ```
4. Set "Timeout Seconds" to 20 (or adjust as needed)
5. (Optional) Add any custom headers as key-value pairs for additional security
6. Look for the "Events" section and toggle ON the **transcriber-response** event
7. Save your settings

### Test a call

#### Using a Real Phone Call:
1. Use the VAPI sandbox or your phone to place a call
2. When prompted, say your preferred language (e.g., "English", "Spanish", "French")
3. You can also say "detect" to let the system automatically detect your language
4. During the call, you can say "switch languages" or "change language" to swap the source and target languages
5. Speak in your language and the translator will convert it to the target language

#### Using the Local Test Simulator:
The project includes a test simulator to test the functionality without making real phone calls.

```bash
# In a new terminal window (while your server is running)
node test.js
```

See the [Testing Guide](TESTING.md) for detailed instructions on using the simulator.

### Iterate & refine

- Tweak sourceLang/targetLang logic or your translation prompt
- Add logging, error‑handling, or language‑detection heuristics as needed

### Deploy to production

1. Push this repo to your cloud host (Heroku, Vercel, AWS, etc.)
2. Update your VAPI webhook URL to the production endpoint
3. Disable ngrok

That's it—your bi‑directional translator agent should now be up and running.
