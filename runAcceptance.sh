#!/bin/sh
echo "Killing all docker process"
docker kill $(docker ps -a -q)
echo "pulling tictactoe"
docker pull arnif/tictactoe
echo "Running TicTacToe"
docker run -p 80:8080 -d -e "NODE_ENV=test" arnif/tictactoe
