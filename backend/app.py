from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from bson.objectid import ObjectId

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://mongo:27017/formations_db"
mongo = PyMongo(app)

# GET all formations
@app.route("/formations", methods=["GET"])
def get_formations():
    formations = []
    for f in mongo.db.formations.find():
        formations.append({
            "_id": str(f["_id"]),
            "title": f["title"]
        })
    return jsonify(formations)

# ADD formation
@app.route("/formations", methods=["POST"])
def add_formation():
    data = request.json
    mongo.db.formations.insert_one({
        "title": data["title"]
    })
    return jsonify({"message": "Formation ajoutée"})

# DELETE formation
@app.route("/formations/<id>", methods=["DELETE"])
def delete_formation(id):
    mongo.db.formations.delete_one({"_id": ObjectId(id)})
    return jsonify({"message": "Supprimée"})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)