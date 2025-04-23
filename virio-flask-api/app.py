import random
import time
import uuid
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
# Enable CORS for requests from the default Next.js port (3000)
# In production, restrict this to your actual frontend domain
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

# --- Mock Data Generation Logic ---

def generate_mock_script(payload):
    """Generates a mock video script response based on payload."""
    time.sleep(random.uniform(0.2, 0.6)) # Simulate processing time

    topic = payload.get("topic_focus", "the key message")
    platform = payload.get("platform", "video")
    duration_hint = payload.get("duration_hint_seconds")
    energy = payload.get("style_override", {}).get("energy", "moderate")

    # Basic content variation based on energy
    if energy == 'high':
        opening = f"💥 Let's GO! We need to talk about {topic} RIGHT NOW!"
        tone = "Energetic and punchy."
    elif energy == 'calm':
        opening = f"Let's take a moment to reflect on {topic}."
        tone = "Calm and thoughtful."
    else:
        opening = f"So, I've been thinking about {topic}..."
        tone = "Conversational and approachable."

    script_content = f"""
(Intro Music fades)

**Host (Client's Voice - {tone})**: {opening}

**(Visual: Relevant B-Roll)**

**Host**: It's crucial because [Reason 1 related to {topic}]. We often see [Common Misconception].

**(Visual: Text Overlay - Key Point 1)**

**Host**: But the reality is [Client's unique perspective on {topic}]. Think about it this way: [Analogy/Story Snippet].

**(Visual: Client speaking directly to camera)**

**Host**: That's why we need to [Call to Action related to {topic}].

(Outro Music begins)
"""
    talking_points = [f"Introduce {topic} with {energy} energy", "Address common misconception", "Share unique perspective/analogy", "Call to action"]
    estimated_duration = duration_hint or random.randint(45, 90)
    authenticity_score = round(random.uniform(0.75, 0.95), 2) # Random score
    b_roll = ["client speaking", "data visualization", f"abstract concept for {topic}", "call to action graphic"]

    return {
      "script_id": f"script_{uuid.uuid4()}",
      "script_content": script_content.strip(),
      "talking_points": talking_points,
      "estimated_duration_seconds": estimated_duration,
      "authenticity_score": authenticity_score,
      "suggested_b_roll": random.sample(b_roll, k=random.randint(1, len(b_roll))),
      "context_references": [f"memory_ctx_{random.randint(100, 999)}" for _ in range(random.randint(1, 3))]
    }

def generate_mock_text(payload):
    """Generates a mock text post response based on payload."""
    time.sleep(random.uniform(0.1, 0.4)) # Simulate processing time

    topic = payload.get("topic_focus", "this important subject")
    platform = payload.get("platform", "general")
    length = payload.get("length_hint", "standard")
    cta = payload.get("call_to_action")

    # Basic content variation
    if length == 'brief':
        content = f"Quick thought on {topic}: [Client's concise insight]. Agree? #ShortTakes #{topic.replace(' ','')}"
        key_messages = [f"Concise insight on {topic}"]
    elif length == 'detailed':
        content = f"Deep dive on {topic}:\n\n1. [Point 1]\n2. [Point 2]\n3. [Concluding thought].\n\nWhat's your take? Let's discuss below. {'Learn more: ' + cta if cta else ''} #DeepDive #{topic.replace(' ','')} #IndustryInsights"
        key_messages = ["Detailed point 1", "Detailed point 2", "Concluding thought"]
    else: # standard
        content = f"Considering {topic}? Here's my perspective: [Client's standard insight/opinion]. It connects to [Related Concept]. {'CTA: ' + cta if cta else ''} What are your thoughts? #{topic.replace(' ','')} #Discussion"
        key_messages = [f"Standard insight on {topic}", "Connection to related concept"]

    hashtags = [f"#{t.replace(' ','')}" for t in [topic, "ClientIndustry", "ThoughtLeadership", platform]]
    media_suggestions = ["relevant infographic", "client headshot", "quote graphic"] if payload.get("include_media_suggestions") else []
    authenticity_score = round(random.uniform(0.70, 0.90), 2)

    return {
      "post_id": f"post_{uuid.uuid4()}",
      "post_content": content,
      "key_messages": key_messages,
      "suggested_hashtags": random.sample(hashtags, k=random.randint(2, len(hashtags))),
      "media_suggestions": media_suggestions,
      "authenticity_score": authenticity_score,
      "context_references": [f"memory_ctx_{random.randint(100, 999)}" for _ in range(random.randint(1, 3))]
    }

# --- API Endpoints ---

@app.route('/api/v1/script', methods=['POST'])
def handle_script():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    payload = request.get_json()
    if not payload or 'transcript' not in payload:
        return jsonify({"error": "Missing 'transcript' in payload"}), 400

    # In a real app, payload would be used to query memory & generate content
    mock_response = generate_mock_script(payload)
    return jsonify(mock_response), 200

@app.route('/api/v1/text', methods=['POST'])
def handle_text():
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    payload = request.get_json()
    if not payload or 'transcript' not in payload:
        return jsonify({"error": "Missing 'transcript' in payload"}), 400

    # In a real app, payload would be used to query memory & generate content
    mock_response = generate_mock_text(payload)
    return jsonify(mock_response), 200

@app.route('/')
def index():
    return "Virio Mock API is running!"

if __name__ == '__main__':
    # Run on port 5001 to avoid conflict with Next.js default port 3000
    app.run(debug=True, port=5001)
