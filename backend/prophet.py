from tabnanny import verbose
import matplotlib
import numpy
import pandas
import tensorflow
from filter_manager import *
# pip install streamlit fbprophet yfinance plotly
from datetime import date

import yfinance as yf
from fbprophet import Prophet
from fbprophet.plot import plot_plotly
from plotly import graph_objs as go
import matplotlib.pyplot as plt
from datetime import timedelta
START = "2015-01-01"
TODAY = date.today().strftime("%Y-%m-%d")

filter = filter_manager()
filter.add_filters("test",START, TODAY)



#st.title('Stock Forecast App')

stocks = ('GOOG', 'AAPL', 'MSFT', 'GME')
selected_stock = "AAPL"

n_years = 1
period = n_years * 365


def load_data(ticker):
    START,TODAY = filter.query("test")
    data = yf.download(ticker, START, TODAY)
    data.reset_index(inplace=True)
    return data


def load_filter_complex(ticker):
    databases = []
    for i in filter.complex_query(ticker):
        START = i[0]
        TODAY = i[1]
        print(type(START))
        print("{},{}".format(START,TODAY))
        data = yf.download(ticker, START, TODAY)
        print("you are here")
        data.reset_index(inplace=True)
        databases.append(data)
    return databases
	
data = load_data(selected_stock)
print("***************************")
filter = filter_manager()
START = "2015-01-01"
TODAY = (date.today()- timedelta(days = 1)).strftime("%Y-%m-%d")
filter.add_filters("test",START, TODAY)
filter.add_complex_filter("AAPL",[("2015-01-01",TODAY)])
# print(filter.get_filters())
# print(type(filter.complex_query("test_2")))
# print(filter.isComplex("test"))


load_filter_complex("AAPL")
#

# Predict forecast with Prophet.
df_train = data[['Date','Close']]
df_train = df_train.rename(columns={"Date": "ds", "Close": "y"})

m = Prophet()
m.fit(df_train,verbose=False)
future = m.make_future_dataframe(periods=period)
forecast = m.predict(future)
#m.plot(forecast)
plt.plot(forecast["yhat"])
plt.title('{} Stock Price Prediction'.format(selected_stock))
plt.xlabel('Time')
plt.ylabel('{} Stock Price'.format(selected_stock))
plt.savefig('STATIC/prediction.png')
