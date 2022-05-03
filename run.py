#!/usr/bin/env python
# -*- coding: utf-8 -*-

import time
from flask import Flask, render_template, request

from sigma.cli.backends import backends
from sigma.cli.pipelines import pipelines

app = Flask(__name__)

@app.route('/')
def home():
    formats = []
    for backend in backends.keys():
        for name, description in backends[backend].formats.items():
            formats.append({"name": name, "description": description, "backend": backend})
    return render_template('index.html', backends=backends, pipelines=pipelines, formats=formats)

@app.route('/sigma', methods=['POST'])
def convert():
    #rule = request.json['rule']
    #pipeline = request.json['pipeline']
    #backend = request.json['target']
    #format = request.json['format']
    time.sleep(5)
    return '(source="WinEventLog:Microsoft-Windows-Sysmon/Operational" AND EventCode="15" AND  NOT (Imphash="00000000000000000000000000000000")) | table TargetFilename,Image'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8000)
