FROM node:12

WORKDIR /app

COPY package.json /app
COPY express /app/src
COPY dao /app/dao
COPY services /app/services
COPY models /app/models

ENV SECRET_KEY sample
ENV NODE_ENV 3

RUN npm i

CMD ["node", "src/server.js"]

EXPOSE 3000
EXPOSE 33069
