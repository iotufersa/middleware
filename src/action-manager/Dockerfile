FROM node:current-slim

COPY package.json .
RUN npm install

COPY . .

CMD ["npm","run","docker"]