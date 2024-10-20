from config import db

class Allergy(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.Date, unique=False, nullable=False)
    kind = db.Column(db.String(120), unique=False, nullable=False)
    food = db.Column(db.String(80), unique=False, nullable=False)
    allergen = db.Column(db.String(120), unique=False, nullable=False)
    reaction = db.Column(db.String(120), unique=False, nullable=False)

    def to_json(self):
        return{
            "id": self.id,
            "kind": self.kind,
            "date": self.date.isoformat(),
            "food": self.food,
            "allergen": self.allergen,
            "reaction": self.reaction,
        }
    
class Allergen(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name=db.Column(db.String(12), unique=True, nullable=False);

    def to_json(self):
        return{
            "id": self.id,
            "name": self.name,
        }