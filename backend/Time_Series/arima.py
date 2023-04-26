import requests
import numpy as np
import pandas as pd
from datetime import datetime
import random
# For visualizations
import plotly.graph_objects as go
import matplotlib.pyplot as plt
# For time series modeling
import statsmodels.api as sm
from statsmodels.tsa.stattools import adfuller
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
# from statsmodels.tsa.arima_model import ARMA
import yfinance as yf

class ARIMA_UTILS:
    def make_standard_prediction(self,ticker):
        dataframe = yf.download(ticker,'2004-01-01','2023-04-19')
        print(len(dataframe))
        dataframe[dataframe.isna().any(axis=1)]
        def calc_return(dataframe, lag = 1):
            """
            Adds a column of the previous close to the dataframe. Lag is a user-input parameter.
            """
            prevClose = [x for x in dataframe['Close'][:-lag]]
            prevClose = [np.nan for i in range(lag)] + prevClose
            dataframe[f'{lag}-day prevClose'] = prevClose
            dataframe['return'] = np.log(dataframe[f'{lag}-day prevClose']).diff()
            
            return dataframe

        calc_return(dataframe, lag=1)
        
        def mean_std(dataframe, length=20):
            """
            Adds 2 columns to our dataframe: A rolling mean and standard deviations of user-defined lengths
            """
            dataframe[f'sma{length}'] = dataframe['return'].rolling(length).mean()
            dataframe[f'std{length}'] = dataframe['return'].rolling(length).std()
            # Remove leading NaNs
            dataframe.dropna(inplace=True)
    
        mean_std(dataframe)

        
        ar1 = sm.tsa.arima.ARIMA(endog = dataframe['return'].values, order = (6,0,6)).fit()
        # ar1.summary()

        # Generate predictions
        preds = ar1.fittedvalues

        # Add predictions to our dataframe
        dataframe['predictions'] = dataframe[dataframe.columns[1]] * (1 + preds)
        #from information import client_id
        
        steps = 63

        forecast = ar1.forecast(steps=steps)
        prevForecast = dataframe['Close'][-1] * (1 + forecast[0])
        forecast_array = [prevForecast]
        for i in range(steps-1):
            currForecast = prevForecast * (1 + forecast[i])
            prevForecast = currForecast
            forecast_array.append(currForecast)
            
        noise = np.random.normal(0, 5, 63)

        kang = forecast_array + noise - 0

        kang[0] = dataframe['Close'][len(dataframe)-1]

        fc = pd.Series(kang, index = pd.date_range(pd.DataFrame(dataframe.iloc[len(dataframe)-1]).columns[0], periods=63).tolist())
 

        date_list = pd.date_range(pd.DataFrame(dataframe.iloc[len(dataframe)-1]).columns[0], periods=63).tolist()
        predicted_stock_price = kang.tolist()

        return date_list, predicted_stock_price
    
class Recession_UTILS:
    def make_standard_prediction(self,ticker):
        dataframe = yf.download(ticker,'2007-06-21','2009-12-25')
        dataframe[dataframe.isna().any(axis=1)]
        def calc_return(dataframe, lag = 1):
            """
            Adds a column of the previous close to the dataframe. Lag is a user-input parameter.
            """
            prevClose = [x for x in dataframe['Close'][:-lag]]
            prevClose = [np.nan for i in range(lag)] + prevClose
            dataframe[f'{lag}-day prevClose'] = prevClose
            dataframe['return'] = np.log(dataframe[f'{lag}-day prevClose']).diff()
            
            return dataframe

        calc_return(dataframe, lag=1)
        
        def mean_std(dataframe, length=20):
            """
            Adds 2 columns to our dataframe: A rolling mean and standard deviations of user-defined lengths
            """
            dataframe[f'sma{length}'] = dataframe['return'].rolling(length).mean()
            dataframe[f'std{length}'] = dataframe['return'].rolling(length).std()
            # Remove leading NaNs
            dataframe.dropna(inplace=True)
    
        mean_std(dataframe)

        dftest = sm.tsa.adfuller(dataframe['return'], autolag='AIC')
        dfoutput = pd.Series(dftest[0:4], index=['Test Statistic', 'p-value', '#Lags Used', 'Number of Observation Used'])
        for key, value in dftest[4].items():
            dfoutput['Critical Value ({0})'.format(key)] = value
        
        
        ar1 = sm.tsa.arima.ARIMA(endog = dataframe['return'].values, order = (6,0,6)).fit()
        # ar1.summary()

        # Generate predictions

        
        at12 = sm.tsa.ARIMA(endog = dataframe['return'].values, order = (6,0,6))
        at12.initialize_known(initial_state = ar1.predicted_state[:,-1], initial_state_cov=np.zeros((7,7)))
        st = at12.fit()
        
        preds = st.fittedvalues

        # Add predictions to our dataframe
        dataframe['predictions'] = dataframe[dataframe.columns[1]] * (1 + preds)
        #from information import client_id
        
        steps = 63


        forecast = ar1.forecast(steps=steps)
        prevForecast = dataframe['Close'][-1] * (1 + forecast[0])
        forecast_array = [prevForecast]
        for i in range(steps-1):
            currForecast = prevForecast * (1 + forecast[i])
            prevForecast = currForecast
            forecast_array.append(currForecast)
            
        noise = np.random.normal(-10, 4, 63)

        kang = forecast_array + noise - 0

        kang[0] = dataframe['Close'][len(dataframe)-1]

        fc = pd.Series(kang, index = pd.date_range(pd.DataFrame(dataframe.iloc[len(dataframe)-1]).columns[0], periods=63).tolist())
 
        date_list = pd.date_range(pd.DataFrame(dataframe.iloc[len(dataframe)-1]).columns[0], periods=63).tolist()
        predicted_stock_price = kang.tolist()

        return date_list, predicted_stock_price
if __name__ == "__main__":
    ticker = "GC=F"
    arima_model = ARIMA_UTILS()
    arima_model.make_standard_prediction(ticker)