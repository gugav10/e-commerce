#!/usr/bin/env bash

ORIGINAL_DIR=$PWD

# set the service
SERVICE=$1

# set the environment
ENV=$2

# set the path to your sequelizerc
CONFIG_DIR=./apps/$SERVICE

# # run migrations
cd $CONFIG_DIR
npx sequelize-cli db:migrate --env $ENV
npx sequelize-cli db:seed:all --env $ENV
cd $ORIGINAL_DIR

# run service in development mode
npm run start:dev $SERVICE
