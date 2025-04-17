import streamlit as st
import numpy as np
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
import time
import asyncio
import threading
from datetime import datetime, timedelta
import random
import altair as alt
import os
from dotenv import load_dotenv
import json

# Import our translator and phone service modules
from translator import VoiceTranslator
from phone_integration import PhoneService, TwilioIntegration

# Load environment variables
load_dotenv()

# Configure the Streamlit page
st.set_page_config(
    page_title="Voice Translator",
    page_icon="🎙️",
    layout="wide",
    initial_sidebar_state="expanded",
)

# Define available languages
LANGUAGES = {
    "English": "en",
    "Spanish": "es",
    "French": "fr",
    "German": "de",
    "Italian": "it",
    "Portuguese": "pt",
    "Russian": "ru",
    "Japanese": "ja",
    "Korean": "ko",
    "Chinese": "zh",
    "Arabic": "ar",
    "Hindi": "hi"
}

# Sidebar - Configuration
st.sidebar.title("Voice Translator Settings")

# API Status Indicators
st.sidebar.header("API Connection Status")
col1, col2, col3 = st.sidebar.columns(3)

with col1:
    deepgram_status = st.success("✅ Deepgram")
with col2:
    openai_status = st.success("✅ OpenAI")
with col3:
    cartesia_status = st.success("✅ Cartesia")

# Language Selection
st.sidebar.header("Default Languages")
source_lang = st.sidebar.selectbox("Source Language", list(LANGUAGES.keys()), index=0)
target_lang = st.sidebar.selectbox("Target Language", list(LANGUAGES.keys()), index=1)

# Phone Configuration
st.sidebar.header("Phone Configuration")
phone_number = st.sidebar.text_input("Phone Number", "+1 (555) 123-4567", disabled=True)
st.sidebar.info("Call this number to use the voice translation service")

# Advanced Settings
st.sidebar.header("Advanced Settings")
chunk_size = st.sidebar.slider("Audio Chunk Size (ms)", 100, 1000, 300, 100)
voice_model = st.sidebar.selectbox("Voice Clone Model", ["Natural", "Expressive", "Neutral"], index=0)
translation_model = st.sidebar.selectbox("Translation Model", ["GPT-4", "GPT-3.5", "Davinci"], index=0)

# Main content area
st.title("🎙️ Voice Translator Dashboard")

# Current call status
call_status_container = st.container()
with call_status_container:
    col1, col2, col3 = st.columns(3)
    with col1:
        st.metric("Call Status", "Active" if random.random() > 0.3 else "Idle")
    with col2:
        st.metric("Current Duration", "00:03:45" if random.random() > 0.3 else "00:00:00")
    with col3:
        st.metric("Active Users", str(random.randint(1, 5)))

# Tabs for different views
tab1, tab2, tab3 = st.tabs(["Live Translation", "System Metrics", "Translation History"])

# Tab 1: Live Translation
with tab1:
    # Translation flow visualization
    st.subheader("Translation Flow")
    flow_cols = st.columns(5)
    
    with flow_cols[0]:
        st.markdown("#### 🎤 Speech Input")
        st.markdown("**Source:** English")
        st.markdown("Audio streaming...")
    
    with flow_cols[1]:
        st.markdown("#### 📝 Speech-to-Text")
        st.markdown("**Using:** Deepgram")
        st.markdown("Processing chunks...")
    
    with flow_cols[2]:
        st.markdown("#### 🔄 Translation")
        st.markdown("**Using:** OpenAI")
        st.markdown("Translating to Spanish...")
    
    with flow_cols[3]:
        st.markdown("#### 🔊 Text-to-Speech")
        st.markdown("**Using:** Cartesia")
        st.markdown("Generating audio...")
    
    with flow_cols[4]:
        st.markdown("#### 📲 Output")
        st.markdown("**Target:** Spanish")
        st.markdown("Streaming to recipient...")
    
    # Progress bar for the current chunk
    st.progress(random.random())
    
    # Waveform visualizations
    st.subheader("Audio Waveforms")
    wave_cols = st.columns(2)
    
    # Generate sample waveform data
    def generate_waveform(length=100):
        x = np.linspace(0, 4 * np.pi, length)
        return np.sin(x) * np.exp(-0.1 * x) * (1 + 0.5 * np.random.randn(length))
    
    original_waveform = generate_waveform()
    translated_waveform = generate_waveform()
    
    with wave_cols[0]:
        st.markdown("**Original Speech (English)**")
        chart_data = pd.DataFrame({
            'time': np.linspace(0, 3, len(original_waveform)),
            'amplitude': original_waveform
        })
        
        chart = alt.Chart(chart_data).mark_line().encode(
            x=alt.X('time', title='Time (s)'),
            y=alt.Y('amplitude', title='Amplitude')
        ).properties(height=150)
        
        st.altair_chart(chart, use_container_width=True)
    
    with wave_cols[1]:
        st.markdown("**Translated Speech (Spanish)**")
        chart_data = pd.DataFrame({
            'time': np.linspace(0, 3, len(translated_waveform)),
            'amplitude': translated_waveform
        })
        
        chart = alt.Chart(chart_data).mark_line().encode(
            x=alt.X('time', title='Time (s)'),
            y=alt.Y('amplitude', title='Amplitude')
        ).properties(height=150)
        
        st.altair_chart(chart, use_container_width=True)
    
    # Text transcription display
    st.subheader("Transcription")
    text_cols = st.columns(2)
    
    with text_cols[0]:
        st.markdown("**Original Text (English)**")
        st.text_area("", "Hello, how are you today? I hope you're doing well. The weather is lovely here in San Francisco.", height=100, disabled=True)
    
    with text_cols[1]:
        st.markdown("**Translated Text (Spanish)**")
        st.text_area("", "Hola, ¿cómo estás hoy? Espero que estés bien. El clima está hermoso aquí en San Francisco.", height=100, disabled=True)

