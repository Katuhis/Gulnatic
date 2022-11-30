from pymongo import errors

from server.connect import db


class VersionsModel:
    def __init__(self):
        self.collection = db.get_collection("versions")

    def find(self,
             condition: dict,
             fields: list = None,
             sort: list = None) -> dict:
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
                return {"result": list(self.collection.find(condition, fields_dict).sort(sort))}
            else:
                # Executing with sorting
                return {"result": list(self.collection.find(condition, fields_dict))}
        except errors.PyMongoError as pymongo_error:
            return {"code": 500100, "message": str(pymongo_error)}

    def insert(self, records: list) -> dict:
        """
        Insert documents in collection
        """
        try:
            result = 0

            if len(records) == 1:
                # Inserting one document
                result_insert = self.collection.insert_one(records[0])
                if result_insert.inserted_id is not None:
                    result = 1
            else:
                # Inserting many documents
                result_insert = self.collection.insert_many(records)
                result = len(result_insert.inserted_ids)

            return {"result": result}
        except errors.PyMongoError as pymongo_error:
            return {"code": 500100, "message": str(pymongo_error)}
