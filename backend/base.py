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

api = Flask(__name__)
CORS(api)


def googleSearchV2(query,numberOfResults,startyear,startmonth,startday,endyear,endmonth,endday,numstart):
    api_key = config.api_key
    api_key = api_key
    resource = build("customsearch", 'v1', developerKey=api_key).cse()
    startyear = str(startyear)
    if(int(startday)<10):
        startday = '0'+str(startday)
    else:
        startday = str(startday)
    if(int(startmonth)<10):
        startmonth = '0'+str(startmonth)
    else:
        startmonth = str(startmonth)
    endyear = str(endyear)
    if(int(endday)<10):
        endday = '0'+str(endday)
    else:
        endday = str(endday)
    if(int(endmonth)<10):
        endmonth= '0'+str(endmonth)
    else:
        endmonth = str(endmonth)
    startdate = startyear+startmonth+startday
    enddate = endyear+endmonth+endday
    result = resource.list(q=query, cx='f1df5b7295d8b453d', sort="date:r:"+startdate+":"+enddate, start=numstart).execute()
    #, sort="date:r:20610101:20231231"
    
    if(len(result['items'])<numberOfResults):
        numberOfResults = len(result['items'])
    links = [0 for _ in range(numberOfResults)]
    titles = [0 for _ in range(numberOfResults)]
    for i in range(numberOfResults):
        titles[i] = result['items'][i]['title']
        links[i] = result['items'][i]['link']
        #print(titles[i])
    return titles,links



def webscraper(query,numberofresults,startyear,startmonth,startday,endyear,endmonth,endday):
    _,urls = googleSearchV2(query,numberofresults,startyear,startmonth,startday,endyear,endmonth,endday,0)
    out = pd.DataFrame(columns=['source', 'text'])
    d = {}
    nummissing = 0
    d['source'] = []
    d['text'] = []
    for url in urls:
    #url = "https://www.foxbusiness.com/energy/chevron-ceo-denies-biden-oil-lease-claim-details-practical-energy-policy"
    #url = "https://www.reuters.com/business/energy/chevrons-output-gains-venezuela-limited-by-political-risk-ceo-says-2023-02-28/"
        try:
            page = urlopen(url)
        except:
            nummissing+=1
            continue
        html = page.read().decode("utf-8")
        soup = BeautifulSoup(html, "html.parser")
    #out = json.dumps(soup.get_text())
        source = urlparse(url).hostname
        text = soup.get_text()
        d['text'].append(text)
        d['source'].append(source)
    start = len(urls)
    while(nummissing>0):
        _,urls = googleSearchV2(query,10,startyear,startmonth,startday,endyear,endmonth,endday,start)
        for url in urls:
            try:
                page = urlopen(url)
                nummissing-=1
            except:
                continue
            html = page.read().decode("utf-8")
            soup = BeautifulSoup(html, "html.parser")
            source = urlparse(url).hostname
            text = soup.get_text()
            d['text'].append(text)
            d['source'].append(source)
            if(nummissing<=0):
                break
            else:
                start=start+10
    out = pd.DataFrame.from_dict(d)
    return out


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
    print(json.loads(request.get_data()))
    stockName = json.loads(request.get_data())["stockName"]
    query = "business news stories on" + stockName 
    print(query)
    numberOfResults = 5
    titles,links = googleSearch(query,numberOfResults)
    sentiment = Sentiment_Utils.Sentiment_Utils()
    df = sentiment.analyze(links)
    list_of_articles = []
    print(df["VaderPolarities"])
    print(df["FinBertSentiments"])
    for i in range(numberOfResults):
        try:
            json_body = {
                "link": links[i],
                "title":titles[i],
                "vader": str(df["VaderPolarities"][i]),
                "finbert":str(df["FinBertSentiments"][i])
            }
        except KeyError:
            json_body = {
                "link": links[i],
                "title":titles[i],
                "vader": "Website cannot be scraped.",
                "finbert": "Website cannot be scraped."
            }
        list_of_articles.append(json_body)
    df = df.to_json();
    
    response_body = {
        "articles":list_of_articles,
        "df": df
    }
    return response_body

@api.route("/time_series_default", methods = ["GET","POST"])
def default_commodities():    
    stockName = json.loads(request.get_data())["stockTicker"]
    START = "2015-01-01"
    TODAY = date.today().strftime("%Y-%m-%d")
    print(TODAY)
    data = yf.download(stockName,'2015-01-01',datetime.today().strftime('%Y-%m-%d'))
    time_series = data["Adj Close"].to_dict()        
    indexed_series = {i:v for i,(k,v) in enumerate(time_series.items(), 1)}
    x_axis = pd.to_datetime(data.index).strftime("%Y-%m-%d").tolist()
    x_axis_body= "".join(str(e )+"," for e in x_axis)[:-1]
    y_axis = list(indexed_series.values())
    y_axis_body= "".join(str(e)+"," for e in y_axis)[:-1]
    
    predictor = arima.ARIMA_UTILS()
    x_axis_pred , y_axis_pred = predictor.make_standard_prediction(stockName)
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
