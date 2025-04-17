import os
import asyncio
import logging
from typing import Dict, Any, Callable, Optional
from dotenv import load_dotenv
from translator import VoiceTranslator

# Configure logging
logging.basicConfig(level=logging.INFO, format='%(asctime)s - %(name)s - %(levelname)s - %(message)s')
logger = logging.getLogger(__name__)

# Load environment variables
load_dotenv()


class PhoneService:
    """Handles phone call integration for the voice translator."""
    
    def __init__(self):
        """Initialize the phone service."""
        self.sid = os.getenv("PHONE_SERVICE_SID")
        self.token = os.getenv("PHONE_SERVICE_TOKEN")
        self.phone_number = os.getenv("PHONE_NUMBER")
        
        if not all([self.sid, self.token, self.phone_number]):
            logger.warning("Phone service credentials not fully configured")
        
        self.active_calls = {}
        self.translator = None
        
        logger.info("Phone service initialized")
    
    async def handle_incoming_call(self, call_sid: str, caller_info: Dict[str, Any]):
        """
        Handle an incoming call.
        
        Args:
            call_sid: Unique identifier for the call
            caller_info: Information about the caller
        """
        try:
            logger.info(f"Incoming call from {caller_info.get('from', 'unknown')}")
            
            # Create a new translator instance for this call
            source_lang = os.getenv("DEFAULT_SOURCE_LANGUAGE", "English")
            target_lang = os.getenv("DEFAULT_TARGET_LANGUAGE", "Spanish")
            
            self.translator = VoiceTranslator(source_lang=source_lang, target_lang=target_lang)
            
            # Track the call
            self.active_calls[call_sid] = {
                "from": caller_info.get("from"),
                "to": caller_info.get("to"),
                "status": "connected",
                "start_time": asyncio.get_event_loop().time(),
                "translator": self.translator
            }
            
            # In a real implementation, you would play a welcome message here
            welcome_message = f"Welcome to Voice Translator. Please speak in {source_lang}, and I'll translate to {target_lang}."
            logger.info(f"Playing welcome message: {welcome_message}")
            
            return {"status": "connected", "call_sid": call_sid}
            
        except Exception as e:
            logger.error(f"Error handling incoming call: {str(e)}")
            return {"status": "error", "error": str(e)}
    
    async def handle_audio_stream(self, call_sid: str, audio_stream, output_callback: Callable):
        """
        Handle streaming audio from a call.
        
        Args:
            call_sid: Unique identifier for the call
            audio_stream: Stream of audio chunks
            output_callback: Function to call with processed audio output
        """
        try:
            if call_sid not in self.active_calls:
                raise ValueError(f"Call {call_sid} not found")
                
            call_info = self.active_calls[call_sid]
            translator = call_info["translator"]
            
            # Define translation result handler
            async def translation_result_handler(result):
                # Log the translation
                original_text = result.get("original_text", "")
                translated_text = result.get("translated_text", "")
                
                logger.info(f"Translation: '{original_text}' -> '{translated_text}'")
                
                # Send the audio back through the callback
                output_callback({
                    "call_sid": call_sid,
                    "audio_data": result.get("audio_data", b""),
                    "original_text": original_text,
                    "translated_text": translated_text,
                    "metrics": result.get("metrics", {})
                })
            
            # Start the translator with our audio stream
            await translator.start_streaming_translation(audio_stream, translation_result_handler)
            
        except Exception as e:
            logger.error(f"Error handling audio stream: {str(e)}")
            raise
    
    async def end_call(self, call_sid: str) -> Dict[str, Any]:
        """
        End an active call.
        
        Args:
            call_sid: Unique identifier for the call
            
        Returns:
            Call information
        """
        try:
            if call_sid not in self.active_calls:
                logger.warning(f"Attempted to end non-existent call: {call_sid}")
                return {"status": "not_found"}
            
            call_info = self.active_calls[call_sid]
            call_info["status"] = "completed"
            call_info["end_time"] = asyncio.get_event_loop().time()
            call_info["duration"] = call_info["end_time"] - call_info["start_time"]
            
            # Calculate call statistics
            if "translator" in call_info:
                translator = call_info["translator"]
                call_info["metrics"] = translator.get_average_metrics()
                
                # Remove the translator instance to free resources
                call_info.pop("translator")
            
            logger.info(f"Call {call_sid} ended. Duration: {call_info['duration']:.2f}s")
            
            # In a real implementation, you would properly close the call with the phone service API
            
            return call_info
            
        except Exception as e:
            logger.error(f"Error ending call: {str(e)}")
            return {"status": "error", "error": str(e)}


