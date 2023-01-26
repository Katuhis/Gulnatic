from flask import Flask, render_template, Blueprint
from flask_cors import CORS


def create_app():
    app = Flask(__name__, template_folder='../public')
    app.config.from_object("config.DevelopmentConfig")

    CORS(app)

    blueprint_app = Blueprint('app', __name__, static_folder='../public/app/assets')
    blueprint_admin = Blueprint('admin', __name__, static_folder='../public/admin/assets', url_prefix='/admin')

    @blueprint_app.route("/")
    def home():
        return render_template('app/index.html')

    @blueprint_admin.route("/")
    def admin():
        return render_template('admin/index.html')

    app.register_blueprint(blueprint_app)
    app.register_blueprint(blueprint_admin)

    return app
