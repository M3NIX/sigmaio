#!/usr/bin/env python
# -*- coding: utf-8 -*-

import os
import base64
from flask import Flask, render_template, request

from sigma.conversion.base import Backend
from sigma.cli.backends import backends
from sigma.cli.pipelines import pipelines
from sigma.collection import SigmaCollection
from sigma.exceptions import SigmaError

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

    # get params from request
    rule = str(base64.b64decode(request.json['rule']), "utf-8")
    pipeline = []
    if request.json['pipeline']:
        pipeline.append(request.json['pipeline'])
    target = request.json['target']
    format = request.json['format']

    backend_class = backends[target].cls
    processing_pipeline = pipelines.resolve(tuple(pipeline))
    backend : Backend = backend_class(processing_pipeline=processing_pipeline)

    try:
        sigma_rule = SigmaCollection.from_yaml(rule)
        result = backend.convert(sigma_rule, format)
        if isinstance(result, list):
            result = result[0]
    except SigmaError as e:
        return "Error: " + str(e)

    return result

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=os.environ.get('PORT', 8000))
