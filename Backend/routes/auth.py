from flask import Blueprint
from flask import request
from flask import jsonify
from flask_jwt_extended import create_access_token #for login
import bcrypt #for hashing
from db import get_connection
auth_bp = Blueprint("auth",__name__)
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    if not username or not password:
        return jsonify({
            "message": "Username and password required"
        }), 400
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE username=%s",(username,))
    user = cursor.fetchone()
    if user:
        cursor.close()
        conn.close()
        return jsonify({"message": "Username already exists"}), 400
    hashed_password = bcrypt.hashpw( password.encode(), bcrypt.gensalt() )
    cursor.execute(
        """
        INSERT INTO users(username,password)
        VALUES(%s,%s)
        """,
        (
            username,
            hashed_password.decode()
        )
    )

    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Registration successful"}), 201
@auth_bp.route("/login", methods=["POST"])

def login():
    data = request.get_json()
    username = data.get("username")
    password = data.get("password")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute( "SELECT * FROM users WHERE username=%s", (username,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()
    if not user:
        return jsonify({
            "message": "Invalid username"
        }), 401
    stored_hash = user[2]
    if not bcrypt.checkpw(password.encode(),stored_hash.encode()):
        return jsonify({"message": "Invalid password"}), 401
    token = create_access_token(identity=username)
    return jsonify({"message": "Login successful","token": token})