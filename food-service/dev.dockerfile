# For developing stage
FROM node:latest

RUN mkdir /usr/app
WORKDIR /usr/app

#COPY package.json /usr/app
#RUN npm install

#COPY . /usr/app

#EXPOSE 3002

CMD ["npm", "start"]
