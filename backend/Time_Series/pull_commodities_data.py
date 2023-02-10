# We will write a filter manager
# two types of filters
""""
Complex filters: have multiple dates stored as a list

Non-Complex filters: have multiple dates not stored as a list

All filters are stored in an overraching dict

"""

from datetime import date
import investpy
import yfinance as yf  
import matplotlib.pyplot as plt
import requests
import pandas as pd
import matplotlib.pyplot as plt
import json
import datetime
import config
class commodities_data:
    # constructor
    def __init__(self):
        pass
    #def stockhistory(company,startyear,startmonth,startday,endyear,endmonth,endday):
    def stockhistory(self,company,timeframe,start,end):
        #timeframe = 'Weekly'
        capitalname = timeframe.upper()
        # replace the "demo" apikey below with your own key from https://www.alphavantage.co/support/#api-key
        url = 'https://www.alphavantage.co/query?function=TIME_SERIES_'+capitalname+'&symbol='+company+'&apikey='+config.nasdaq_key
        r = requests.get(url)
        dictionary = r.json()
        dictionary = dictionary[timeframe+' Time Series']

        xAxis = [key for key, value in dictionary.items()]
        #start = startyear +'-' + startmonth + '-'+startday
        #end = endyear +'-' + endmonth + '-'+endday
        newyAxis = [0 for _ in range(len(xAxis))]
        newxAxis = [0 for _ in range(len(xAxis))]
        counter=  0
        for date in xAxis:
        

            if((date>start) & (date<end)):
                newxAxis[counter] = date
                newyAxis[counter] = float(dictionary[date]['1. open'])
                counter+=1
    
        xAxis = newxAxis[0:counter]
        yAxis = newyAxis[0:counter]
        plt.grid(True)

        # ## LINE GRAPH ##
        # plt.plot(xAxis,yAxis, color='maroon', marker='o')
        # plt.xlabel('variable')
        # plt.ylabel('value')


        # plt.show()
        return xAxis,yAxis

# main method for testing


def main():
    tester = commodities_data()
    tester.stockhistory('GC=F','Weekly','2017-02-11','2018-01-02')


main()
