from app import create_app
from api import create_api
from connect import db

if __name__ == "__main__":
    app = create_app()
    create_api(app)
    if db is not None:
        print('Connected to database!')

    app.run(use_reloader=False)
