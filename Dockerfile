FROM node:latest
WORKDIR /DOCKEREGC/slackbot
COPY slackbot/* ./
RUN npm install
RUN npm install @slack/client
ENV DATABASE_URL g1_mariadb
ENV DATABASE_PORT 3306
EXPOSE 52007
CMD ["npm","start"]
