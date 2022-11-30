from datetime import datetime
from flask_restful import Resource
from pandas import read_json

from server.constant import URL_VERSIONS, MIN_VERSION

from server.models.versions import VersionsModel


class Versions(Resource):
    def get(self):
        """
        List of versions
        """
        versions = VersionsModel()

        result_find = versions.find(
            condition={},
            fields=['number'],
            sort=[('dateUpload', -1)])

        result_data = result_find.get("result", None)
        result_error = result_find.get("error", None)

        if result_error:
            return {
                       "status": "ERROR",
                       "errors": [result_error]
                   }, 500
        else:
            return {
                       "status": "OK",
                       "data": {"versions": result_data}
                   }, 200


class VersionsUpload(Resource):
    def post(self):
        """
        Check and upload new version
        """
        # Getting list of versions from RIOT API
        list_versions = read_json(URL_VERSIONS)[0].to_list()
        list_versions = list_versions[0:(list_versions.index(MIN_VERSION) + 1)]

        versions = VersionsModel()

        result_data = 0
        result_error = []

        for i in range(len(list_versions) - 1, -1, -1):
            if not versions.find(
                    condition={"number": list_versions[i]}
            ).get("result", None):
                # Inserting every version, that not exists in DB
                result_insert = versions.insert(
                    [{
                        "number": list_versions[i],
                        "dateUpload": datetime.utcnow(),
                        "status": 0
                    }]
                )

                result_data += result_insert.get("result", 0)

                if result_insert.get("error", None):
                    result_error.append(result_insert.get("error"))

        if len(result_error) > 0:
            return {
                       "status": "ERROR",
                       "errors": result_error
                   }, 500
        else:
            return {
                       "status": "OK",
                       "data": {"inserted_count": result_data}
                   }, 200
