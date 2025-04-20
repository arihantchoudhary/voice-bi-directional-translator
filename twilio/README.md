# Voice Agent App

This Flask application implements a voice agent using Twilio and OpenAI APIs. It can listen to user issues, summarize them with OpenAI, and initiate outbound calls to contacts.

## Setup

1. **Install dependencies**  
   ```bash
   pip install flask twilio openai
   ```

2. **Set environment variables**  
   ```bash
   export TWILIO_ACCOUNT_SID=your_twilio_sid
   export TWILIO_AUTH_TOKEN=your_twilio_auth_token
   export TWILIO_PHONE_NUMBER=+1234567890
   export OPENAI_API_KEY=your_openai_api_key
   export CONTACTS_CSV=path/to/contacts.csv
   ```

3. **Prepare `contacts.csv`**  
   Format as:
   ```
   Name,PhoneNumber
   Alice,+15551234567
   Bob,+15557654321
   ```

4. **Run the app**  
   ```bash
   python app.py
   ```

5. **Expose to the internet**  
   ```bash
   ngrok http 5000
   ```

6. **Configure Twilio**  
   In the Twilio Console, set your phone number’s Voice webhook to:  
   ```
   https://<your-domain>/voice-agent
   ```

## Usage

- Call your Twilio number.
- Speak your issue to the agent.
- Confirm issue summary.
- Name the contact to call.
- Agent bridges you into a live call.

