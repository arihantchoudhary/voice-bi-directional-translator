import os
from twilio.rest import Client
from dotenv import load_dotenv

load_dotenv()  # Load environment variables from .env file

# Get your credentials from environment variables
account_sid = os.environ["TWILIO_ACCOUNT_SID"]
auth_token = os.environ["TWILIO_AUTH_TOKEN"]
client = Client(account_sid, auth_token)

call = client.calls.create(
    twiml="<Response><Say>Ahoy, World!</Say></Response>",  # Message to play
    to="+15109895404",    # The phone number you want to call (in E.164 format)
    from_="+18554901623"  # Your Twilio phone number (in E.164 format)
)

print(call.sid)
