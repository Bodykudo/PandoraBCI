from flask import jsonify, request
import requests
from routes import api_blueprint
from config import ARM_API_URL


@api_blueprint.route("/api/arm/reset", methods=["PUT"])
def reset_arm():
    try:
        response = requests.put(f"{ARM_API_URL}/reset")
        if response.status_code == 200:
            return jsonify({"message": "Arem reset successfully."})
        else:
            return jsonify({"error": "Failed to reset the arm."}), 500
    except Exception as e:
        return jsonify({"error": "Error resetting the arm: " + str(e)}), 400


@api_blueprint.route("/api/arm/move", methods=["PUT"])
def move_arm():
    try:
        data = request.json
        move = data.get("move")
        if move is not None:
            headers = {"Content-Type": "text/plain"}
            response = requests.put(
                f"{ARM_API_URL}/move", data=f"{move}", headers=headers
            )
            if response.status_code == 200:
                return jsonify({"message": "Move sent successfully."})
            else:
                return jsonify({"error": "Failed to send the move."}), 500
        else:
            return (
                jsonify(
                    {"error": 'Missing or invalid "move" variable in the request body'}
                ),
                400,
            )
    except Exception as e:
        return jsonify({"error": "Error processing the move: " + str(e)}), 400
