from flask import Flask
from flask_cors import CORS
from endpoints import api_blueprint

app = Flask(__name__)

CORS(app)

app.register_blueprint(api_blueprint)

if __name__ == "__main__":
    app.run(host="192.168.1.3", port=5000, debug=True)
