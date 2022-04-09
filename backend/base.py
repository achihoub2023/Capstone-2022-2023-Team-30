from flask import Flask, request
from flask_cors import CORS

api = Flask(__name__)
CORS(api)

@api.route('/profile')
def my_profile():
    #basis for Get requests
    response_body = {
        "name": "Test",
        "about" :"HI, this is a test for GET"
    }

    return response_body

@api.route("/data", methods=["POST"])
def sendData():
    # print(request.get_data())
    req = request.get_json()
    print(req)
    name = req['name']
    # res = make_response(jsonify)
    # name = request.json["name"]
    response_body = {
        "name": name,
        "about": "This is a test for post request"
    }
    return response_body