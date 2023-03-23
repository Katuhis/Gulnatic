from os import environ
from pymongo import MongoClient

from dotenv import load_dotenv

load_dotenv()


connectionString = f"mongodb+srv://{environ.get('DB_USERNAME')}:" \
                     f"{environ.get('DB_PASSWORD')}@" \
                     f"{environ.get('DB_CLUSTER')}"

def test():
    pass

client = MongoClient(connectionString)
db = client.get_database(environ.get('DB_NAME'))
