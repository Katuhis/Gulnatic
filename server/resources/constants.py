from flask_restful import Resource

from server.constants.stats import STATS


class Stats(Resource):
    def get(self):
        return STATS, 200
