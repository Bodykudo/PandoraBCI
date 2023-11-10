from flask import Blueprint


api_blueprint = Blueprint("api", __name__)

from routes.visualize.routes import visualize
from routes.predict.routes import predict
from routes.arm.routes import reset_arm, move_arm
