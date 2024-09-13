FROM node:12

WORKDIR /Backend

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=3005


CMD ["npm","run","build"]

