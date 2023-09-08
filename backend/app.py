import embeddings
import risk_calc
from flask import Flask, send_from_directory, request
import matplotlib.pyplot as plt
import numpy as np
import os

app = Flask(__name__)


@app.route("/acceptDates", methods=['POST'])
def get_stock_dict():
    return request.form.get('stock_weights')


@app.route('/')
def index():
    return "<h1 > Home Page </h1>"


# get dict of stocks and their weights from the front end
stock_dict = get_stock_dict()

portfolio = risk_calc.main(stock_dict)
cvar = sum(_ for _ in portfolio.get("CVaR")) / 4
feedback = embeddings.main(tickers=stock_dict, cVaR=cvar)

if __name__ == "__main__":
    app.run(host='0.0.0.0', port=3003, debug=True)
