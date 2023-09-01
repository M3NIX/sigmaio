# sigmaio

⚠️ This project will be continued as a community-driven project: [SigConverter.io](https://github.com/magicsword-io/sigconverter.io). More details in this [blog](https://medium.com/magicswordio/introducing-sigconverter-io-the-community-driven-sigma-translation-tool-f7b6822e55b4) post.

---

Inspired by [uncoder.io](https://uncoder.io) I wrote my own implementation using the new [pySigma](https://github.com/SigmaHQ/pySigma) library.
A demo instance is running at https://sigmaio.app

## Getting started

without docker:
```
pip install --user -r requirements.txt
python run.py
```

with docker:
```
docker build -t sigmaio .
docker run -d -p 8000:8000 sigmaio
```

You should be able to reach the application now at http://localhost:8000
