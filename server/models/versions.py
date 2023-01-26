import bson
from pymongo import errors

from server.connect import db
from server.common.exceptions import MainError


class VersionsModel:
    def __init__(self):
        self.collection = db.get_collection("versions")

    def find(self,
             condition: dict,
             fields: list = None,
             sort: list = None) -> list:
        """
        Search documents in collection
        """
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

    def insert_record(self, record: dict) -> bson.ObjectId:
        """
        Insert one document in collection
        """
        try:
            return self.collection.insert_one(record).inserted_id
        except errors.PyMongoError as pymongo_error:
            raise MainError(500100, str(pymongo_error))

    def insert_record_if_not_exists(self, record: dict) -> bson.ObjectId:
        """
        Insert one document in collection if not exists
        """
        if not self.find(condition={"number": record["number"]}):
            result_insert = self.insert_record(record)
        else:
            result_insert = None

        return result_insert

    def insert_record_list(self, records: list) -> list:
        """
        Insert list of documents in collection
        """
        try:
            return self.collection.insert_many(records).inserted_ids
        except errors.PyMongoError as pymongo_error:
            raise MainError(500100, str(pymongo_error))
