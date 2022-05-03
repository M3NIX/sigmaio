# sigcoder

Inspired by [uncoder.io](https://uncoder.io) I wrote my own implementation using the new [pySigma](https://github.com/SigmaHQ/pySigma) library.
A demo instance is running at https://sigcoder.herokuapp.com/

## Getting started

without docker:
```
pip install --user -r requirements.txt
python run.py
```

with docker:
```
docker build -t sigcoder .
docker run -d -p 8000:8000 sigcoder
```

You should be able to reach the application now at http://localhost:8000
