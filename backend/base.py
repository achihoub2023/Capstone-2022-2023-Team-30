from urllib import response
from flask import Flask, request
from flask_cors import CORS
import yfinance as yf
from datetime import datetime, timedelta
from ecommercetools import seo
#import prophet_manager
import json
import pandas as pd
from datetime import date

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


@api.route("/time_series_default", methods = ["GET","POST"])
def default_commodities():
    print("called default")
    
    START = "2015-01-01"
    TODAY = date.today().strftime("%Y-%m-%d")
    # filter.add_filters("test", START, TODAY)
    # filter.add_complex_filter(
    #     "test_2", [("2016-07-10", "2020-04-06"), ("2019-05-07", "2020-02-06")])
    # print(filter.get_filters())
    # print(type(filter.complex_query("test_2")))
    #Get the data for the SPY ETF by specifying the stock ticker, start date, and end date
    data = yf.download('GNF=F','2015-01-01','2020-01-01')
    # Plot the close prices
    time_series = data["Adj Close"].to_dict()
    
   #print(time_series)
    
    indexed_series = {i:v for i,(k,v) in enumerate(time_series.items(), 1)}
    x_axis = pd.to_datetime(data.index).strftime("%Y-%m-%d").tolist()
    x_axis_body= "".join(str(e )+"," for e in x_axis)[:-1]
    y_axis = list(indexed_series.values())
    #out = time_series.index.to_pydatetime()
    #print(out)
    y_axis_body= "".join(str(e)+"," for e in y_axis)[:-1]
    response_body = {
        "x": x_axis_body,
        "y": y_axis_body
    }
    
    return response_body


def main():
    print('called main')
    api.run(host="0.0.0.0", port=8081)


main()
