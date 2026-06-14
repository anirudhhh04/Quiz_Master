import os
class Config:
    SECRET_KEY = os.getenv("SECRET_KEY", "quizmaster-secret-key")
    DB_HOST = os.getenv("DB_HOST")
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = os.getenv("DB_PASSWORD")
    DB_NAME = os.getenv("DB_NAME")
    DB_PORT = os.getenv("DB_PORT")
    JWT_SECRET_KEY = os.getenv( "JWT_SECRET_KEY", "jwt-secret-key")