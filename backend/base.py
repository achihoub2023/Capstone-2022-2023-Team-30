from flask import Flask

api = Flask(__name__)

@api.route('/profile')
def my_profile():
    #basis for Get requests
    response_body = {
        "name": "Test",
        "about" :"HI, this is a test"
    }

    return response_body

