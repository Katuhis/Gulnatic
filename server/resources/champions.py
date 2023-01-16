from pandas import read_json
from flask_restful import Resource
from urllib.error import HTTPError
from datetime import datetime

from server.constants.urls import URL_CHAMPION_LIST, URL_CHAMPION
from server.models.champions import ChampionsModel
from server.common.exceptions import MainError


def champion_upload(version, champion_id) -> int:
    champion_src = read_json(URL_CHAMPION.format(version, champion_id))['data'][champion_id]

    champion_dest = {'id': champion_src.get('id'), 'key': champion_src.get('key'), 'name': champion_src.get('name'),
                     'title': champion_src.get('title'), 'image': champion_src.get('image'),
                     'lore': champion_src.get('lore'), 'tags': champion_src.get('tags'),
                     'partype': champion_src.get('partype'), 'stats': champion_src.get('stats'), 'skills': {
            'passive': {
                'id': champion_src.get('id') + 'P',
                'name': champion_src.get('passive', {}).get('name'),
                'image': champion_src.get('passive', {}).get('image'),
                'description': {
                    'text': champion_src.get('passive', {}).get('description')
                },
                'cooldown': []
            },
            'skill1': {
                'id': champion_src.get('spells')[0].get('id'),
                'name': champion_src.get('spells')[0].get('name'),
                'image': champion_src.get('spells')[0].get('image'),
                'description': {
                    'text': champion_src.get('spells')[0].get('tooltip')
                },
                'cooldown': champion_src.get('spells')[0].get('cooldown'),
                'cost': champion_src.get('spells')[0].get('cost')
            },
            'skill2': {
                'id': champion_src.get('spells')[1].get('id'),
                'name': champion_src.get('spells')[1].get('name'),
                'image': champion_src.get('spells')[1].get('image'),
                'description': {
                    'text': champion_src.get('spells')[1].get('tooltip')
                },
                'cooldown': champion_src.get('spells')[1].get('cooldown'),
                'cost': champion_src.get('spells')[1].get('cost')
            },
            'skill3': {
                'id': champion_src.get('spells')[2].get('id'),
                'name': champion_src.get('spells')[2].get('name'),
                'image': champion_src.get('spells')[2].get('image'),
                'description': {
                    'text': champion_src.get('spells')[2].get('tooltip')
                },
                'cooldown': champion_src.get('spells')[2].get('cooldown'),
                'cost': champion_src.get('spells')[2].get('cost')
            },
            'ult': {
                'id': champion_src.get('spells')[3].get('id'),
                'name': champion_src.get('spells')[3].get('name'),
                'image': champion_src.get('spells')[3].get('image'),
                'description': {
                    'text': champion_src.get('spells')[3].get('tooltip')
                },
                'cooldown': champion_src.get('spells')[3].get('cooldown'),
                'cost': champion_src.get('spells')[3].get('cost')
            }
        }, 'version': version,
        'date_upload': datetime.utcnow()}

    result = 0
    champions = ChampionsModel()
    if champions.upsert_record(champion_dest):
        result = 1

    return result


class ChampionUpload(Resource):
    def post(self, version, champion_id):
        try:
            try:
                result = champion_upload(version, champion_id)

                return {
                           "status": "OK",
                           "data": {"inserted_count": result}
                       }, 200
            except HTTPError as e:
                raise MainError(e.code, e.reason)
        except MainError as e:
            print("MainError")
            return {
                       "status": "ERROR",
                       "error": {
                           "code": e.code,
                           "message": e.message
                       }
                   }, 500


class ChampionAllUpload(Resource):
    def post(self, version):
        try:
            try:
                champion_list = list(read_json(URL_CHAMPION_LIST.format(version)).index)

                result = 0
                for champion in champion_list:
                    result += champion_upload(version, champion)

                return {
                    "status": "OK",
                    "result": {"data":
                        {
                            "inserted_count": result
                        }
                    }
                }, 200
            except HTTPError as e:
                raise MainError(e.code, e.reason)
        except MainError as e:
            print("MainError")
            return {
                       "status": "ERROR",
                       "error": {
                           "code": e.code,
                           "message": e.message
                       }
                   }, 500
