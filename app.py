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


if __name__ == "__main__":
    app.run(debug=True)
