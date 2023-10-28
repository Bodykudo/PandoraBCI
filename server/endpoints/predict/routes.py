from flask import jsonify, request
from endpoints import api_blueprint
from utils.predict import make_prediction


@api_blueprint.route("/predict", methods=["POST"])
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
            # json_data = json.dumps(data)
            # headers = {"Content-Type": "application/json"}
            # response = requests.post(
            #     "http://192.168.1.6/post", data=result, headers=headers
            # )
            # print(response)
            return jsonify(
                {"message": "Predictions made successfully.", "data": result}
            )
        except Exception as e:
            return jsonify({"error": "Error processing the file: " + str(e)}), 400
