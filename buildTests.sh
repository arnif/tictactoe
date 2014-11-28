#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo "Installing grunt"
npm install grunt

echo "Npm install"
npm install

echo "Bower install"
bower install


echo "Running grunt"
grunt


echo "Done"
