import pandas as pd
import numpy as np
from bs4 import BeautifulSoup as bs
from time import sleep
from datetime import datetime
from splinter import Browser
from selenium.webdriver.common.keys import Keys
import time
import json
from flask import Flask, render_template, jsonify, request, redirect


app = Flask(__name__)

# create route that renders index.html template
@app.route("/")
def home():
    return render_template("index.html")

@app.route("/Harris")
def Harris():
    return render_template("Harris.html")


@app.route("/Memes")
def Memes():
    return render_template("Memes.html")

@app.route("/Time")
def Time():
    return render_template("Time.html")

@app.route("/county_names")
def county_names():
    df = pd.read_csv('Texas COVID-19 Case Count Data by County.csv').dropna()
    names = list(df['County Name'])
    names.pop()

    return jsonify(names)

@app.route("/data/<county>")
def data(county):

    df = pd.read_csv('Texas COVID-19 Case Count Data by County.csv').dropna()

    df = df.set_index('County Name')

    time = df.keys()

    x_axis = list(time)
    x_axis = x_axis[1:]
    x_axis = list(map(lambda x : x.replace('Cases', '').lstrip(), x_axis))
    x_axis = list(map(lambda x : x.replace('-', '/'), x_axis))

    
    df = df.loc[[county]]

    y_axis = df.values.tolist()
    y_axis = y_axis[0][1:]

    return jsonify(dict(zip(x_axis,y_axis)))    


if __name__ == "__main__":
    app.run(debug=True)
