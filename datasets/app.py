from flask import Flask, render_template, request, jsonify
import base64
import vertexai
from vertexai.generative_models import GenerativeModel, Part, SafetySetting
# from google.oauth2 import service_account
from google.cloud import aiplatform
from google.oauth2 import service_account
import os

app = Flask(__name__)

credentials= service_account.Credentials.from_service_account_file("vocal-catalyst-449218-q8-b8fbf18bb0c3.json")

# Configure Vertex AI (replace with your project and location)
# vertexai.init(project="your-project-id", location="your-project-location")
vertexai.init(
        project="vocal-catalyst-449218-q8",
        location="us-central1",
        credentials=credentials
    )

# Model and settings (can be moved outside the function for better performance)
model = GenerativeModel("gemini-1.5-pro-002", system_instruction=["""Baseball pitch video"""])
generation_config = {
    "max_output_tokens": 8192,
    "temperature": 1,
    "top_p": 0.95,
}
safety_settings = [  # Consider adjusting these for production
    SafetySetting(category=SafetySetting.HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold=SafetySetting.HarmBlockThreshold.OFF),
    SafetySetting(category=SafetySetting.HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold=SafetySetting.HarmBlockThreshold.OFF),
    SafetySetting(category=SafetySetting.HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT, threshold=SafetySetting.HarmBlockThreshold.OFF),
    SafetySetting(category=SafetySetting.HarmCategory.HARM_CATEGORY_HARASSMENT, threshold=SafetySetting.HarmBlockThreshold.OFF),
]




@app.route("/", methods=["GET", "POST"])
def index():
    # credentials = service_account.Credentials.from_service_account_file(credentials_path)
    result = ""
    if request.method == "POST":
        video_uri = request.form.get("video_uri")
        video_file = request.files.get("video_file")  # Handle file uploads

        if video_uri:
            video_part = Part.from_uri(mime_type="video/mp4", uri=video_uri)
        # elif video_file:
        #     # Save the uploaded file temporarily
        #     video_path = os.path.join("uploads", video_file.filename)  # Create an 'uploads' directory
        #     video_file.save(video_path)
        #     video_part = Part.from_local_path(video_path, mime_type="video/mp4") # Local file path
        #     os.remove(video_path) # Delete the temporary file after use. Important for security and storage.
        else:
            return "Please provide either a video URL or upload a video file."

        text_prompt = request.form.get("text_prompt", """Provide Pitch speed, Exit Velocity, Hit Distance and Launch Angle using Ball tracking. Provide data in Tabular format.""") # Default prompt
        text_part = text_prompt

        try: 
            text_prompt = """Provide Pitch speed, Exit Velocity, Hit Distance and Launch Angle using Ball tracking. Provide data in Tabular format. The result should look similar to as follows:
| Pitch                          | Speed   | Exit Velocity | Distance | Launch Angle |
| Four-seam fastball | 95 mph | 99.8 mph       | 383 feet | 28 degrees |"""  # Hardcoded prompt
            text_part = text_prompt

            responses = model.generate_content(
                [video_part, text_part],
                generation_config=generation_config,
                safety_settings=safety_settings,
                stream=True,
            )
            print(responses)
            for response in responses:
                result += response.text
            
        except Exception as e: # Broad exception handling. Ideally, handle specific Vertex AI errors.
            result = f"An error occurred: {e}"


    return render_template("index.html", result=result)


if __name__ == "__main__":
    # Create the uploads directory if it doesn't exist
    os.makedirs("uploads", exist_ok=True)
    app.run(debug=True, port=5000)  # Set debug=False for production