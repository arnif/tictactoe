#!/bin/bash

set -e
echo Cleaning...
rm -rf ./dist

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

echo "Done running grunt"

cp ./Dockerfile ./dist/

cd dist

echo "Npm install production"
npm install --production

echo "Adding mongoose migrate"
unzip -o -q ../node_modules_patch/mongoose-migrate.zip -d node_modules
mkdir node_modules/.bin
cd node_modules/.bin
ln -s ../mongoose-migrate/bin/migrate mongoose-migrate
cd ../..

echo "Building docker image"
docker build -t arnif/tictactoe .

echo "Done"
