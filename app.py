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

@app.route("/Scrape")
def Scrape():

    url = 'https://www.reddit.com/r/CoronavirusMemes/'

    # Path to chromedriver.exe
    executable_path = {'executable_path':'chromedriver/chromedriver.exe'}

    # Open the Splinter Browswer
    browser = Browser('chrome', **executable_path, headless=True)

    browser.visit(url)
    time.sleep(10)

    html = browser.html
    soup = bs(html, 'html.parser')

    memes = soup.find_all('div', class_='_3Oa0THmZ3f5iZXAQ0hBJ0k')

    images = []

    for i in memes:
    
        image = i.find('img')['src']
        images.append(image)

    meme_df = pd.DataFrame({"Memes":images})
    meme_df.to_csv('static/csv/memes.csv', index=False, header=True)

    browser.quit()

    return jsonify(meme_df.to_dict('records'))
    



if __name__ == "__main__":
    app.run(debug=True)
