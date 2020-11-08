from flask import Flask
from flask import render_template

app = Flask(__name__)


@app.route('/')
def index(param=''):
    return render_template('base.html', id=param)


if __name__ == '__main__':
    app.run()
