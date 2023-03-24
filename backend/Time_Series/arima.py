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
from datetime import datetime, timedelta

class ARIMA_UTILS:
    def make_standard_prediction(self,ticker):
        # create a differenced series
        def difference(dataset, interval=1):
            diff = list()
            for i in range(interval, len(dataset)):
                value = dataset[i] - dataset[i - interval]
                diff.append(value)
            return np.array(diff)

        # invert differenced value
        def inverse_difference(history, yhat, interval=1):
            return yhat + history[-interval]
        msft = yf.Ticker(ticker)
        msft_hist = yf.download(ticker,'2015-01-01',datetime.today().strftime('%Y-%m-%d'))
        msft_hist.reset_index(inplace=True)
        training_set = msft_hist["Close"]


        # test_set = msft_hist.iloc[4513:, 1:2].values


        # Feature Scaling
        sc = MinMaxScaler(feature_range = (0, 1))
        training_set_scaled = sc.fit_transform(np.array(training_set).reshape(-1,1))
        days_in_year = 365
        differenced = difference(training_set, days_in_year)
        # fit model
        model = ARIMA(differenced, order=(4,0,1))
        model_fit = model.fit()
        # print summary of fit model

        numdays = 1500
        # base = datetime.datetime.strptime(str(msft_hist["Date"][0]),'%y/%d/%m %H:%M:%S')
        base = msft_hist["Date"][0].to_pydatetime()
        print(base)

        date_list = [base + timedelta(days=x) for x in range(numdays)]
        print(date_list[-1])

        forecast = model_fit.forecast(steps=len(date_list))

        # invert the differenced forecast to something usable
        history = [x for x in training_set]
        day = 1
        for yhat in forecast:
            inverted = inverse_difference(history, yhat, days_in_year)
            history.append(inverted)
            day += 1
        predicted_stock_price = np.array(history)
        predicted_stock_price = np.array(predicted_stock_price).tolist()
        date_list = [base + timedelta(days=x) for x in range(len(predicted_stock_price))]
        print(date_list[-1])



        # #Visualising the results
        # plt.plot(msft_hist["Date"],msft_hist["Close"], color = "red", label = "Real Price")
        # plt.plot(date_list,predicted_stock_price, color = "blue", label = "Predicted Price")
        # plt.title('Commodity Stock Price Prediction')
        # plt.xlabel('Time')
        # plt.ylabel('Commodity Stock Price')
        # plt.legend()
        # plt.show()
        return date_list, predicted_stock_price
if __name__ == "__main__":
    ticker = "GC=F"
    arima_model = ARIMA_UTILS()
    arima_model.make_standard_prediction(ticker)