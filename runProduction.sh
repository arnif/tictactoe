#!/bin/sh
docker kill $(docker ps -a -q)
docker pull arnif/tictactoe
docker run -p 80:8080 -d -e "NODE_ENV=production" arnif/tictactoe
