from flask_restful import Api

from server.resources.versions import Versions, VersionsUpload
from server.resources.champions import ChampionUpload, ChampionAllUpload
from server.resources.constants import Stats


def create_api(app):
    api = Api(app)

    api.add_resource(Stats, '/api/constants/stats')

    api.add_resource(Versions, '/admin/api/versions')
    api.add_resource(VersionsUpload, '/admin/api/versions/upload')

    api.add_resource(ChampionUpload, '/admin/api/<string:version>/champions/<champion_id>/upload')
    api.add_resource(ChampionAllUpload, '/admin/api/<string:version>/champions/upload')


