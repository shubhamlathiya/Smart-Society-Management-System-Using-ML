
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv

from controllers.ComplaintControllers.addComplaint import complaint
from controllers.HousingUnitControllers.HousingUnit import housing
from utils.config import init_app, db

app = Flask(__name__)
CORS(app)

load_dotenv()
init_app(app)

with app.app_context():
    db.create_all()

app.register_blueprint(housing , url_prefix='/housing')

app.register_blueprint(complaint , url_prefix='/complaint')
@app.route('/')
def hello_world():
    return 'Hello World!'


if __name__ == '__main__':
    app.run()