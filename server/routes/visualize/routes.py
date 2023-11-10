from flask import jsonify, request
import json
from routes import api_blueprint
from utils.data import convert_np_int64_to_int, perform_ica_denoising, read_data
from config.constants import channel_names
import numpy as np

from utils.visualize import generate_eeg_data


@api_blueprint.route("/api/visualize", methods=["POST"])
def visualize():
    # Check if a file is included in the request
    if "file" not in request.files:
        print("Error")
        return jsonify({"error": "No file provided"}), 400

    file = request.files["file"]

    if file.filename == "":
        return jsonify({"error": "No selected file"}), 400

    if file:
        # Read the uploaded CSV file into a pandas DataFrame
        try:
            df = read_data(file)
            filtered_data = perform_ica_denoising(channel_names, np.asarray(df.T), 500)
            result = generate_eeg_data(df, filtered_data)
            json_data = json.dumps(result, default=convert_np_int64_to_int)

            return jsonify(
                {"message": "EEG Data filtered successfully.", "data": json_data}
            )
        except Exception as e:
            return jsonify({"error": "Error processing the file: " + str(e)}), 400
