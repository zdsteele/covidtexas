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
    df = pd.read_excel('Texas COVID-19 Case Count Data by County.xlsx',  sep='\n', header=1).dropna()
    names = list(df['County Name'])
    names.pop()

    return jsonify(names)

@app.route("/data/<county>")
def data(county):

    df = pd.read_excel('Texas COVID-19 Case Count Data by County.xlsx',  sep='\n', header=1).dropna()

    cols = []
    raw_cols = list(df.columns)

    for col in raw_cols:
    
        try:
        
            new = col.replace('\n', '')
            cols.append(new)
        
        except:
        
            cols.append(col)

    res = dict(zip(raw_cols, cols))

    df = df.rename(columns=res)

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

# @app.route("/Scrape")
# def Scrape():

#     url = 'https://www.reddit.com/r/CoronavirusMemes/'

#     # Path to chromedriver.exe
#     executable_path = {'executable_path':'chromedriver/chromedriver.exe'}

#     # Open the Splinter Browswer
#     browser = Browser('chrome', **executable_path, headless=True)

#     browser.visit(url)
#     time.sleep(10)

#     html = browser.html
#     soup = bs(html, 'html.parser')

#     memes = soup.find_all('div', class_='_3Oa0THmZ3f5iZXAQ0hBJ0k')

#     images = []

#     for i in memes:
    
#         image = i.find('img')['src']
#         images.append(image)

#     meme_df = pd.DataFrame({"Memes":images})
#     meme_df.to_csv('static/csv/memes.csv', index=False, header=True)

#     browser.quit()

#     return jsonify(meme_df.to_dict('records'))
    



if __name__ == "__main__":
    app.run(debug=True)
