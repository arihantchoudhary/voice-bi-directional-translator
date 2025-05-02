# Voice Bi-Directional Translator using Twilio Bland Deepgram Cartesia and an LLM of your choice

V0: Emergency Call, VAPI is able to find the right technician for the need on call
V1: Emergency Call, VAPI is able to find and add the right technician for the need to the call
V2: Emegency Call, VAPI is able to find, add, and translate conversations between the right technician and the customer. Flow ==  user speaks, everyone listens, VAPI translates, both people hear, Customer responds, both people hear, VAPI trasnlates back. High accuracy of translation is guaranteed because gpt4o is better than most Machine Translators.



A real-time voice translation system that enables seamless communication between people speaking different languages over phone calls.

## Overview

Voice Bi-Directional Translator creates three-way calls where an AI mediates conversations between speakers of different languages. Each participant speaks in their native language and hears responses translated into their language in real-time, creating a natural conversational experience.

Ideal for:
- Customer service for international clients
- Emergency service coordination across language barriers
- Technical support for multilingual environments
- Home services and repair calls

## Features

- **Real-time bi-directional translation** between English and Spanish
- **Domain-specific terminology** handling for home services and logistics
- **Natural-sounding voice synthesis** that preserves intonation and emotion
- **Three-way calling capability** with selective audio routing
- **Seamless conversation flow** with minimal latency
- **Specialized translation models** for different industry verticals

## Architecture

```
┌─────────────┐     ┌─────────────────┐     ┌─────────────┐
│             │     │                 │     │             │
│  English    │◄────┤  AI Translation ├────►│  Spanish    │
│  Speaker    │     │  System         │     │  Speaker    │
│             │     │                 │     │             │
└─────────────┘     └─────────────────┘     └─────────────┘
       ▲                    ▲                      ▲
       │                    │                      │
       │                    ▼                      │
       │           ┌─────────────────┐             │
       │           │                 │             │
       └───────────┤  Twilio Voice   ├─────────────┘
                   │  Platform       │
                   │                 │
                   └─────────────────┘
```

### Technical Components

1. **Twilio**: Manages phone connections and selective audio routing
2. **Deepgram API**: Provides real-time speech-to-text conversion
3. **GPT**: Performs translation with domain-specific knowledge
4. **Eleven Labs**: Generates natural-sounding text-to-speech in target languages

## Prerequisites

- Python 3.8+
- Twilio account with phone number
- Deepgram API account
- OpenAI API access
- Eleven Labs API account
- Ngrok or similar for local development

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/voice-bi-directional-translator.git
   cd voice-bi-directional-translator
   ```

2. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your API keys and configuration
   ```

## Configuration

Edit the `.env` file with your API credentials:

```
# Twilio Configuration
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE_NUMBER=+1234567890

# Deepgram Configuration
DEEPGRAM_API_KEY=your_deepgram_api_key

# OpenAI Configuration
OPENAI_API_KEY=your_openai_api_key

# Eleven Labs Configuration
ELEVEN_LABS_API_KEY=your_eleven_labs_api_key

# Application Configuration
PORT=5000
LOG_LEVEL=info
DOMAIN_MODEL=home-service  # or logistics
```

## Usage

1. Start the application:
   ```bash
   python app.py
   ```

2. Expose your local server to the internet (for development):
   ```bash
   ngrok http 5000
   ```

3. Configure your Twilio phone number's Voice webhook to point to your ngrok URL + `/voice`:
   ```
   https://your-ngrok-domain.ngrok.io/voice
   ```

4. Call your Twilio number to start a session.

### User Flow

1. **Initial Call**: User calls the Twilio number
2. **Problem Description**: User explains their issue in their native language
3. **Service Connection**: System identifies appropriate service provider and initiates call
4. **Mediated Conversation**: 
   - User speaks in Language A
   - Service provider hears in Language B
   - Service provider responds in Language B
   - User hears in Language A
5. **Resolution**: Issue is addressed with seamless communication

## Development

### Project Structure

```
voice-bi-directional-translator/
├── app.py                  # Main application
├── twilio/                 # Twilio integration
│   ├── call_handler.py     # Call management
│   └── webhook.py          # Webhook endpoints
├── translation/            # Translation components
│   ├── speech_to_text.py   # Deepgram integration
│   ├── translator.py       # GPT integration
│   └── text_to_speech.py   # Eleven Labs integration
├── models/                 # Domain-specific models
│   ├── homeservice/        # Home service translation models
│   └── logistics/          # Logistics translation models
├── utils/                  # Utility functions
├── tests/                  # Test suite
└── config/                 # Configuration files
```

### Adding a New Language Model

1. Create a new directory under `models/`
2. Follow the pattern in existing domain models
3. Update the configuration to use the new model

## Deployment

### Production Deployment

For production environments, we recommend:

1. Deploy on a cloud platform (AWS, GCP, Azure)
2. Set up a load balancer for high availability
3. Use a proper database for call tracking
4. Implement monitoring and logging
5. Configure auto-scaling for handling call volume

### Docker Deployment

```bash
# Build the Docker image
docker build -t voice-translator:latest .

# Run the container
docker run -p 5000:5000 --env-file .env voice-translator:latest
```

## API Documentation

### Webhook Endpoints

#### POST /voice
Handles incoming voice calls

#### POST /connect-technician
Connects service provider to the call

#### POST /media
Processes media streams for translation

## Monitoring & Logging

The application logs key events and metrics:

- Call initiation and termination
- Translation requests and responses
- Error conditions
- Performance metrics

Set the `LOG_LEVEL` in your `.env` file to control logging verbosity.

## Troubleshooting

Common issues:

1. **Audio not being translated**: Check API credentials and network connectivity
2. **High latency**: Optimize for better performance by adjusting buffer sizes
3. **Call connection issues**: Verify Twilio configuration and webhook URLs

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- [Twilio](https://www.twilio.com/) for call handling
- [Deepgram](https://deepgram.com/) for speech-to-text
- [OpenAI](https://openai.com/) for translation
- [Eleven Labs](https://elevenlabs.io/) for text-to-speech
