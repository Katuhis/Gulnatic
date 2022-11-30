from flask_restful import Api

from server.resources.versions import Versions, VersionsUpload


def create_api(app):
    api = Api(app)

    api.add_resource(Versions, '/admin/api/versions')
    api.add_resource(VersionsUpload, '/admin/api/versions/upload')
