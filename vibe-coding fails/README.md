# Voice Translator

A real-time voice translation system that allows seamless communication across language barriers. This application uses speech-to-text, translation, and text-to-speech technologies to enable real-time voice conversation translation through a phone call.

## Overview

Voice Translator is designed to break down language barriers in real-time communication. Using a combination of cutting-edge AI technologies, it:

1. Captures speech through a phone call
2. Converts speech to text using Deepgram
3. Translates the text from the source language to the target language using OpenAI
4. Converts the translated text back to speech using Cartesia with cloned voice technology
5. Streams the translated speech back to the listener in real-time

## Features

- **Real-time Translation**: Minimal delay between speaking and hearing the translated voice
- **Streaming Processing**: Speech is processed in chunks as you speak, enabling natural conversation flow
- **High-quality Voice Cloning**: Uses Cartesia to maintain a consistent, natural-sounding voice for the translations
- **Phone Integration**: Connect through a standard phone number to use the service
- **Streamlit Dashboard**: Visualize the translation process and metrics in real-time
- **Multi-language Support**: Translate between numerous language pairs

## Technology Stack

- **Speech-to-Text**: [Deepgram](https://deepgram.com/) for accurate and fast speech recognition
- **Translation**: [OpenAI](https://openai.com/) API for high-quality language translation
- **Text-to-Speech**: Cartesia cloned voice technology for natural-sounding output
- **Front-end**: [Streamlit](https://streamlit.io/) for interactive visualization
- **Telephony**: Integration with a phone service for call handling

## Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/voice-translator.git
cd voice-translator

# Create a virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your API keys
```

## Configuration

Before running the application, you need to set up the following API keys and configurations in your `.env` file:

```
DEEPGRAM_API_KEY=your_deepgram_api_key
OPENAI_API_KEY=your_openai_api_key
CARTESIA_API_KEY=your_cartesia_api_key
PHONE_SERVICE_SID=your_phone_service_sid
PHONE_SERVICE_TOKEN=your_phone_service_token
PHONE_NUMBER=your_assigned_phone_number
```

## Usage

### Starting the Application

```bash
# Start the Streamlit dashboard
streamlit run app.py
```

### Making a Translation Call

1. Dial the configured phone number
2. Follow the voice prompts to select your source and target languages
3. Begin speaking in your source language
4. The system will translate and relay your message in real-time in the target language

## Streamlit Dashboard

The Streamlit dashboard provides real-time visualization of the translation process:

- **Translation Flow**: Visual representation of the speech-to-text-to-speech pipeline
- **Waveform Visualization**: Audio waveforms of original and translated speech
- **Transcription Display**: Real-time display of original text and translated text
- **System Metrics**: Performance metrics including latency, chunk processing time, and API usage
- **Language Selection**: Interface to configure default source and target languages
- **Historical Data**: View past translation sessions and performance

## How It Works

1. **Speech Capture**: When a user calls the system, their voice is captured and streamed in real-time
2. **Chunking**: The audio stream is divided into manageable chunks for processing
3. **Speech-to-Text**: Deepgram converts each audio chunk to text
4. **Translation**: OpenAI translates the text from source to target language
5. **Text-to-Speech**: Cartesia converts the translated text to speech using a cloned voice
6. **Response**: The translated speech is streamed back to the recipient

## Example Workflow

1. User calls the system from their phone
2. System answers: "Welcome to Voice Translator. Please speak in English, and I'll translate to Spanish."
3. User speaks: "Hello, how are you today?"
4. System processes the speech in real-time
5. Recipient hears: "Hola, ¿cómo estás hoy?" in a natural-sounding voice
6. The Streamlit dashboard visualizes each step of this process in real-time

## Development Roadmap

- [ ] Add support for more languages
- [ ] Implement user accounts and personalized voice profiles
- [ ] Develop mobile application interface
- [ ] Add conference call support for multi-party translation
- [ ] Implement offline mode for essential phrases

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Deepgram for speech-to-text API
- OpenAI for translation services
- Cartesia for voice cloning technology
- Streamlit for the dashboard framework
