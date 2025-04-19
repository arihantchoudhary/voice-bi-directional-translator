import streamlit as st
import asyncio
import os
import json
from pathlib import Path
from dotenv import load_dotenv
from deepgram import DeepgramClient

# Load environment variables
load_dotenv()

# Set page configuration
st.set_page_config(
    page_title="Real-time Transcription with Deepgram",
    page_icon="🎤",
    layout="wide",
)

# Check for Deepgram API key
DEEPGRAM_API_KEY = os.getenv("DEEPGRAM_API_KEY")
if not DEEPGRAM_API_KEY:
    st.error("⚠️ Deepgram API key not found. Please add it to your .env file.")
    st.stop()


# Initialize session state for chat messages
if "messages" not in st.session_state:
    st.session_state.messages = []

def get_model_for_language(language):
    """Select the appropriate Deepgram model based on language"""
    # Languages that need special model handling
    special_cases = {
        "hi": "general",    # Hindi - using base tier general model
        "ar": "general",    # Arabic 
        "ru": "general"     # Russian
    }
    
    # Check if this language needs a specific model
    if language in special_cases:
        return special_cases[language]
    else:
        # Default to nova-3 for most languages
        return "nova-3"

def transcribe_audio(audio_file, deepgram, selected_language=None):
    """Send audio to Deepgram for transcription with optional language specification"""
    try:
        # Read audio file
        audio_bytes = audio_file.getvalue()
        
        # Set up transcription parameters
        params = {
            "smart_format": True,
            "punctuate": True,
        }
        
        if selected_language:
            # Use user-selected language
            params["language"] = selected_language
            # Select appropriate model for this language
            params["model"] = get_model_for_language(selected_language)
        else:
            # Use language detection with default model
            params["detect_language"] = True
            params["model"] = "nova-3"
        
        # Create a response object using the REST API
        response = deepgram.listen.rest.v("1").transcribe_file(
            {"buffer": audio_bytes},
            params,
        )
        
        # Extract the transcript and detected language
        alternatives = response.results.channels[0].alternatives[0]
        transcript = alternatives.transcript
        
        # Get detected language or use selected language
        if selected_language:
            detected_language = selected_language
        else:
            detected_language = response.results.channels[0].detected_language
        
        if transcript:
            # Format the message content with language info
            content = f"Language: {detected_language}\n\nTranscript: {transcript}"
                
            # Add message to session state
            st.session_state.messages.append({"role": "user", "content": content})
            return transcript, detected_language
        
        return None, None
    
    except Exception as e:
        st.error(f"Error in transcription: {e}")
        return None, None

def main():
    # App title and description
    st.title("🎤 Voice Transcription with Deepgram")
    st.markdown("""
    Upload an audio file and get transcription with language detection or manual language selection!
    """)
    
    # Initialize Deepgram client
    deepgram = DeepgramClient(api_key=DEEPGRAM_API_KEY)
    
    # File uploader for audio
    st.markdown("### 🎙️ Upload Audio")
    st.info("Record audio on your device and upload the file for transcription.")
    
    # Common languages
    languages = {
        "Auto-detect": None,
        "English (US)": "en-US",
        "English (UK)": "en-GB",
        "Spanish": "es",
        "French": "fr", 
        "German": "de",
        "Japanese": "ja",
        "Mandarin": "zh",
        "Korean": "ko",
        "Russian": "ru",
        "Hindi": "hi",
        "Arabic": "ar",
        "Portuguese": "pt",
        "Italian": "it"
    }
    
    # Language selector
    selected_language_name = st.selectbox(
        "Select language (or auto-detect)",
        options=list(languages.keys()),
        index=0
    )
    selected_language = languages[selected_language_name]
    
    # Accept common audio formats
    audio_file = st.file_uploader("Upload audio file", type=["wav", "mp3", "m4a", "ogg"])
    
    # Process uploaded audio
    if audio_file is not None:
        # Display audio player
        st.audio(audio_file, format=f"audio/{audio_file.type.split('/')[1]}")
        
        # Transcribe button
        if st.button("Transcribe Audio"):
            # Create a processing indicator
            with st.spinner("Transcribing your audio..."):
                # Run transcription with selected language or auto-detection
                transcript, language = transcribe_audio(audio_file, deepgram, selected_language)
                
                if transcript:
                    if selected_language:
                        st.success(f"Transcription complete! Language: {selected_language_name}")
                    else:
                        st.success(f"Transcription complete! Detected language: {language}")
                else:
                    st.warning("No speech detected or transcription failed.")
    
    # Chat container
    st.markdown("### Transcription History")
    chat_container = st.container(height=400, border=True)
    
    # Display messages in chat container
    with chat_container:
        for message in st.session_state.messages:
            st.markdown(f"**You:** {message['content']}")
    
    # Clear chat button
    if st.button("Clear Transcription", key="clear"):
        st.session_state.messages = []
        st.experimental_rerun()

if __name__ == "__main__":
    main()
