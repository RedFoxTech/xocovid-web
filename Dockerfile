FROM node:10

COPY . /app

WORKDIR /app

EXPOSE 80

CMD ['npm', 'run', 'start' ]
 
