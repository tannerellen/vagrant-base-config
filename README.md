# vagrant-base-config
Starting point for working with vagrant boxes. Inlcudes nodejs, nginx, php5, git, and CLI for CenturyLink cloud.


Core Dev Software
=======================

**Open terminal:**
Switch default theme and new window theme to “Homebrew” in preferences (so you can be cool)

Download and install the following applications
------------

**git:**
http://git-scm.com/download/mac

Create a global git ignore file - run commands in terminal:
git config --global core.excludesfile ~/.gitignore_global

touch ~/.gitignore_global
nano ~/.gitignore_global

Then paste the following:
```
## Begin ignore list ##
# OS generated files #
######################
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Vagrant generated files #
######################
.vagrant
## End ignore list ##
```

press ctl x to exit, then “y” to save and enter to confirm.

Add user email and name to git config file. In terminal:
nano ~/.gitconfig

then fill in name and email. when done ctrl x to exit, then “y” to save and enter to confirm.

Enable ssh connections for kiln:
Run the following commands in the terminal:
ssh-keygen -t rsa
at the prompt do not enter anything for file and password, just press enter
```
cat ~/.ssh/id_rsa.pub
```

copy the output to the clipboard starting with ssh-rsa

Now navigate to kiln, click your profile and add the ssh key.
Read more here: http://help.fogcreek.com/8153/using-kiln-with-ssh

**nodeJS(stable):**
https://nodejs.org/en/

Run these two commands in the terminal to fix npm permissions:
```
sudo chown -R `whoami` ~/.npm
sudo chown -R `whoami` /usr/local/lib/node_modules
```

**VirtualBox:**
https://www.virtualbox.org/wiki/Downloads

**Vagrant:**
https://www.vagrantup.com/downloads.html

**Vagrant plugins:**
Run these commands in the terminal:
```
vagrant plugin install vagrant-ghost
vagrant plugin install vagrant-vbguest
vagrant plugin install vagrant-fsnotify
```

**SourceTree:**
https://www.sourcetreeapp.com

**Squidman (proxy server):**
http://squidman.net/squidman/

**Slack:**
http://squidman.net/squidman/

**Quickcast:**
http://quickcast.io

**Xcode:**
https://itunes.apple.com/us/app/xcode/id497799835?mt=12

Preferred Software
=======================

**Atom:**
https://atom.io
Packages:
git-plus,
jshint,
prime-file-icons,
sync-settings

Themes:
Ui: One Dark
syntax: afterglow-monokai-syntax

**Google Chrome:**
https://www.google.com/chrome/browser/desktop/

**Firefox Developer Edition:**
https://www.mozilla.org/en-US/firefox/developer/

**Cyberduck:**
https://cyberduck.io

**Microsoft Remote Desktop:**
https://itunes.apple.com/us/app/microsoft-remote-desktop/id715768417?mt=12

**Dropbox:**
https://www.dropbox.com/downloading?src=index

Software I Like
=======================

**Pixelmator:**
http://www.pixelmator.com/mac/

**Evernote:**
https://evernote.com

**VLC:**
http://www.videolan.org/vlc/

**Spotify:**
https://www.spotify.com

**Limechat:**
http://limechat.net

**TeamViewer:**
http://www.teamviewer.com

**The Unarchiver**
http://unarchiver.c3.cx/unarchiver

Hobby Apps
=======================

**Audacity:**
http://www.audacityteam.org/download/mac

**Transmission:**
http://www.transmissionbt.com

**SDFormatter:**
https://www.sdcard.org/downloads/formatter_4/

**RPi-sd card builder:**
https://alltheware.wordpress.com/2012/12/11/easiest-way-sd-card-setup/

**ECM:**
https://itunes.apple.com/us/app/ecm/id490370398?mt=12

**Wifi Scanner:**
https://itunes.apple.com/us/app/wifi-scanner/id411680127?mt=12
