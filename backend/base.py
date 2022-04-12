from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
app.debug = False
CORS(app)


@app.route('/hello_route')
def index():
    return "Hello, World!"


@app.route('/bye_route')
def give_rating():
    return "Bye, World!"



# Press the green button in the gutter to run the script.
if __name__ == '__main__':
    print("HI WEBSERVER")
    app.run(host="0.0.0.0", port=5001)

def my_profile():
    #basis for Get requests
    response_body = {
        "name": "Test",
        "about" :"HI, this is a test"
    }

    return response_body

