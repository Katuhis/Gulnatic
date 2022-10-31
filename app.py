import os
from flask import Flask, render_template

app = Flask(__name__, template_folder='templates')


@app.route("/admin")
def admin():
    return render_template('admin//index.html')


@app.route("/")
def home():
    return render_template('app//home.html')


