FROM node:alpine as development

WORKDIR /usr/src/app

COPY package*.json ./
COPY .husky ./.husky

RUN echo "${SERVICE_NAME}"

RUN npm install

COPY . .

COPY wait-for-it.sh /wait-for-it.sh
RUN chmod +x /wait-for-it.sh


RUN apk add --no-cache bash

RUN npm run build ${SERVICE_NAME}

FROM node:alpine as production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install --only=production

COPY . .

COPY --from=development /usr/src/app/dist ./dist

CMD ["node", "dist/apps/${SERVICE_NAME}/main"]