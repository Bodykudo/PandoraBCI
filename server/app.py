from flask import Flask
from flask_cors import CORS
from routes import api_blueprint
from config import APP_HOST, APP_PORT

app = Flask(__name__)

CORS(app)

app.register_blueprint(api_blueprint)

if __name__ == "__main__":
    app.run(host=APP_HOST, port=APP_PORT, debug=True)
