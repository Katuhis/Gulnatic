from pymongo import MongoClient
from os import environ
from dotenv import load_dotenv

load_dotenv()


db_cluster = environ.get('DB_CLUSTER')
db_user = environ.get('DB_USERNAME')
db_password = environ.get('DB_PASSWORD')
connectString = f"mongodb+srv://{db_user}:{db_password}@{db_cluster}"
client = MongoClient(connectString)

db = client.gulnaLOLDB
