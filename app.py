from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
from groq import Groq
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Initialize Flask app
app = Flask(__name__, static_folder="frontend/build")
CORS(app)

# Load the API key
groq_api_key = os.getenv("GROQ_API_KEY")
if not groq_api_key:
    raise ValueError("API key not found. Please check your .env file.")

# Initialize the Groq client
client = Groq(api_key=groq_api_key)

# Route to handle chat messages
@app.route("/api/chat", methods=["POST"])
def chat():
    data = request.get_json()
    user_message = data.get("message", "")

    if not user_message:
        return jsonify({"error": "Message is required"}), 400

    # Use Groq to get a response
    initial_message = (
        "You are a travel recommendation bot focused on India. "
        "Your goal is to provide specific travel recommendations based on user input. "
        "Greet the user and ask for their preferences, then provide a destination suggestion."
        "Ask the user if they want to continue or end the conversation."
        "Ask less than 3 questions to get the user's preferences."
        "Keep your questions short and crisp."
    )

    try:
        response = client.chat.completions.create(
            messages=[
                {"role": "system", "content": initial_message},
                {"role": "user", "content": user_message},
            ],
            model="llama3-8b-8192",
            stream=False,
        )
        bot_response = response.choices[0].message.content
        return jsonify({"response": bot_response})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Serve React frontend
@app.route("/", defaults={"path": ""})
@app.route("/<path:path>")
def serve(path):
    if path != "" and os.path.exists(f"frontend/build/{path}"):
        return send_from_directory(app.static_folder, path)
    else:
        return send_from_directory(app.static_folder, "index.html")

if __name__ == "__main__":
    app.run(debug=True)
