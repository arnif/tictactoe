#!/bin/bash

echo Cleaning...
rm -rf ./dist

ln -s /usr/bin/nodejs /usr/bin/node

echo "Installing grunt"
npm install grunt

echo "Installing bower"
npm install bower

echo "Npm install"
npm install

echo "Bower install"
bower install


echo "Running grunt"
grunt

cp ./Dockerfile ./dist/

cd dist

echo "Npm install production"
npm install --production

echo "Building docker image"
docker build -t arnif/tictactoe .

echo "Pushing docker image"
docker push arnif/tictactoe

echo "Done"
