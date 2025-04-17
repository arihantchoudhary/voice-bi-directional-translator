"""
Demo Script for Voice Translator

This script demonstrates the Voice Translator functionality
without requiring any actual API keys or services.
"""

import os
import asyncio
import time
from datetime import datetime
import random
from deepgram_starter import MockAudioStream
from translator import VoiceTranslator

async def demo_translation():
    """Run a demonstration of the voice translation pipeline."""
    print("\n" + "="*60)
    print("Voice Translator Demo".center(60))
    print("="*60)
    
    # Create our translator
    translator = VoiceTranslator(source_lang="English", target_lang="Spanish")
    print(f"\nTranslator initialized: {translator.source_lang} → {translator.target_lang}")
    
    # Create a mock audio stream
    audio_stream = MockAudioStream()
    
    # Define a callback to handle translation results
    async def handle_translation(result):
        original_text = result.get("original_text", "")
        translated_text = result.get("translated_text", "")
        metrics = result.get("metrics", {})
        
        # Print the translation with timestamps
        timestamp = datetime.now().strftime("%H:%M:%S.%f")[:-3]
        
        print(f"\n[{timestamp}] Translation:")
        print(f"  📝 Original ({translator.source_lang}): \"{original_text}\"")
        print(f"  🔄 Translated ({translator.target_lang}): \"{translated_text}\"")
        
        # Print metrics
        if metrics:
            translation_time = metrics.get("translation_time", 0) * 1000
            tts_time = metrics.get("tts_time", 0) * 1000
            confidence = metrics.get("confidence", 0)
            
            print(f"  ⏱️ Metrics: Translation: {translation_time:.0f}ms, TTS: {tts_time:.0f}ms, Confidence: {confidence:.2f}")
    
    # We'll create our own translation simulation loop
    print("\nStarting translation simulation...")
    print("Listening for speech...")
    
    # Define a few sample phrases
    sample_phrases = [
        "Hello, how are you today?",
        "I'd like to schedule an appointment.",
        "Can you tell me more about your services?",
        "What time do you close today?",
        "Thank you for your help."
    ]
    
    # Process 5 simulated translations
    for i in range(5):
        # Pause to simulate time passing (random 2-4 seconds)
        await asyncio.sleep(random.uniform(2, 4))
        
        # Choose a random phrase
        phrase = sample_phrases[i]
        
        # Process translation (here we mock the pipeline)
        start_time = time.time()
        
        # 1. Mock transcription
        transcription_time = random.uniform(0.05, 0.2)
        await asyncio.sleep(transcription_time)
        
        # 2. Get translation
        translated_text = await translator.translator.translate(phrase, translator.source_lang, translator.target_lang)
        translation_time = random.uniform(0.1, 0.3)
        
        # 3. Mock TTS
        tts_time = random.uniform(0.1, 0.2)
        await asyncio.sleep(tts_time)
        
        # Total processing time
        total_time = time.time() - start_time
        
        # Call the callback with the result
        await handle_translation({
            "original_text": phrase,
            "translated_text": translated_text,
            "metrics": {
                "translation_time": translation_time,
                "tts_time": tts_time,
                "confidence": random.uniform(0.85, 0.98)
            }
        })
    
    print("\nDemo completed! 5 translations processed.")
    print("\nIn a real implementation:")
    print("- Speech would be captured from a phone call or microphone")
    print("- Deepgram would convert speech to text in real-time")
    print("- OpenAI would translate the text to the target language")
    print("- Cartesia would generate natural-sounding speech from the translated text")
    print("- The translated speech would be streamed back to the recipient")
    
    # Calculate and display average metrics
    metrics = translator.get_average_metrics()
    print("\nAverage Metrics:")
    for key, value in metrics.items():
        print(f"- {key}: {value*1000:.2f}ms")


if __name__ == "__main__":
    # Run the demo
    asyncio.run(demo_translation())
