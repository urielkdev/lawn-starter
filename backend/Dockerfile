FROM node:18

WORKDIR /app

COPY . .

RUN yarn install

RUN yarn build

CMD [ "npm", "run", "start:prod" ]