from datetime import datetime
from flask_restful import Resource
from pandas import read_json
from urllib.error import HTTPError

from server.constants.urls import URL_VERSIONS, MIN_VERSION
from server.common.exceptions import MainError
from server.models.versions import VersionsModel


class Versions(Resource):
    def get(self):
        """
        List of versions
        """
        try:
            versions = VersionsModel()

            result = versions.select_all_versions_numbers()

            return {
                       "status": "OK",
                       "data": {"versions": result}
                   }, 200
        except MainError as e:
            return {
                       "status": "ERROR",
                       "error": {
                           "code": e.code,
                           "message": e.message
                       }
                   }, 500


class VersionsUpload(Resource):
    def post(self):
        """
        Check and upload new version
        """
        try:
            # Getting list of versions from RIOT API
            list_versions = read_json(URL_VERSIONS)[0].to_list()
            list_versions = list_versions[0:(list_versions.index(MIN_VERSION) + 1)]

            versions = VersionsModel()

            result_data = 0

            for i in range(len(list_versions) - 1, -1, -1):
                result_insert = versions.insert_record_if_not_exists(
                    {
                        "number": list_versions[i],
                        "dateUpload": datetime.utcnow(),
                        "status": 0
                    }
                )
                if result_insert:
                    result_data += 1

            return {
                       "status": "OK",
                       "data": {"inserted_count": result_data}
                   }, 200
        except HTTPError as e:
            raise MainError(e.code, e.reason)
        except MainError as e:
            return {
                       "status": "ERROR",
                       "error": {
                           "code": e.code,
                           "message": e.message
                       }
                   }, 500
