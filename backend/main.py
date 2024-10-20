from flask import request, jsonify
from config import app, db
from models import Allergy
from datetime import datetime, timedelta
from models import Allergen

@app.route("/allergies", methods=["GET"])
def get_allergies():
    allergies = Allergy.query.all()
    json_allergies = list(map(lambda x: x.to_json(), allergies))
    return jsonify({"allergies": json_allergies})


@app.route("/create_allergy", methods=["POST"])
def create_allergy():
    date_str=request.json.get("date")
    kind = request.json.get("kind")
    food = request.json.get("food")
    allergen = request.json.get("allergen")
    reaction = request.json.get("reaction")

    if not date_str or not kind or not food or not allergen or not reaction:
        return (
            jsonify({"message": "Include all inputs"}),
            400,
        )
    
    date_obj=datetime.strptime(date_str,"%Y-%m-%d").date()

    new_allergy = Allergy(date=date_obj, kind=kind, food=food, allergen=allergen, reaction=reaction)
    try:
        db.session.add(new_allergy)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400
    
    return jsonify({"message": "Allergy added!"}), 201

@app.route("/update_allergy/<int:user_id>", methods =["PATCH"])
def update_allergy(user_id):
    allergy=Allergy.query.get(user_id)

    if not allergy:
        return jsonify({"message": "allergy not found"}), 404
    
    data = request.json
    date_str = data["date"]
    allergy.date = datetime.strptime(date_str, "%Y-%m-%d").date()
    allergy.kind=data.get("kind", allergy.kind)
    allergy.food=data.get("food", allergy.food)
    allergy.allergen=data.get("allergen", allergy.allergen)
    allergy.reaction=data.get("reaction", allergy.reaction)

    db.session.commit()

    return jsonify({"message": "Allergy updated."}), 200

@app.route("/delete_allergy/<int:user_id>", methods=["DELETE"])
def delete_allergy(user_id):
    allergy = Allergy.query.get(user_id)

    if not allergy:
        return jsonify({"message": "Allergy not found"}), 404
    
    db.session.delete(allergy)
    db.session.commit()

    return jsonify({"message": "Allergy deleted!"}), 200



@app.route("/allergens", methods=["GET"])
def get_allergens():
    allergens = Allergen.query.all()
    json_allergens = list(map(lambda x: x.to_json(), allergens))
    return jsonify({"allergens": json_allergens})

@app.route("/create_allergen", methods=["POST"])
def create_allergen():
    name = request.json.get("name")
    if not name:
        return jsonify({"message": "Allergen name is required."}), 400
    allergen = Allergen(name=name)
    db.session.add(allergen)
    db.session.commit()
    return jsonify({"message": "Allergen added!"}), 201

@app.route("/delete_allergen/<int:user_id>", methods=["DELETE"])
def delete_allergen(user_id):
    allergen = Allergen.query.get(user_id)

    if not allergen:
        return jsonify({"message": "Allergen not found"}), 404
    
    db.session.delete(allergen)
    db.session.commit()

    return jsonify({"message": "Allergen deleted!"}), 200

@app.route("/allergies/last_<timeframe>", methods=["GET"])
def get_allergy_counts(timeframe):
    kind = request.args.get("kind")
    
    # Define the date range based on the timeframe
    end_date = datetime.now()
    if timeframe == "week":
        start_date = end_date - timedelta(days=7)
    elif timeframe == "month":
        start_date = end_date - timedelta(days=30)  # Approximate one month
    elif timeframe == "year":
        start_date = end_date - timedelta(days=365)  # Approximate one year
    else:
        return jsonify({"message": "Invalid timeframe"}), 400

    # Query the database for allergy counts
    query = Allergy.query.filter(Allergy.date >= start_date, Allergy.date <= end_date)
    
    if kind and kind != "All":
        query = query.filter(Allergy.kind == kind)

    allergies = query.all()

    # Create a dictionary to count occurrences
    counts = {}
   

    current_date = start_date
    while current_date <= end_date:
        date_str = current_date.strftime("%Y-%m-%d")  # Format date as a string
        counts[date_str] = 0  # Initialize count to 0
        current_date += timedelta(days=1)

    for allergy in allergies:
        date_str = allergy.date.strftime("%Y-%m-%d")  # Format date as a string
        if date_str not in counts:
            counts[date_str] = 0
        counts[date_str] += 1

    dates=list(counts.keys())
    counts_array=list(counts.values())
    # Prepare the data for the response
    response_data = {
        "dates": dates,
        "counts": counts_array  # Ensure all dates are represented
    }

    return jsonify(response_data)



if __name__ =="__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)