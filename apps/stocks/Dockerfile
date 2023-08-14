FROM node:alpine as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY .husky ./.husky

RUN echo "${SERVICE_NAME}"

RUN npm install

COPY . .

COPY wait-for-it.sh /wait-for-it.sh
COPY start.sh /start.sh
RUN chmod +x /wait-for-it.sh
RUN chmod +x /start.sh

RUN apk add --no-cache bash

RUN npm run build ${SERVICE_NAME}

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

RUN npm install --save-dev sequelize-cli
WORKDIR /usr/src/app/apps/${SERVICE_NAME}
RUN npx sequelize-cli db:migrate
RUN npx sequelize-cli db:seed:all
WORKDIR /usr/src/app
RUN npm remove sequelize-cli

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/${SERVICE_NAME}/main"]