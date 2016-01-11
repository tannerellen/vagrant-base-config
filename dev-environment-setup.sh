#! /usr/bin/env bash

#Make sure that NodeJs is installed before running this
#sudo cp -R "/Volumes/Chicken of the VNC/Chicken of the VNC.app" /Applications
echo "Installing dev environment"

echo "Installing VirtualBox"
#Install virtualbox
curl -O 'http://download.virtualbox.org/virtualbox/5.0.12/VirtualBox-5.0.12-104815-OSX.dmg'
hdiutil attach ~/VirtualBox-5.0.12-104815-OSX.dmg
sudo installer -pkg /Volumes/VirtualBox/VirtualBox.pkg -target /
hdiutil detach ~/VirtualBox-5.0.12-104815-OSX.dmg
rm ~/VirtualBox-5.0.12-104815-OSX.dmg

echo "Installing Vagrant"
# Install vagrant
curl -O 'https://releases.hashicorp.com/vagrant/1.8.1/vagrant_1.8.1.dmg'
hdiutil attach ~/vagrant_1.8.1.dmg
sudo installer -pkg /Volumes/Vagrant/Vagrant.pkg -target /
hdiutil detach ~/vagrant_1.8.1.dmg
rm ~/vagrant_1.8.1.dmg
# Install vagrant ghost plugin so we can auto set our hosts file - https://github.com/10up/vagrant-ghost
vagrant plugin install vagrant-ghost
# Install vagrant plugin to automiatically keep the guest addtions up to date for virtualbox
vagrant plugin install vagrant-vbguest
# Install vagrant plugin to automatically send file change notifications to guest vm - https://github.com/adrienkohlbecker/vagrant-fsnotify
vagrant plugin install vagrant-fsnotify

echo "Installing nodejs"
#Download and install node js package - This file could be old by the time this is run so double check version
curl -O 'https://nodejs.org/dist/v5.3.0/node-v5.3.0.pkg'
sudo installer -pkg ~/node-v5.3.0.pkg -target /
rm ~/node-v5.3.0.pkg
# Fix permissions issues with package install of nodejs / npm
sudo chown -R `whoami` ~/.npm
sudo chown -R `whoami` /usr/local/lib/node_modules

#Install grunt
npm install -g grunt-cli

#Install browser sync
npm install -g browser-sync

echo "Dev environment ready!"
