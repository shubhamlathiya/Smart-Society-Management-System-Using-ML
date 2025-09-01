from flask import Blueprint, request, jsonify

complaint = Blueprint('complaint', __name__)



@complaint.route('/', methods=['POST'] , endpoint='addComplaint')
def addComplaint():
    data = request.get_json()
    print(data)
    return jsonify({"status": "success", "message": "Housing units added successfully"}) ,201