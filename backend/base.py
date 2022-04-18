from urllib import response
from flask import Flask, request
from flask_cors import CORS
import yfinance as yf
from datetime import datetime, timedelta
from ecommercetools import seo
import json
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
    date = req['date']
    # res = make_response(jsonify)
    # name = request.json["name"]
    dateLower = date_time_obj = (datetime.strptime(date,"%Y-%m-%d")- timedelta(days = 1)).strftime('%Y/%m/%d')
    print(dateLower)
    dateUpper = date
    results = seo.get_serps(f"tesla stock march 20, 2020 before:{dateLower} after:{dateUpper}")
    #out  = results["title"].to_json()
    response_body = {
        #"result":results[["title","link"]].to_json()
        "result": json.dumps(list(results[["title"]].T.to_dict().values()))
       # "about": "This is a test for post request"
    }
    return response_body

@api.route("/stockExample", methods=["POST"])
def sendStockData():
    req = request.get_json()
    print(req)
    stockName = req['name']
    stock = yf.Ticker(stockName)
    print(stock.get_info().keys())

    response_body = {
        "name": stock.get_info()["address1"],
        "about": "This is a test for post request"
    }

    return response_body

def main():
    api.run(host ="0.0.0.0", port = 8080);
 
main()   
    
    