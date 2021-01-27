FROM node:14

WORKDIR /app

COPY package*.json ./

RUN npm install --only=prod

COPY . .

RUN npm install pm2 -g

EXPOSE 3000

CMD ["npm", "start"]