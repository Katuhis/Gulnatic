from flask_restful import Resource
from pandas import read_json

from server.constant import url_versions


class Versions(Resource):
  def get(self):
    listVersions = read_json(url_versions)[0].to_list()

    return {
      "status": "OK",
      "data": {
        "versions": listVersions
      }
    }, 200
