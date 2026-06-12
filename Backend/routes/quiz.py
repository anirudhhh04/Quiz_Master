from flask import Blueprint
from flask import request
from flask import jsonify

from flask_jwt_extended import jwt_required
from flask_jwt_extended import get_jwt_identity

from db import get_connection

quiz_bp = Blueprint("quiz",__name__)
@quiz_bp.route("/create-quiz", methods=["POST"])
@jwt_required() #checking token valid or not
def create_quiz():
    username = get_jwt_identity()
    data = request.get_json()
    title = data.get("title")
    description = data.get("description")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE username=%s",(username,))
    user=cursor.fetchone()
    if not user:
        return jsonify({"message": "User not found"}), 404
    user_id = user[0]
    cursor.execute("""INSERT INTO quizzes(title,description,created_by)VALUES( %s, %s, %s)""",(title,description,user_id))
    conn.commit()
    quiz_id = cursor.lastrowid  #fetching id of last row for adding next
    cursor.close()
    conn.close()
    return jsonify({"message": "Quiz created successfully","quiz_id": quiz_id}), 201
@quiz_bp.route("/add-question", methods=["POST"])
@jwt_required()


def add_question():
    data = request.get_json()
    quiz_id = data.get("quiz_id")
    question = data.get("question")
    option_a = data.get("option_a")
    option_b = data.get("option_b")
    option_c = data.get("option_c")
    option_d = data.get("option_d")
    correct_answer = data.get("correct_answer")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""INSERT INTO questions(quiz_id, question, option_a, option_b, option_c, option_d, correct_answer)
        VALUES( %s,%s,%s,%s,%s,%s,%s)""",( quiz_id, question, option_a, option_b, option_c, option_d, correct_answer))
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"message": "Question added successfully"}), 201

@quiz_bp.route("/quizzes", methods=["GET"])
def get_quizzes():
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute(""" SELECT id, title, description FROM quizzes""")
    quizzes = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(quizzes)

@quiz_bp.route("/quiz/<int:quiz_id>", methods=["GET"])
def get_quiz(quiz_id):
    conn = get_connection()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("""SELECT  id,  question,  option_a,  option_b,  option_c,  option_d FROM questions WHERE quiz_id=%s""",(quiz_id,))
    questions = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(questions)

@quiz_bp.route("/submit-quiz", methods=["POST"])
@jwt_required()
def submit_quiz():
    username = get_jwt_identity()
    data = request.get_json()
    quiz_id = data.get("quiz_id")
    answers = data.get("answers")
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE username=%s",(username,)) #find user id
    user = cursor.fetchone()
    user_id = user[0]
    score = 0
    for item in answers:
        question_id = item["question_id"]
        selected_answer = item["answer"]
        cursor.execute(""" SELECT correct_answer FROM questions WHERE id=%s """, (question_id,))
        result = cursor.fetchone()
        if result:
            correct_answer = result[0]
            if selected_answer.upper() == correct_answer:
                score += 1
    #Save attempt
    cursor.execute("""INSERT INTO attempts(user_id,quiz_id,score)VALUES(%s,%s,%s)""",(user_id,quiz_id,score))
    conn.commit()
    #total questions
    cursor.execute("""SELECT COUNT(*)FROM questions WHERE quiz_id=%s""",(quiz_id,))
    total = cursor.fetchone()[0]
    cursor.close()
    conn.close()
    return jsonify({"score": score,"total": total})