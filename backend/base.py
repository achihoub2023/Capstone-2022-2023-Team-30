from urllib import response
from flask import Flask, request
from flask_cors import CORS
import yfinance as yf
from datetime import datetime, timedelta
from ecommercetools import seo
#import prophet_manager
import json
import pandas as pd
import re
from googleapiclient.discovery import build
from datetime import date

api = Flask(__name__)
CORS(api)


def googleSearch(query,numberOfResults):
    api_key = "AIzaSyBE7Dphy-kgwtjVkOWHJXRHIPj5FIAca5A"
    
    

    resource = build("customsearch", 'v1', developerKey=api_key).cse()
    result = resource.list(q=query, cx='f1df5b7295d8b453d').execute()
    #results = result['items'][0:numberOfResults]
    #results = result['items'][0]
    links = [0 for _ in range(numberOfResults)]
    titles = [0 for _ in range(numberOfResults)]
    for i in range(numberOfResults):
        titles[i] = result['items'][i]['title']
        links[i] = result['items'][i]['link']
    return titles,links


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
    # Preprocessing ------------------------------------------
    req = request.get_json()  # get request endpoint
    date = req['date']  # extract date attr from request
    stockName = req['stock']  # extract date attr from request
    print(f"\n\nDate: {date}\nStock: {stockName}\n\n")
    # find day before requested date
    dateLower = (
        datetime.strptime(date, "%Y-%m-%d") - timedelta(days=1)).strftime('%Y/%m/%d')
    dateUpper = date  # dateLower is day before, dateUpper is the day requested
    # Preprocessing ------------------------------------------

    # Make request to google search api
    results = seo.get_serps(
        f"{stockName} stock march 20, 2020 before:{dateLower} after:{dateUpper}"
    )

    oldValues, newValues, obamaPerform, bidenPerform, obamaIncrease, bidenIncrease, overallBidenIncrease, overallImmediateIncrease = prophet_manager.main()
    # Send response to client
    response_body = {
        "result": json.dumps(list(results["title"].str.split("\n").map(lambda x: x[0]).T.to_dict().values())),
        "about": json.dumps(list(results["link"].T.to_dict().values())),
        "old_values_of_Stock": oldValues,
        "predicted_values_of_stock": newValues,
        "obamaPerform": obamaPerform,
        "bidenPerform": bidenPerform,
        "obamaIncrease": obamaIncrease,
        "bidenIncrease": bidenIncrease,
        "overallBidenIncrease": overallBidenIncrease,
        "overallImmediateIncrease": overallImmediateIncrease
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

@api.route("/searchResults", methods = ["POST"])
def sendSearch():
    stockName = json.loads(request.get_data())["stockName"]

    query = stockName
    numberOfResults = 5
    titles,links = googleSearch(query,numberOfResults)
    list_of_articles = []
    for i in range(len(titles)):
        json_body = {
            "link": links[i],
            "title":titles[i]
        }
        list_of_articles.append(json_body)
    
    response_body = {
        "articles":list_of_articles
    }
    print(response_body)
    return response_body

@api.route("/time_series_default", methods = ["GET","POST"])
def default_commodities():    
    print(request.get_data())
    stockName = json.loads(request.get_data())["stockName"]
    START = "2015-01-01"
    TODAY = date.today().strftime("%Y-%m-%d")
    data = yf.download(stockName,'2015-01-01','2020-01-01')
    time_series = data["Adj Close"].to_dict()        
    indexed_series = {i:v for i,(k,v) in enumerate(time_series.items(), 1)}
    x_axis = pd.to_datetime(data.index).strftime("%Y-%m-%d").tolist()
    x_axis_body= "".join(str(e )+"," for e in x_axis)[:-1]
    y_axis = list(indexed_series.values())
    y_axis_body= "".join(str(e)+"," for e in y_axis)[:-1]
    response_body = {
        "x": x_axis_body,
        "y": y_axis_body
    }
    
    return response_body


def main():
    api.run(host="0.0.0.0", port=8081)


main()
