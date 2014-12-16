#!/bin/sh
set -e

echo "Killing all docker process"
docker kill $(docker ps -a -q)
echo "pulling tictactoe"
docker pull arnif/tictactoe

# mongoose-migrate ekki attatchment
echo "Running migrations"
docker run -d "NODE_ENV=production" arnif/tictactoe migrate
echo "Running TicTacToe"
docker run -p 80:8080 -d -e "NODE_ENV=production" arnif/tictactoe
