#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo Building app
npm install grunt
grunt

cp ./Dockerfile ./dist/

cd dist
npm install --production

echo Building docker image
docker build -t arnif/tictactoe .

echo "Done"
