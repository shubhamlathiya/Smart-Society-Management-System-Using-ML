from flask import Blueprint, jsonify, request

from models.HousingUnit import HousingUnit
from utils.config import db

housing = Blueprint('housing', __name__)


@housing.route('/', methods=['GET'], endpoint='housing')
def housing123():
    housing  = HousingUnit.query.filter_by().all()
    print(housing)

    housing_data = [{
        'id': unit.id,
        'block_number': unit.block_number,
        'unit_number': unit.unit_number,
        'type': unit.type
        # Add all other relevant fields
    } for unit in housing]
    # print(housing_data)
    return jsonify(housing_data)


@housing.route('/', methods=['POST'])
def add_housing_units():
    try:
        print(request)
        data = request.get_json()
        print(data)
        if not isinstance(data, list):
            return jsonify({"error": "Expected a list of housing units"}), 400

        new_units = []
        for unit in data:
            block_number = unit.get("blockNumber")
            unit_number = unit.get("unitNumber")
            unit_type = unit.get("type")

            if not block_number or not unit_number:
                return jsonify({"error": "blockNumber and unitNumber are required"}), 400

            new_unit = HousingUnit(
                block_number=block_number,
                unit_number=unit_number,
                type=unit_type
            )
            new_units.append(new_unit)

        db.session.add_all(new_units)
        db.session.commit()
    
        return jsonify({"status": "success", "message": "Housing units added successfully"}), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500
