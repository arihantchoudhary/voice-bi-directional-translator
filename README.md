# Real-time Voice Transcription with Streamlit and Deepgram

This application allows you to speak into your microphone and see the transcription appear in real-time in a chat-like interface. It uses Streamlit for the web interface and Deepgram for high-quality speech recognition.

## Features

- Real-time audio capture from your microphone
- Streaming speech-to-text transcription using Deepgram's API
- Clean chat-style interface to display transcriptions
- Easy controls to start/stop recording and clear transcriptions

## Requirements

- Python 3.7+
- Deepgram API key (get one from [Deepgram Console](https://console.deepgram.com/))
- Microphone access

## Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/yourusername/voice-bi-directional-translator.git
   cd voice-bi-directional-translator
   ```

2. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```

3. Set up your Deepgram API key:
   - Open the `.env` file
   - Replace `your_deepgram_api_key_here` with your actual Deepgram API key

## Running the Application

1. Start the Streamlit application:
   ```bash
   streamlit run app.py
   ```

2. Your browser should automatically open to `http://localhost:8501`

## How to Use

1. Click the "Start Recording" button to begin capturing audio from your microphone
2. Speak clearly into your microphone
3. Your speech will be transcribed in real-time and displayed in the chat area
4. Click "Stop Recording" to end the audio capture
5. Use "Clear Transcription" to reset the chat history

## Troubleshooting

- **No transcription appearing**: Make sure your microphone is properly connected and has permission to be accessed by your browser
- **Error about Deepgram API key**: Ensure you've added your API key to the `.env` file
- **Audio quality issues**: Try to speak clearly and minimize background noise for best results
- **Installation errors**: Make sure you have the correct version of Python and all dependencies installed

## Dependencies

This application uses:
- `streamlit` for the web interface
- `deepgram-sdk` for speech recognition
- `pyaudio` for audio capture
- `python-dotenv` for environment variable management

## License

MIT