# Tab 2: System Metrics
with tab2:
    st.subheader("Performance Metrics")
    
    # System metrics
    metric_cols = st.columns(4)
    
    with metric_cols[0]:
        st.metric("Avg. Transcription Time", f"{random.randint(50, 150)} ms")
    with metric_cols[1]:
        st.metric("Avg. Translation Time", f"{random.randint(100, 300)} ms")
    with metric_cols[2]:
        st.metric("Avg. TTS Time", f"{random.randint(80, 200)} ms")
    with metric_cols[3]:
        st.metric("Total Latency", f"{random.randint(300, 600)} ms")
    
    # API Usage
    st.subheader("API Usage Today")
    api_cols = st.columns(3)
    
    with api_cols[0]:
        st.markdown("**Deepgram API**")
        st.progress(0.7)
        st.text("178 / 250 minutes")
    
    with api_cols[1]:
        st.markdown("**OpenAI API**")
        st.progress(0.45)
        st.text("9,254 / 20,000 tokens")
    
    with api_cols[2]:
        st.markdown("**Cartesia API**")
        st.progress(0.3)
        st.text("75 / 250 minutes")
    
    # Historical performance chart
    st.subheader("Latency Over Time")
    
    # Generate sample data for the past 60 minutes
    now = datetime.now()
    times = [now - timedelta(minutes=i) for i in range(60, 0, -1)]
    
    chart_data = pd.DataFrame({
        'time': times,
        'transcription': [random.randint(50, 150) for _ in range(60)],
        'translation': [random.randint(100, 300) for _ in range(60)],
        'tts': [random.randint(80, 200) for _ in range(60)]
    })
    
    # Melt the dataframe for stacked area chart
    chart_data_melted = pd.melt(
        chart_data, 
        id_vars=['time'], 
        value_vars=['transcription', 'translation', 'tts'],
        var_name='Process', 
        value_name='Latency (ms)'
    )
    
    chart = alt.Chart(chart_data_melted).mark_area().encode(
        x=alt.X('time:T', title='Time'),
        y=alt.Y('Latency (ms):Q', stack='zero'),
        color=alt.Color('Process:N', scale=alt.Scale(scheme='category10'))
    ).properties(height=300)
    
    st.altair_chart(chart, use_container_width=True)

# Tab 3: Translation History
with tab3:
    st.subheader("Recent Translation Sessions")
    
    # Generate sample translation history data
    def generate_session():
        now = datetime.now()
        duration = random.randint(1, 15)
        start_time = now - timedelta(minutes=random.randint(0, 120))
        end_time = start_time + timedelta(minutes=duration)
        langs = list(LANGUAGES.keys())
        source = random.choice(langs)
        target = random.choice([l for l in langs if l != source])
        return {
            'session_id': f'session_{random.randint(1000, 9999)}',
            'start_time': start_time.strftime('%H:%M:%S'),
            'duration': f'{duration}m {random.randint(1, 59)}s',
            'source_lang': source,
            'target_lang': target,
            'messages': random.randint(5, 30),
            'avg_latency': f'{random.randint(300, 600)}ms'
        }
    
    sessions = [generate_session() for _ in range(10)]
    sessions_df = pd.DataFrame(sessions)
    
    st.dataframe(sessions_df, use_container_width=True)
    
    # Language usage pie chart
    st.subheader("Language Usage Distribution")
    
    # Generate sample language usage data
    usage_data = {lang: random.randint(1, 100) for lang in list(LANGUAGES.keys())}
    usage_df = pd.DataFrame({
        'Language': list(usage_data.keys()),
        'Minutes': list(usage_data.values())
    })
    
    fig = px.pie(usage_df, values='Minutes', names='Language', hole=0.4)
    fig.update_layout(height=400)
    st.plotly_chart(fig, use_container_width=True)

