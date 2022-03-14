import tensorflow
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import MinMaxScaler
import yfinance as yf

#This is a basis for a model, ask Irfan to add his stuff with the arima model

#Note, this is code borrowed from a dataquest blog post, we can modify this as necessary
msft = yf.Ticker("MSFT")
msft_hist = msft.history(period="max")
# Ensure we know the actual closing price
data = msft_hist[["Close"]]
data = data.rename(columns = {'Close':'Actual_Close'})

# Setup our target.  This identifies if the price went up or down
data["Target"] = msft_hist.rolling(2).apply(lambda x: x.iloc[1] > x.iloc[0])["Close"]
msft_prev = msft_hist.copy()
msft_prev = msft_prev.shift(1)
predictors = ["Close", "Volume", "Open", "High", "Low"]
data = data.join(msft_prev[predictors]).iloc[1:]