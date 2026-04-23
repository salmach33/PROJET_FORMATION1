from flask import Flask, jsonify, request
from flask_pymongo import PyMongo
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
from bson.objectid import ObjectId
from datetime import timedelta

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://mongo:27017/formations_db"
app.config["JWT_SECRET_KEY"] = "super-secret-jwt-key-change-in-prod"
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=8)

mongo = PyMongo(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)

# ─────────────────────────────────────────
#  AUTH ROUTES
# ─────────────────────────────────────────

@app.route("/auth/register", methods=["POST"])
def register():
    data = request.json
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")
    name = data.get("name", "").strip()

    if not email or not password or not name:
        return jsonify({"error": "Tous les champs sont requis"}), 400

    if mongo.db.users.find_one({"email": email}):
        return jsonify({"error": "Email déjà utilisé"}), 409

    hashed = bcrypt.generate_password_hash(password).decode("utf-8")
    mongo.db.users.insert_one({"email": email, "password": hashed, "name": name})

    token = create_access_token(identity=email)
    return jsonify({"token": token, "name": name, "email": email}), 201


@app.route("/auth/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email", "").strip().lower()
    password = data.get("password", "")

    user = mongo.db.users.find_one({"email": email})
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"error": "Email ou mot de passe incorrect"}), 401

    token = create_access_token(identity=email)
    return jsonify({"token": token, "name": user.get("name", ""), "email": email}), 200


@app.route("/auth/me", methods=["GET"])
@jwt_required()
def me():
    email = get_jwt_identity()
    user = mongo.db.users.find_one({"email": email})
    if not user:
        return jsonify({"error": "Utilisateur introuvable"}), 404
    return jsonify({"name": user.get("name", ""), "email": email})


# ─────────────────────────────────────────
#  FORMATIONS ROUTES  (protected)
# ─────────────────────────────────────────

@app.route("/formations", methods=["GET"])
@jwt_required()
def get_formations():
    formations = []
    for f in mongo.db.formations.find():
        formations.append({
            "_id": str(f["_id"]),
            "title": f.get("title", ""),
            "description": f.get("description", ""),
            "duration": f.get("duration", ""),
            "level": f.get("level", "Débutant"),
            "category": f.get("category", ""),
        })
    return jsonify(formations)


@app.route("/formations", methods=["POST"])
@jwt_required()
def add_formation():
    data = request.json
    if not data.get("title"):
        return jsonify({"error": "Le titre est requis"}), 400

    mongo.db.formations.insert_one({
        "title": data["title"],
        "description": data.get("description", ""),
        "duration": data.get("duration", ""),
        "level": data.get("level", "Débutant"),
        "category": data.get("category", ""),
    })
    return jsonify({"message": "Formation ajoutée"}), 201


@app.route("/formations/<id>", methods=["DELETE"])
@jwt_required()
def delete_formation(id):
    result = mongo.db.formations.delete_one({"_id": ObjectId(id)})
    if result.deleted_count == 0:
        return jsonify({"error": "Formation introuvable"}), 404
    return jsonify({"message": "Supprimée"})


@app.route("/formations/<id>", methods=["PUT"])
@jwt_required()
def update_formation(id):
    data = request.json
    mongo.db.formations.update_one(
        {"_id": ObjectId(id)},
        {"$set": {
            "title": data.get("title", ""),
            "description": data.get("description", ""),
            "duration": data.get("duration", ""),
            "level": data.get("level", "Débutant"),
            "category": data.get("category", ""),
        }}
    )
    return jsonify({"message": "Mise à jour effectuée"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
