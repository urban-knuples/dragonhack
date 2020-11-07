from flask import Flask

app = Flask(__name__)

count = 0

@app.route('/')
def hello_world():
    global count
    count += 1
    return 'Hello Dragonhack 2020! (You are visitor: {} )'.format(count)


if __name__ == '__main__':
    app.run()
