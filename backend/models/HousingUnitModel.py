from utils.config import db


class HousingUnit(db.Model):
    __tablename__ = 'housing_units'

    id = db.Column(db.Integer, primary_key=True)
    block_number = db.Column(db.String(10), nullable=False)
    unit_number = db.Column(db.String(10), nullable=False)
    type = db.Column(db.String(20))
