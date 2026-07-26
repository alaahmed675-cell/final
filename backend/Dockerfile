FROM node:22-alpine

WORKDIR /app

RUN apk update && apk upgrade

COPY package*.json ./

RUN npm ci --omit=dev

COPY server.js ./

USER node

EXPOSE 4000

CMD ["npm", "start"]