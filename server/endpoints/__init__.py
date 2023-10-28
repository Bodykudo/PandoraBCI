from flask import Blueprint


api_blueprint = Blueprint("api", __name__)

from endpoints.visualize.routes import visualize
from endpoints.predict.routes import predict
