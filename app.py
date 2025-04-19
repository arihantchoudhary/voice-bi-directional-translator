# app.py
from flask import Flask, request, Response
from twilio.twiml.voice_response import VoiceResponse

app = Flask(__name__)

@app.route("/voice", methods=["POST"])
def voice():
    resp = VoiceResponse()
    resp.say("Hey there! This is a call from your Twilio demo.")
    return Response(str(resp), mimetype="application/xml")

if __name__ == "__main__":
    app.run(port=5000)
