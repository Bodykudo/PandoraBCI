from flask import jsonify, request
import requests
import json
from routes import api_blueprint
from utils.predict import make_prediction
from config import ARM_API_URL, ARM_HARDWARE


@api_blueprint.route("/api/predict", methods=["POST"])
def predict():
    # Check if a file is included in the request
    if "file" not in request.files:
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file:
        # Read the uploaded CSV file into a pandas DataFrame
        try:
            result = make_prediction(file)
            result = [int(x) for x in result]
            if ARM_HARDWARE:
                headers = {"Content-Type": "application/json"}
                data = {"data": result[:50]}
                json_data = json.dumps(data)
                response = requests.post(
                    f"{ARM_API_URL}/predict", data=json_data, headers=headers
                )
                if response.status_code == 200:
                    return jsonify(
                        {"message": "Predictions made successfully.", "data": result}
                    )
                else:
                    return (
                        jsonify({"error": "Failed to feed the arm with predictions."}),
                        500,
                    )
            else:
                return jsonify(
                    {"message": "Predictions made successfully.", "data": result}
                )
        except Exception as e:
            return jsonify({"error": "Error processing the file: " + str(e)}), 400
