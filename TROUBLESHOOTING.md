# Voice Translator Troubleshooting Guide

## Module Not Found Errors

If you encounter an error like this:

```
Error: Cannot find module '@vapi‑ai/server-sdk'
```

This is likely due to special characters in the package name. Here's how to fix it:

1. Make sure you've installed the right SDK:
   ```bash
   npm install @vapi-ai/server-sdk
   ```
   This matches the name on npm for the official server SDK.

2. Verify your import uses plain ASCII hyphens in your index.js:
   ```javascript
   const { VapiClient } = require('@vapi-ai/server-sdk');
   ```
   Ensure those are normal hyphen-minus characters (-, U+002D), not en‑dashes or other unicode variants.

3. Confirm the module is present after installation:
   ```bash
   ls node_modules/@vapi-ai/server-sdk
   ```
   If you see index.js, package.json, etc., the install succeeded.

4. Restart your server:
   ```bash
   node index.js
   ```

## Express "Cannot GET /" Error

When you see this message in your browser:
```
Cannot GET /
```

It means Express received a GET request at "/" but no route was defined to handle it. Here's how to fix it:

### 1. Define a root GET handler

Before you call `app.listen()`, add:

```javascript
app.get('/', (req, res) => {
  res.send('✅ Voice Translator server is up and running!');
});
```

This ensures that visiting http://localhost:3000/ returns your custom response instead of the default error.

### 2. Serve a static index.html

If you have a front‑end in public/index.html, tell Express to serve it:

```javascript
const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));
```

Now "/" will load public/index.html rather than throwing 404.

### 3. Add a catch‑all for other routes

To gracefully handle any undefined paths:

```javascript
app.get('*', (req, res) => {
  res.status(404).send('❌ Page not found');
});
```

This intercepts all GET requests that didn't match earlier routes, preventing the default "Cannot GET" response.

## npm Global Installation Permission Errors

When running `npm install -g ngrok` or other global packages, you might encounter a permission error like this:

```
npm error code EACCES
npm error syscall mkdir
npm error path /usr/local/lib/node_modules/ngrok
npm error errno -13
npm error Error: EACCES: permission denied, mkdir '/usr/local/lib/node_modules/ngrok'
npm error
npm error The operation was rejected by your operating system.
npm error It is likely you do not have the permissions to access this file as the current user
```

This happens because npm tries to write into its global directory (by default under `/usr/local/lib/node_modules`), which on macOS and some Linux systems is owned by root. Here are several solutions:

### 1. Use a Node Version Manager (Recommended)

Tools like nvm or fnm install Node (and npm) entirely in your home directory, so global installs never require sudo.

```bash
# Install nvm
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.4/install.sh | bash

# Reload your shell, then:
nvm install --lts
nvm use --lts
```

After this, `npm install -g ngrok` will succeed without errors, because npm's global path is under `~/.nvm/...` which you own.

### 2. Change npm's Default Global Directory

If you prefer not to use a version manager, you can point npm's global installs into a folder in your home:

```bash
# Create a directory for globals
mkdir ~/.npm-packages

# Tell npm to use it
npm config set prefix "${HOME}/.npm-packages"

# Add this to your shell's startup (e.g. ~/.zshrc or ~/.bash_profile)
export PATH="$HOME/.npm-packages/bin:$PATH"
```

Now global installs (including ngrok) go into `~/.npm-packages` and won't hit permission barriers.

### 3. Fix Ownership of npm's Default Directories

You can also give yourself ownership of the existing `/usr/local` folders that npm uses:

```bash
sudo chown -R $(whoami) /usr/local/lib/node_modules /usr/local/bin /usr/local/share
```

After that, `npm install -g ngrok` will work without sudo.

**Warning**: Changing `/usr/local` permissions may affect other package managers or system installs, so proceed with caution.

### 4. Install ngrok via Homebrew Instead (macOS)

Since ngrok is available as a Homebrew formula, you can bypass npm entirely on macOS:

```bash
brew install --cask ngrok
```

Then start a tunnel with:

```bash
ngrok http 3000
```

### 5. Use npx for One-off Runs

If you just want to test ngrok without installing it globally, run:

```bash
npx ngrok http 3000
```

This fetches ngrok on demand and won't leave a global package behind or require elevated permissions.

## VAPI Webhook Configuration Issues

When setting up your webhook in the VAPI dashboard, you might encounter issues finding the right settings or configuring it correctly:

### Can't Find Webhook Settings

If you're having trouble finding the webhook configuration in the VAPI dashboard:

1. Navigate to https://dashboard.vapi.ai and log in
2. Look for "Call Settings" in the left-hand menu
3. Click on "Webhooks" under Call Settings
4. You should see a form with fields for:
   - Server URL (where you'll put your ngrok URL)
   - Timeout Seconds
   - Headers (optional)
   - Events (where you'll find transcriber-response)

If the menu structure has changed, try searching for "webhooks" in the dashboard or check VAPI's latest documentation.

### Webhook Not Receiving Events

If your webhook is set up but not receiving events:

1. Verify your ngrok tunnel is still running (tunnels expire after a period on the free plan)
2. Ensure you've included `/vapi/events` at the end of your ngrok URL
3. Check that the "transcriber-response" event is toggled ON
4. Verify your server is properly handling POST requests to the /vapi/events route:
   ```javascript
   app.post('/vapi/events', (req, res) => {
     console.log('Received webhook event:', req.body);
     res.status(200).send('OK');
   });
   ```
5. Make sure your Express server has proper JSON parsing middleware:
   ```javascript
   app.use(express.json());
   ```

### Testing Your Webhook

To test if your webhook is properly configured:

1. Add console.log statements in your webhook handler to see incoming events
2. Start a test call via the VAPI dashboard or your application
3. Check your server logs for incoming webhook events
4. If you don't see any events, verify the webhook URL and event toggles in VAPI

## ngrok Authentication Errors

When running `ngrok http 3000`, you might encounter an authentication error like this:

```
ERROR:  authentication failed: Usage of ngrok requires a verified account and authtoken.
ERROR:  
ERROR:  Sign up for an account: https://dashboard.ngrok.com/signup
ERROR:  Install your authtoken: https://dashboard.ngrok.com/get-started/your-authtoken
ERROR:  
ERROR:  ERR_NGROK_4018
```

This happens because ngrok requires authentication with a valid authtoken. Here's how to fix it:

1. Sign up for a free ngrok account at https://dashboard.ngrok.com/signup

2. After signing up and verifying your email, go to https://dashboard.ngrok.com/get-started/your-authtoken to get your authtoken

3. Install your authtoken by running:
   ```bash
   ngrok config add-authtoken YOUR_AUTH_TOKEN
   ```
   Replace `YOUR_AUTH_TOKEN` with the token from your ngrok dashboard.

4. Run ngrok again:
   ```bash
   ngrok http 3000
   ```

Once authenticated, ngrok will successfully create a tunnel to your local server.
