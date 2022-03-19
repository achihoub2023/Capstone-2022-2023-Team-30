import matplotlib
import numpy
import pandas
import tensorflow

# pip install streamlit fbprophet yfinance plotly
from datetime import date

import yfinance as yf
from fbprophet import Prophet
from fbprophet.plot import plot_plotly
from plotly import graph_objs as go
import matplotlib.pyplot as plt

START = "2015-01-01"
TODAY = date.today().strftime("%Y-%m-%d")

#st.title('Stock Forecast App')

stocks = ('GOOG', 'AAPL', 'MSFT', 'GME')
selected_stock = "GOOG"

n_years = 1
period = n_years * 365


def load_data(ticker):
    data = yf.download(ticker, START, TODAY)
    data.reset_index(inplace=True)
    return data

	
#data_load_state = st.text('Loading data...')
data = load_data(selected_stock)
#data_load_state.text('Loading data... done!')

#

# # Plot raw data
# def plot_raw_data():
# 	fig = go.Figure()
# 	fig.add_trace(go.Scatter(x=data['Date'], y=data['Open'], name="stock_open"))
# 	fig.add_trace(go.Scatter(x=data['Date'], y=data['Close'], name="stock_close"))
# 	fig.layout.update(title_text='Time Series data with Rangeslider', xaxis_rangeslider_visible=True)
# 	st.plotly_chart(fig)
	
# plot_raw_data()

# Predict forecast with Prophet.
df_train = data[['Date','Close']]
df_train = df_train.rename(columns={"Date": "ds", "Close": "y"})

m = Prophet()
m.fit(df_train)
future = m.make_future_dataframe(periods=period)
forecast = m.predict(future)
#m.plot(forecast)
plt.plot(forecast["yhat"])
plt.savefig('books_read.png')
