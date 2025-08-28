from flask import Flask, request, jsonify
from flask_cors import CORS
import base64, cv2, numpy as np
from deepface import DeepFace
import mysql.connector
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.naive_bayes import MultinomialNB
import pickle

app = Flask(__name__)
CORS(app)

# Database for registered users (name -> face embedding)
registered_faces = {}


def get_embedding(img):
    # Returns face embedding vector
    embedding = DeepFace.represent(img, model_name="Facenet", enforce_detection=False,)
    if len(embedding) == 0:  # No face found
        return None
    return np.array(embedding[0]["embedding"])


@app.route("/register", methods=["POST"])
def register():
    data = request.json
    name = data["name"]
    image_data = data["image"]

    # Decode base64
    img_bytes = base64.b64decode(image_data.split(",")[1])
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    embedding = get_embedding(img)
    if embedding is None:
        return jsonify({"message": "No face detected during registration ❌"})

    registered_faces[name] = embedding.tolist()
    return jsonify({"message": f"{name} registered successfully ✅"})


@app.route("/attendance", methods=["POST"])
def attendance():
    data = request.json
    image_data = data["image"]

    # Decode base64
    img_bytes = base64.b64decode(image_data.split(",")[1])
    nparr = np.frombuffer(img_bytes, np.uint8)
    img = cv2.imdecode(nparr, cv2.IMREAD_COLOR)

    new_embedding = get_embedding(img)
    if new_embedding is None:
        return jsonify({"message": "No face detected ❌"})

    # Compare with registered faces
    for name, saved_embedding in registered_faces.items():
        dist = np.linalg.norm(new_embedding - np.array(saved_embedding))
        if dist < 10:  # threshold
            return jsonify({"message": f"{name} is Present ✅"})

    return jsonify({"message": "Unknown Face ❌"})






# ---- DB CONNECTION ----
db = mysql.connector.connect(
    host="localhost",
    user="root",       # change if needed
    password="",       # set if MySQL has a password
    database="society_db"
)
cursor = db.cursor(dictionary=True)

# ---- ML TRAINING ----
# Example training data
training_texts = [
    "water leakage", "tap repair", "pipe broken",
    "electricity not working", "fan repair", "wiring issue",
    "cleaning required", "dustbin full", "floor not clean"
]
training_labels = [
    "Plumber", "Plumber", "Plumber",
    "Electrician", "Electrician", "Electrician",
    "Cleaner", "Cleaner", "Cleaner"
]

vectorizer = TfidfVectorizer()
X = vectorizer.fit_transform(training_texts)
model = MultinomialNB()
model.fit(X, training_labels)

# Save model if needed
# pickle.dump((vectorizer, model), open("complaint_model.pkl","wb"))

def classify_complaint(title, description):
    text = title + " " + description
    X_test = vectorizer.transform([text])
    pred = model.predict(X_test)[0]
    probs = model.predict_proba(X_test)[0]
    conf = max(probs)
    return pred, float(conf)

# ---- API ROUTES ----

@app.route("/complaints", methods=["GET"])
def list_complaints():
    with db.cursor(dictionary=True) as cursor:
        cursor.execute("SELECT * FROM complaints ORDER BY created_at DESC")
        rows = cursor.fetchall()
    return jsonify(rows)


@app.route("/complaints", methods=["POST"])
def add_complaint():
    data = request.json
    title = data.get("title", "")
    description = data.get("description", "")
    resident_name = data.get("resident_name", "")
    flat_no = data.get("flat_no", "")
    attachment_url = data.get("attachment_url", "")

    category, confidence = classify_complaint(title, description)

    sql = """INSERT INTO complaints
             (title, description, resident_name, flat_no, attachment_url, category, confidence)
             VALUES (%s, %s, %s, %s, %s, %s, %s)"""

    with db.cursor() as cursor:
        cursor.execute(sql, (title, description, resident_name, flat_no, attachment_url, category, confidence))
        db.commit()

    return jsonify({"message": "Complaint added", "category": category, "confidence": confidence})


@app.route("/complaints/<int:cid>/status", methods=["PATCH"])
def update_status(cid):
    data = request.json
    status = data.get("status")

    sql = "UPDATE complaints SET status=%s WHERE id=%s"
    with db.cursor() as cursor:
        cursor.execute(sql, (status, cid))
        db.commit()

    return jsonify({"message": "Status updated"})


@app.route("/stats", methods=["GET"])
def stats():
    with db.cursor(dictionary=True) as cursor:
        cursor.execute("SELECT category, COUNT(*) as count FROM complaints GROUP BY category")
        category_counts = cursor.fetchall()
        cursor.execute("SELECT status, COUNT(*) as count FROM complaints GROUP BY status")
        status_counts = cursor.fetchall()
    return jsonify({"categories": category_counts, "statuses": status_counts})


if __name__ == "__main__":
    app.run(debug=True)
