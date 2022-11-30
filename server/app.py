from flask import Flask, render_template


def create_app():
    app = Flask(__name__, template_folder='../public')
    app.config.from_object("config.DevelopmentConfig")

    @app.route("/admin")
    def admin():
        return render_template('admin/index.html')

    @app.route("/")
    def home():
        return render_template('app/index.html')

    return app
