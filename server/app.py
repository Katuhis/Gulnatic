from flask import Flask, render_template

app = Flask(__name__, template_folder='../public')
app.config.from_object("config.DevelopmentConfig")


@app.route("/admin")
def admin():
    return render_template('admin/index.html')


@app.route("/")
def home():
    return render_template('app/index.html')


if __name__ == "__main__":
    app.run()
