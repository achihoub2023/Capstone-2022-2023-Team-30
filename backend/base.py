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
import config
from datetime import date
from NLP import Sentiment_Utils
import random as rnd
from Time_Series import arima
from bs4 import BeautifulSoup
from urllib.parse import urlparse
from urllib.request import urlopen
import pandas as pd
from googleapiclient.discovery import build
import matplotlib
import os
import glob
matplotlib.use('Agg')


api = Flask(__name__)
CORS(api)


def googleSearch(query,numberOfResults):
    api_key = config.api_key
    resource = build("customsearch", 'v1', developerKey=api_key).cse()
    result = resource.list(q=query, cx='f1df5b7295d8b453d').execute()
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


@api.route("/article_stats",methods = ["GET","POST"])
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
    req = request.get_json()
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
    files = glob.glob('backend/NLP/STATIC')
    for f in files:
        os.remove(f)
    stockName = json.loads(request.get_data())["stockName"]
    query = "business news stories on" + stockName 
    print(query)
    numberOfResults =  5
    titles,links = googleSearch(query,numberOfResults)
    sentiment = Sentiment_Utils.Sentiment_Utils()
    df = sentiment.analyze(links)
    list_of_articles = []
    for i in range(numberOfResults):
        # sentiment.plot_vader_scores_count(df,i)
        # sentiment.plot_vader_scores_dist(df,i)
        # sentiment.plot_finbert_scores_count(df,i)
        # sentiment.plot_finbert_scores_dist(df,i)
        try:
            json_body = {
                "link": links[i],
                "title":titles[i],
                "vader": str(df["VaderPolarities"][i]),
                "finbert":str(df["FinBertSentiments"][i]),
                "vader_stats": "".join(str(e )+"," for e in sentiment.vader_stats(df))[:-1],
                "finbert_stats": "".join(str(e )+"," for e in sentiment.finbert_stats(df))[:-1]
            }
        except KeyError:
            json_body = {
                "link": links[i],
                "title":titles[i],
                "vader": "Website cannot be scraped.",
                "finbert": "Website cannot be scraped.",
                "vader_stats": "Not Applicable",
                "finbert_stats": "Not Applicable"
            }
        list_of_articles.append(json_body)
    # df = df.to_json();
    
    response_body = {
        "articles":list_of_articles,
        "vader_list": sentiment.vader_score_string(df),
        "finbert_list": sentiment.finbert_score_string(df),
        "finbert_stats": sentiment.finbert_stats(df),
        "vader_stats": sentiment.vader_stats(df)
    }
    print("=======================")
    print(sentiment.vader_score_string(df))
    print(sentiment.finbert_score_string(df))
    print("=======================")

    return response_body

@api.route("/time_series_default", methods = ["GET","POST"])
def default_commodities():    
    stockName = json.loads(request.get_data())["stockTicker"]
    START = "2015-01-01"
    TODAY = date.today().strftime("%Y-%m-%d")
    print(TODAY)
    data = yf.download(stockName,'2022-01-01',datetime.today().strftime('%Y-%m-%d'))
    time_series = data["Adj Close"].to_dict()        
    indexed_series = {i:v for i,(k,v) in enumerate(time_series.items(), 1)}
    x_axis = pd.to_datetime(data.index).strftime("%Y-%m-%d").tolist()
    x_axis_body= "".join(str(e )+"," for e in x_axis)[:-1]
    y_axis = list(indexed_series.values())
    y_axis_body= "".join(str(e)+"," for e in y_axis)[:-1]
    
    predictor = arima.ARIMA_UTILS()
    x_axis_pred , y_axis_pred = predictor.make_standard_prediction(stockName)
    y_axis_pred[0] = y_axis[0]
    x_axis_pred = x_axis + x_axis_pred
    y_axis_pred = y_axis + y_axis_pred 
    x_axis_pred = "".join(str(e )+"," for e in x_axis_pred)[:-1]
    y_axis_pred = "".join(str(e)+"," for e in y_axis_pred)[:-1]
    
    
    response_body = {
        "x": x_axis_body,
        "y": y_axis_body,
        "x_pred": x_axis_pred,
        "y_pred": y_axis_pred
    }
    
    return response_body


def main():
    api.run(host="0.0.0.0", port=8081)


main()
