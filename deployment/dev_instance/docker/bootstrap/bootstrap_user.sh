#!/usr/bin/env /bin/bash
source `which virtualenvwrapper.sh`
mkvirtualenv --python=python3 project
workon project
cd /code/
pip install -r requirements.txt
python manage.py migrate --noinput
cd /code/project/static
npm install
