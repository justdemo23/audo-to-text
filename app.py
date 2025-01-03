from flask import Flask, request, jsonify, render_template
import speech_recognition as sr

app = Flask(__name__, static_folder='static', template_folder='templates')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/audio', methods=['POST'])
def audio():
    r = sr.Recognizer()
    audio_file = request.files['audio']
    with sr.AudioFile(audio_file) as source:
        audio = r.record(source)
    try:
        English = r.recognize_google(audio, language="en-US")
        Spanish = r.recognize_google(audio, language="es-ES")
        return jsonify({"English": English, "Spanish": Spanish})
        
    except sr.UnknownValueError:
        return jsonify({"error": "Audio not understood"}), 422
    except sr.RequestError as e:
        return jsonify({"error": f"API request failed: {e}"}), 503

if __name__ == '__main__':
    app.run(debug=True)
