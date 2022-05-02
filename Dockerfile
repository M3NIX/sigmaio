FROM python:3.10.4-slim-buster

# set workdir
WORKDIR /code

# copy the flask app to the working directory
COPY ./ .

# install the dependencies
RUN pip install -r requirements.txt

# run the application
CMD [ "python", "./run.py" ]
