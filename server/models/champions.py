import bson
from pymongo import errors

from server.connect import db
from server.common.exceptions import MainError


class ChampionsModel:
    def __init__(self):
        self.collection = db.get_collection("champions")

    def find(self,
             condition: dict,
             fields: list = None,
             sort: list = None
             ) -> list:
        try:
            # Set up fields for searching in collection
            fields_dict = {}

            if fields:
                for f in fields:
                    fields_dict[f] = True

            if (len(fields_dict) > 0) and (fields_dict.get("_id", None) is None):
                fields_dict["_id"] = False

            # Set up sorting in collection
            if sort is not None:
                # Executing without sorting
                return list(self.collection.find(condition, fields_dict).sort(sort))
            else:
                # Executing with sorting
                return list(self.collection.find(condition, fields_dict))
        except errors.PyMongoError as pymongo_error:
            raise MainError(500100, str(pymongo_error))

    def insert_record(self, record) -> bson.ObjectId:
        try:
            return self.collection.insert_one(record).inserted_id
        except errors.PyMongoError as pymongo_error:
            raise MainError(500100, str(pymongo_error))

    def delete_record(self, condition) -> int:
        try:
            return self.collection.delete_one(condition).deleted_count
        except errors.PyMongoError as pymongo_error:
            raise MainError(500100, str(pymongo_error))

    def upsert_record(self, record) -> bson.ObjectId:
        if self.find({'version': record.get('version'), 'id': record.get('id')}):
            self.delete_record({'version': record.get('version'), 'id': record.get('id')})

        return self.insert_record(record)
