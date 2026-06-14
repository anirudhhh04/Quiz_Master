import os
from flask import Flask
from flask_cors import CORS
from flask_jwt_extended import JWTManager
from config import Config
from routes.auth import auth_bp
from routes.quiz import quiz_bp
from datetime import timedelta
from dotenv import load_dotenv
load_dotenv()
app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = Config.JWT_SECRET_KEY
app.config["JWT_ACCESS_TOKEN_EXPIRES"] = timedelta(hours=24)
CORS(app)
jwt = JWTManager(app)
app.register_blueprint(auth_bp)
app.register_blueprint(quiz_bp)
@app.route("/")
def home():

    return {
        "message": "QuizMaster Backend Running"
    }

if __name__ == "__main__":
    port = int(os.environ.get("PORT",5000))
    app.run(host="0.0.0.0",port=port,debug=False)
@app.errorhandler(Exception)
def handle_error(e):
    print("ERROR:", e)
    return {"error": str(e)}, 500
    