#!/bin/bash

echo Cleaning...
rm -rf ./dist

echo "Installing grunt"
npm install grunt

echo "Installing bower"
npm install bower -g

echo "Npm install"
npm install

echo "Bower install"
bower install


echo "Running grunt"
grunt


echo "Done"
