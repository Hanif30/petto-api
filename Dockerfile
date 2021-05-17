FROM node:16-alpine3.11

WORKDIR /usr/src/app

RUN npm install

COPY . .

EXPOSE 5000

CMD ["npm", "run", "dev"]