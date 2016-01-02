#!/usr/bin/env bash

echo "Updating package repo..."
apt-get update

echo "Installing web server software..."
# Install nginx
apt-get install -qy nginx php5 php5-fpm php5-gd php5-cgi php5-cli php5-curl

# Install PHP and dependencies
apt-get install -qy php5 php5-fpm php5-gd php5-cgi php5-cli php5-curl

# Install dependencies and other dev libraries
apt-get install -qy build-essential curl git libssl-dev ruby1.9.3

# Enable nodesource repo so we can get newer versions of nodejs
curl -sL https://deb.nodesource.com/setup | sudo bash -
# Install nodejs
apt-get install -qy nodejs

# Update npm
npm -g install npm@latest

echo "Installing dev tools..."
# Install nodemon - https://github.com/remy/nodemon
npm install -g nodemon

# Install grunt command line tool - http://gruntjs.com
npm install -g grunt-cli

# Install Bower package manager - http://bower.io/#install-bower
npm install -g bower

# Install mocha unit test framework - ttps://mochajs.org
npm install -g mocha

# Install chai assertian library for testing in mocha - http://chaijs.com
npm install -g chai

echo "Installing CloudFoundry CLI"
# Install CloudFoundary CLI
curl -L "https://cli.run.pivotal.io/stable?release=linux64-binary&source=github" | tar -zx
sudo mv cf /usr/local/bin

echo "Moving nginx config files into place…"
rm /etc/nginx/sites-enabled/default
cp /vagrant/vagrant/nginx/default.conf /etc/nginx/sites-enabled/
cp /vagrant/vagrant/nginx/dummy.* /etc/nginx/

echo "Moving php config files into place…"
mv /etc/php5/fpm/php.ini /etc/php5/fpm/php.ini.default
cp /vagrant/vagrant/php/php.ini /etc/php5/fpm/php.ini

echo "Starting services…"
service nginx restart
service php5-fpm restart
