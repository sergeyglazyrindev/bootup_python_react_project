#!/bin/bash

cd /vagrant/docker
sudo ln -s /usr/local/bin/gcc /usr/bin/gcc
wget https://bootstrap.pypa.io/get-pip.py
sudo python get-pip.py
sudo pip install ansible
sudo pip install docker-compose

docker-compose up -d

ansible-playbook -u root -i frontend, -c docker ansible/playbooks/bootstrap.yml
ansible-playbook -u root -i frontend, -c docker ansible/playbooks/setup_user_app.yml

