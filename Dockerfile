FROM node:latest
WORKDIR /DOCKEREGC/slackbot
RUN npm install
RUN npm install @slack/client
RUN npm install mysql
COPY slackbot/* ./
ENV DATABASE_URL g1_mariadb
ENV DATABASE_PORT 3306
EXPOSE 52007
CMD ["npm","start"]
