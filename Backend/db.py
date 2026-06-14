import mysql.connector
from config import Config
def get_connection():
    connection = mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME,
        port=int(Config.DB_PORT)
    )
    return connection