# Footer with system status
st.markdown("---")
footer_cols = st.columns(3)

with footer_cols[0]:
    st.info("System Status: Operational")

with footer_cols[1]:
    st.info("Last Updated: " + datetime.now().strftime("%H:%M:%S"))

with footer_cols[2]:
    st.info("Connected to Phone Service: ✅")

# Initialize session state for storing translation data and call information
if 'translations' not in st.session_state:
    st.session_state.translations = []

if 'active_call' not in st.session_state:
    st.session_state.active_call = None

if 'metrics' not in st.session_state:
    st.session_state.metrics = {
        "transcription_time": [],
        "translation_time": [],
        "tts_time": [],
        "total_latency": []
    }

# Function to simulate an incoming call for demonstration purposes
def simulate_call():
    # Create a background thread to simulate a call
    def run_call_simulation():
        loop = asyncio.new_event_loop()
        asyncio.set_event_loop(loop)
        
        try:
            # Initialize Twilio integration
            twilio = TwilioIntegration()
            
            # Simulate an incoming call
            caller_number = "+1" + ''.join([str(random.randint(0, 9)) for _ in range(10)])
            
            # Update session state to show active call
            st.session_state.active_call = {
                "from": caller_number,
                "to": phone_number,
                "start_time": datetime.now(),
                "status": "active",
                "duration": 0
            }
            
            # Simulate translations
            sample_phrases = [
                "Hello, how are you today?",
                "I'd like to schedule an appointment.",
                "Can you tell me more about your services?",
                "What time do you close today?",
                "Thank you for your help."
            ]
            
            # Process 5 translations with delays
            for i in range(5):
                # Sleep to simulate time passing
                time.sleep(random.uniform(2, 5))
                
                # Generate random performance metrics
                metrics = {
                    "transcription_time": random.uniform(0.05, 0.15),
                    "translation_time": random.uniform(0.1, 0.3),
                    "tts_time": random.uniform(0.08, 0.2),
                    "confidence": random.uniform(0.7, 0.98)
                }
                
                # Calculate total latency
                total_latency = sum([
                    metrics["transcription_time"],
                    metrics["translation_time"],
                    metrics["tts_time"]
                ])
                
                metrics["total_latency"] = total_latency
                
                # Add metrics to session state
                st.session_state.metrics["transcription_time"].append(metrics["transcription_time"])
                st.session_state.metrics["translation_time"].append(metrics["translation_time"])
                st.session_state.metrics["tts_time"].append(metrics["tts_time"])
                st.session_state.metrics["total_latency"].append(total_latency)
                
                # Create a translation entry
                original_text = random.choice(sample_phrases)
                
                # Mock translation (for demo only - in production this would use the real translator)
                translator = VoiceTranslator(source_lang=source_lang, target_lang=target_lang)
                loop = asyncio.get_event_loop()
                translated_text = loop.run_until_complete(
                    translator.translator.translate(original_text, source_lang, target_lang)
                )
                
                # Add to translations
                st.session_state.translations.append({
                    "timestamp": datetime.now(),
                    "original_text": original_text,
                    "translated_text": translated_text,
                    "source_lang": source_lang,
                    "target_lang": target_lang,
                    "metrics": metrics
                })
            
            # End the call
            st.session_state.active_call["status"] = "completed"
            st.session_state.active_call["end_time"] = datetime.now()
            st.session_state.active_call["duration"] = (
                st.session_state.active_call["end_time"] - 
                st.session_state.active_call["start_time"]
            ).total_seconds()
            
            # Wait 5 seconds then clear the active call
            time.sleep(5)
            st.session_state.active_call = None
            
        except Exception as e:
            st.error(f"Error in call simulation: {str(e)}")
        finally:
            loop.close()
    
    # Start the thread
    thread = threading.Thread(target=run_call_simulation)
    thread.daemon = True
    thread.start()
    
    return True

# Function to get the latest translation
def get_latest_translation():
    if not st.session_state.translations:
        return {
            "original_text": "Hello, how are you today? I hope you're doing well. The weather is lovely here in San Francisco.",
            "translated_text": "Hola, ¿cómo estás hoy? Espero que estés bien. El clima está hermoso aquí en San Francisco.",
            "metrics": {
                "transcription_time": 0.1,
                "translation_time": 0.2,
                "tts_time": 0.15,
                "total_latency": 0.45
            }
        }
    
    return st.session_state.translations[-1]

