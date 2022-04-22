from urllib import response
from flask import Flask, request
from flask_cors import CORS
import yfinance as yf
from datetime import datetime, timedelta
from ecommercetools import seo
import json
api = Flask(__name__)
CORS(api)


def my_profile():
    print('called myProfile')
    # basis for Get requests
    response_body = {
        "name": "Test",
        "about": "HI, this is a test for GET"
    }

    return response_body


@api.route("/data", methods=["POST"])
def sendData():
    print('called 1sendData')
    # Preprocessing ------------------------------------------
    req = request.get_json()  # get request endpoint
    date = req['date']  # extract date attr from request
    stockName = req['stock']  # extract date attr from request
    # find day before requested date
    dateLower = (
        datetime.strptime(date, "%Y-%m-%d") - timedelta(days=1)).strftime('%Y/%m/%d')
    dateUpper = date  # dateLower is day before, dateUpper is the day requested
    # Preprocessing ------------------------------------------

    # Make request to google search api
    results = seo.get_serps(
        f"{stockName} stock march 20, 2020 before:{dateLower} after:{dateUpper}"
    )

    # Send response to client
    response_body = {
        "result": json.dumps(list(results["title"].str.split("\n").map(lambda x: x[0]).T.to_dict().values())),
        "about": json.dumps(list(results["link"].T.to_dict().values()))
    }
    return response_body


@api.route("/stockExample", methods=["POST"])
def sendStockData():
    print('called sendStockData')
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
    print('called main')
    api.run(host="0.0.0.0", port=8081)


main()
