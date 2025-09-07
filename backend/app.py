from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from controllers.BlockControllers.blocks import blocks
from controllers.MaintenanceControllers.maintenanceControllers import utility
from controllers.VisitorControllers.PreRegisterVisitors import visitor
from controllers.ComplaintControllers.addComplaint import complaint
from controllers.HousingUnitControllers.HousingUnit import housing
from utils.config import init_app, db

app = Flask(__name__)
CORS(app)

load_dotenv()
init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(blocks, url_prefix="/blocks")
app.register_blueprint(housing, url_prefix='/housing')

app.register_blueprint(complaint, url_prefix='/complaint')
app.register_blueprint(visitor, url_prefix='/visitor')
app.register_blueprint(utility, url_prefix='/utility')

@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()