# Function to get average metrics
def get_average_metrics():
    metrics = st.session_state.metrics
    
    # If we have no data, return some sample values
    if not metrics["total_latency"]:
        return {
            "avg_transcription_time": random.randint(50, 150) / 1000,
            "avg_translation_time": random.randint(100, 300) / 1000,
            "avg_tts_time": random.randint(80, 200) / 1000,
            "avg_total_latency": random.randint(300, 600) / 1000
        }
    
    # Calculate actual averages
    return {
        "avg_transcription_time": sum(metrics["transcription_time"]) / len(metrics["transcription_time"]),
        "avg_translation_time": sum(metrics["translation_time"]) / len(metrics["translation_time"]),
        "avg_tts_time": sum(metrics["tts_time"]) / len(metrics["tts_time"]),
        "avg_total_latency": sum(metrics["total_latency"]) / len(metrics["total_latency"])
    }

# Simulate a call button
if st.button("Simulate Incoming Call"):
    simulate_call()
    st.success("Simulating an incoming call... Watch the dashboard update in real-time.")
    # Force a rerun to show the initial call state
    st.experimental_rerun()

# Auto-refresh the page every 2 seconds when a call is active
if st.session_state.active_call:
    time.sleep(2)
    st.experimental_rerun()

# Update dynamic content based on session state
if st.session_state.active_call:
    # Update call status
    with call_status_container:
        col1, col2, col3 = st.columns(3)
        with col1:
            st.metric("Call Status", "Active")
        with col2:
            duration = int((datetime.now() - st.session_state.active_call["start_time"]).total_seconds())
            minutes, seconds = divmod(duration, 60)
            st.metric("Current Duration", f"{minutes:02d}:{seconds:02d}")
        with col3:
            st.metric("Active Users", "1")
    
    # Update the text areas with the latest translation
    latest = get_latest_translation()
    
    # Update the flow status
    with flow_cols[0]:
        st.markdown("#### 🎤 Speech Input")
        st.markdown(f"**Source:** {source_lang}")
        st.markdown("Audio streaming...")
    
    with flow_cols[1]:
        st.markdown("#### 📝 Speech-to-Text")
        st.markdown("**Using:** Deepgram")
        st.markdown("Processing chunks...")
    
    with flow_cols[2]:
        st.markdown("#### 🔄 Translation")
        st.markdown("**Using:** OpenAI")
        st.markdown(f"Translating to {target_lang}...")
    
    with flow_cols[3]:
        st.markdown("#### 🔊 Text-to-Speech")
        st.markdown("**Using:** Cartesia")
        st.markdown("Generating audio...")
    
    with flow_cols[4]:
        st.markdown("#### 📲 Output")
        st.markdown(f"**Target:** {target_lang}")
        st.markdown("Streaming to recipient...")
    
    # Update text areas with the latest translation
    with text_cols[0]:
        st.markdown(f"**Original Text ({source_lang})**")
        st.text_area("", latest["original_text"], height=100, disabled=True, key="original_text")
    
    with text_cols[1]:
        st.markdown(f"**Translated Text ({target_lang})**")
        st.text_area("", latest["translated_text"], height=100, disabled=True, key="translated_text")

# Update metrics display
avg_metrics = get_average_metrics()

with metric_cols[0]:
    st.metric("Avg. Transcription Time", f"{int(avg_metrics['avg_transcription_time'] * 1000)} ms")
with metric_cols[1]:
    st.metric("Avg. Translation Time", f"{int(avg_metrics['avg_translation_time'] * 1000)} ms")
with metric_cols[2]:
    st.metric("Avg. TTS Time", f"{int(avg_metrics['avg_tts_time'] * 1000)} ms")
with metric_cols[3]:
    st.metric("Total Latency", f"{int(avg_metrics['avg_total_latency'] * 1000)} ms")

# Update the translation history
with tab3:
    if st.session_state.translations:
        # Create a dataframe from the actual translations
        history_data = []
        for i, trans in enumerate(st.session_state.translations):
            history_data.append({
                'session_id': f'session_{1000 + i}',
                'start_time': trans['timestamp'].strftime('%H:%M:%S'),
                'duration': '0m 0s',
                'source_lang': trans['source_lang'],
                'target_lang': trans['target_lang'],
                'messages': 1,
                'avg_latency': f"{int(trans['metrics']['total_latency'] * 1000)}ms"
            })
        
        if history_data:
            history_df = pd.DataFrame(history_data)
            st.dataframe(history_df, use_container_width=True)

# Manual refresh button
if st.button("Refresh Dashboard"):
    st.experimental_rerun()
