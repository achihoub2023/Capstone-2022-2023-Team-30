import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
import yfinance as yf
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import mean_squared_error
from sklearn.metrics import mean_absolute_error
from sklearn.model_selection import train_test_split
from statsmodels.tsa.arima.model import ARIMA
from statsmodels.tsa.stattools import adfuller
from datetime import datetime, timedelta
from itertools import product

class ARIMA_UTILS:
    def make_standard_prediction(self,ticker):

        msft = yf.Ticker(ticker)
        msft_hist = yf.download(ticker,'2021-01-01',datetime.today().strftime('%Y-%m-%d'))
        msft_hist.reset_index(inplace=True)
        training_set = msft_hist["Close"]

        result = adfuller(training_set)
        # If the data is not stationary, apply differencing until it becomes stationary
        d = 0
        while result[0] > result[4]["5%"]:
            df_diff = msft_hist.diff().dropna()
            result = adfuller(training_set)
            d += 10
        
        p = range(0, 2)
        d = [d]
        q = range(0, 2)

        pdq = list(product(p, d, q))

        # Fit ARIMA models with each combination of p, d, and q values and select the best one based on the Akaike Information Criterion (AIC)
        best_aic = np.inf
        best_model = None
        for param in pdq:
            try:
                model = ARIMA(training_set, order=param).fit()
                if model.aic < best_aic:
                    best_aic = model.aic
                    best_model = model
            except:
                continue


        # test_set = msft_hist.iloc[4513:, 1:2].values


        # Feature Scaling
        sc = MinMaxScaler(feature_range = (0, 1))
        training_set_scaled = sc.fit_transform(np.array(training_set).reshape(-1,1))
        days_in_year = 365
        #differenced = difference(training_set, days_in_year)
        # fit model

        model_fit = best_model
        # print summary of fit model

        numdays = 450
        # base = datetime.datetime.strptime(str(msft_hist["Date"][0]),'%y/%d/%m %H:%M:%S')
        base = msft_hist["Date"][0].to_pydatetime()

        date_list = [base + timedelta(days=x) for x in range(numdays)]

        forecast = model_fit.forecast(steps=numdays)

        # invert the differenced forecast to something usable
        history = [x for x in training_set]
        day = 1
        #+ np.random.normal(0, variance_of_set, size = forecast.size)
        variance_of_set = np.array(forecast).var()
        predicted_stock_price = np.array(forecast) 
        predicted_stock_price = np.array(predicted_stock_price).tolist()
        date_list = [datetime.today() + timedelta(days=x) for x in range(len(predicted_stock_price))]
        print(date_list[-1])
        print(msft_hist["Date"].tail(1).item())
        
        print("asdassadsadsadasdsdasdas")
        print(date_list[0])
        print(msft_hist["Date"][0])



        #Visualising the results
        plt.plot(msft_hist["Date"],msft_hist["Close"], color = "red", label = "Real Price")
        plt.plot(date_list,predicted_stock_price, color = "blue", label = "Predicted Price")
        plt.title('Commodity Stock Price Prediction')
        plt.xlabel('Time')
        plt.ylabel('Commodity Stock Price')
        plt.legend()
        plt.show()
        return date_list, predicted_stock_price
if __name__ == "__main__":
    ticker = "GC=F"
    arima_model = ARIMA_UTILS()
    arima_model.make_standard_prediction(ticker)