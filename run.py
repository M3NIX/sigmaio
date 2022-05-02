#!/usr/bin/env python
# -*- coding: utf-8 -*-

from flask import Flask, render_template

from sigma.cli.backends import backends
from sigma.cli.pipelines import pipelines

app = Flask(__name__)

@app.route('/')
def home():
   return render_template('index.html', backends=backends, pipelines=pipelines)
if __name__ == '__main__':
   app.run()
