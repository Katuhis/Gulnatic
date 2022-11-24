from flask_restful import Resource
from pandas import read_json

from server.constant import url_versions
from server.connect import db


class Versions(Resource):
  def get(self):
    listVersions = read_json(url_versions)[0].to_list()

    collection = db.versions

    return {
      "status": "OK",
      "data": {
        "versions": db.list_collection_names()
      }
    }, 200