# This class simulates a Twilio-like implementation for demonstration purposes
class TwilioIntegration:
    """Simulated Twilio integration for the phone service."""
    
    def __init__(self):
        """Initialize the Twilio integration."""
        self.phone_service = PhoneService()
        logger.info("Twilio integration initialized")
    
    async def handle_webhook(self, request_data: Dict[str, Any]) -> Dict[str, Any]:
        """
        Handle Twilio webhook request.
        
        Args:
            request_data: Webhook request data
            
        Returns:
            Response to send back to Twilio
        """
        try:
            event_type = request_data.get("EventType")
            call_sid = request_data.get("CallSid")
            
            if event_type == "incoming_call":
                caller_info = {
                    "from": request_data.get("From"),
                    "to": request_data.get("To"),
                    "direction": request_data.get("Direction", "inbound")
                }
                
                result = await self.phone_service.handle_incoming_call(call_sid, caller_info)
                
                # Return TwiML to greet the caller and start the call
                return {
                    "twiml": """
                    <Response>
                        <Say>Welcome to Voice Translator. Please speak in English, and I'll translate to Spanish.</Say>
                        <Connect>
                            <Stream url="wss://your-server.com/stream" />
                        </Connect>
                    </Response>
                    """
                }
                
            elif event_type == "stream_start":
                # This would be called when the audio stream is established
                logger.info(f"Stream started for call {call_sid}")
                return {"status": "success"}
                
            elif event_type == "call_ended":
                # Call has ended, clean up resources
                result = await self.phone_service.end_call(call_sid)
                return {"status": "success", "call_info": result}
                
            else:
                logger.warning(f"Unknown event type: {event_type}")
                return {"status": "error", "message": "Unknown event type"}
                
        except Exception as e:
            logger.error(f"Error handling webhook: {str(e)}")
            return {"status": "error", "message": str(e)}
    
    async def simulate_incoming_call(self, from_number: str, to_number: Optional[str] = None):
        """
        Simulate an incoming call for testing purposes.
        
        Args:
            from_number: Caller's phone number
            to_number: Called phone number (defaults to the configured number)
        """
        if to_number is None:
            to_number = self.phone_service.phone_number
        
        call_sid = f"CA{os.urandom(12).hex()}"
        
        # Simulate incoming call webhook
        result = await self.handle_webhook({
            "EventType": "incoming_call",
            "CallSid": call_sid,
            "From": from_number,
            "To": to_number,
            "Direction": "inbound"
        })
        
        logger.info(f"Simulated call response: {result}")
        
        # This would normally happen over time, but for simulation we'll end immediately
        await asyncio.sleep(2)
        
        # Simulate call ended webhook
        end_result = await self.handle_webhook({
            "EventType": "call_ended",
            "CallSid": call_sid
        })
        
        logger.info(f"Simulated call end response: {end_result}")
        
        return call_sid


async def main():
    """Test the phone integration."""
    twilio = TwilioIntegration()
    call_sid = await twilio.simulate_incoming_call("+11234567890")
    logger.info(f"Test call completed: {call_sid}")


if __name__ == "__main__":
    # Run the test function
    asyncio.run(main())
