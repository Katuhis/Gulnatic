from flask import Flask, render_template
from flask_restful import Api

from resources.versions import Versions

app = Flask(__name__, template_folder='../public')
app.config.from_object("config.DevelopmentConfig")

api = Api(app)

api.add_resource(Versions, '/admin/api/versions')


@app.route("/admin")
def admin():
  return render_template('admin/index.html')


@app.route("/")
def home():
  return render_template('app/index.html')
