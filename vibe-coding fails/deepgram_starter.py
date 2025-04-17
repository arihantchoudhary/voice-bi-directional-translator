"""
Deepgram Starter Script - Simplified implementation for demonstration
This script provides a mock implementation of Deepgram functionality
for demonstration purposes, without requiring the actual Deepgram SDK.
"""

import os
import time
import json
import random
import asyncio
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

class MockDeepgramTranscriber:
    """A mock implementation of Deepgram for demonstration purposes."""
    
    def __init__(self, api_key=None):
        """Initialize the mock transcriber."""
        self.api_key = api_key or os.getenv("DEEPGRAM_API_KEY", "demo_key")
        self.language = os.getenv("DEFAULT_SOURCE_LANGUAGE", "en")
        print(f"Mock Deepgram transcriber initialized (language: {self.language})")
    
    async def transcribe_stream(self, audio_stream, callback):
        """
        Simulate transcribing an audio stream in real-time.
        
        Args:
            audio_stream: Stream of audio chunks
            callback: Function to call with transcription results
        """
        # Sample phrases that we'll "recognize" from the audio
        sample_phrases = [
            "Hello, how are you today?",
            "I'd like to schedule an appointment.",
            "Can you tell me more about your services?",
            "What time do you close today?",
            "Thank you for your help."
        ]
        
        # Simulate receiving chunks of audio and processing them
        chunk_count = 0
        full_transcript = ""
        
        try:
            # Simulate processing chunks from the audio stream
            async for _ in audio_stream:
                # Pretend we're processing each chunk
                await asyncio.sleep(0.5)  # Simulate processing time
                
                chunk_count += 1
                
                # Every 3 chunks, emit a phrase (simulating speech recognition)
                if chunk_count % 3 == 0:
                    phrase = random.choice(sample_phrases)
                    full_transcript += " " + phrase
                    
                    # Send interim result
                    await callback({
                        "text": phrase,
                        "is_final": True,
                        "confidence": random.uniform(0.75, 0.98)
                    })
        
        except Exception as e:
            print(f"Error in mock transcription: {str(e)}")
            raise
    
    async def transcribe_audio(self, audio_data):
        """
        Simulate transcribing audio data in one go.
        
        Args:
            audio_data: Audio data bytes
            
        Returns:
            Transcribed text
        """
        # Sample phrases we might "recognize"
        sample_phrases = [
            "Hello, how are you today?",
            "I'd like to schedule an appointment.",
            "Can you tell me more about your services?",
            "What time do you close today?",
            "Thank you for your help."
        ]
        
        # Simulate processing time
        await asyncio.sleep(0.3)
        
        # Return a random phrase as the "transcription"
        return random.choice(sample_phrases)


class MockOpenAITranslator:
    """A mock implementation of OpenAI for demonstration purposes."""
    
    def __init__(self, api_key=None):
        """Initialize the mock translator."""
        self.api_key = api_key or os.getenv("OPENAI_API_KEY", "demo_key")
        self.model = os.getenv("TRANSLATION_MODEL", "gpt-4")
        print(f"Mock OpenAI translator initialized (model: {self.model})")
    
    async def translate(self, text, source_lang, target_lang):
        """
        Simulate translating text.
        
        Args:
            text: Text to translate
            source_lang: Source language
            target_lang: Target language
            
        Returns:
            Translated text
        """
        # Simple dictionary of pre-translated phrases (English to Spanish)
        translations = {
            "Hello, how are you today?": "Hola, ¿cómo estás hoy?",
            "I'd like to schedule an appointment.": "Me gustaría programar una cita.",
            "Can you tell me more about your services?": "¿Puede contarme más sobre sus servicios?",
            "What time do you close today?": "¿A qué hora cierran hoy?",
            "Thank you for your help.": "Gracias por su ayuda."
        }
        
        # Simulate processing time
        await asyncio.sleep(0.2)
        
        # Return the translation if we have it, or a placeholder
        if target_lang.lower() == "spanish" and text in translations:
            return translations[text]
        else:
            return f"[Translated to {target_lang}: {text}]"


class MockTTSEngine:
    """A mock implementation of a text-to-speech engine."""
    
    def __init__(self, api_key=None):
        """Initialize the mock TTS engine."""
        self.api_key = api_key or os.getenv("TTS_API_KEY", "demo_key")
        print("Mock TTS engine initialized")
    
    async def text_to_speech(self, text, language):
        """
        Simulate converting text to speech.
        
        Args:
            text: Text to convert
            language: Target language
            
        Returns:
            Audio data (mock)
        """
        # Simulate processing time
        await asyncio.sleep(0.5)
        
        # Return empty bytes (in a real implementation, this would be audio data)
        return b""


class MockAudioStream:
    """A mock audio stream that generates fake audio chunks."""
    
    async def __aiter__(self):
        """Make this class iterable."""
        return self
    
    async def __anext__(self):
        """Return the next audio chunk."""
        # Simulate delay between chunks
        await asyncio.sleep(0.5)
        
        # Generate random "audio" data (just random bytes)
        chunk_size = random.randint(1000, 2000)
        return bytes([random.randint(0, 255) for _ in range(chunk_size)])


async def demo():
    """Run a demonstration of the mock transcription and translation pipeline."""
    # Create instances of our mock services
    transcriber = MockDeepgramTranscriber()
    translator = MockOpenAITranslator()
    tts_engine = MockTTSEngine()
    
    # Create a mock audio stream
    audio_stream = MockAudioStream()
    
    # Define a callback to handle transcription results
    async def handle_transcription(result):
        if result.get("is_final", False):
            text = result["text"]
            confidence = result.get("confidence", 0)
            
            print(f"\nTranscribed (confidence: {confidence:.2f}): \"{text}\"")
            
            # Translate the text
            translated = await translator.translate(text, "English", "Spanish")
            print(f"Translated: \"{translated}\"")
            
            # Generate speech (mock)
            await tts_engine.text_to_speech(translated, "Spanish")
            print("Speech generated and played")
    
    # Process a mock audio stream
    print("\n--- Starting mock transcription demo ---")
    print("Listening to audio stream...")
    
    # Set a timeout for the demo
    try:
        await asyncio.wait_for(
            transcriber.transcribe_stream(audio_stream, handle_transcription),
            timeout=10
        )
    except asyncio.TimeoutError:
        print("\nDemo completed (timeout reached)")
    
    print("\n--- Demo complete ---")


if __name__ == "__main__":
    print("Deepgram Starter Demo")
    print("=====================")
    print("This script demonstrates mock functionality without requiring the actual APIs.")
    
    # Run the demo
    asyncio.run(demo())
