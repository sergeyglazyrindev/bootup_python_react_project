docker-compose up -d

then execute
ansible-playbook -u root -i frontend, -c docker ansible/playbooks/bootstrap.yml
ansible-playbook -u root -i frontend, -c docker ansible/playbooks/setup_user_app.yml

now restart docker container: docker-compose stop && docker-compose up -d
ansible-playbook -u root -i frontend, -c docker ansible/playbooks/on_started_server.yml

add to your hosts file on host something like that:
172.17.0.12 rithome.com
172.17.0.12 test_res_1463253453.tryrit.com tryrit.com
