import mysql.connector
from config import Config
def get_connection():
    print("HOST =", repr(Config.DB_HOST))
    print("USER =", repr(Config.DB_USER))
    print("DB =", repr(Config.DB_NAME))
    print("PORT =", repr(Config.DB_PORT))
    connection = mysql.connector.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME,
        port=int(Config.DB_PORT)
    )
    return connection