FROM python:3.11.2-slim-buster

# set workdir
WORKDIR /code

# copy the flask app to the working directory
COPY ./ .

# install the dependencies
RUN pip install -r requirements.txt

RUN apt update && apt install git -y

# install all compatible sigma plugins
RUN for plugin in $(sigma plugin list -c | tail -n +4 | head -n -1 | awk '{split($0,a,"|"); print a[2]}' | sed '/^[[:space:]]*$/d' | tr -d ' '); do sigma plugin install $plugin; done

# run the application
CMD [ "python", "./run.py" ]
