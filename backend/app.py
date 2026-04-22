from flask import Flask, jsonify
from flask_pymongo import PyMongo
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://localhost:27017/formations_db"
mongo = PyMongo(app)

@app.route("/")
def home():
    return jsonify({"message": "Bienvenue API Flask"})

@app.route("/formations")
def formations():
    return jsonify([
        {"title": "Docker"},
        {"title": "React"},
        {"title": "Flask"},
        {"title": "Test"},
        {"title": "Test2"},
    ])

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)