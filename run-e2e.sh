#!/bin/bash

set -e
export PATH=$PATH:/usr/local/bin
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

echo "Updateting web driver"
node node_modules/grunt-protractor-runner/node_modules/protractor/bin/webdriver-manager update

echo "Running e2e tests"
grunt test:e2e

echo "Done"
