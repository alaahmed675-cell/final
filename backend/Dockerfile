FROM node:20-alpine

WORKDIR /app

# Update Alpine packages to patched security versions
RUN apk update && apk upgrade

COPY package*.json ./

RUN npm ci --omit=dev

COPY . .

EXPOSE 4000

CMD ["npm", "start"]