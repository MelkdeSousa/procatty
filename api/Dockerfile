FROM node:lts-alpine

USER node

WORKDIR /app

COPY package.json yarn.* tsconfig.json ./
COPY . .

RUN yarn install

CMD ["yarn", "dev"]
