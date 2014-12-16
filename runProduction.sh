#!/bin/sh
set -e

echo "Killing all docker process"
docker kill $(docker ps -a -q)
echo "pulling tictactoe"
docker pull arnif/tictactoe

echo "Running migrations"
docker run -e "NODE_ENV=production" arnif/tictactoe ./node_modules/.bin/mongoose-migrate

echo "Running TicTacToe"
docker run -p 80:8080 -d -e "NODE_ENV=production" arnif/tictactoe
