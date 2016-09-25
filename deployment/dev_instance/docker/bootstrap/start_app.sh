#!/usr/bin/env /bin/bash
source `which virtualenvwrapper.sh`
workon project
cd /code/
pip install -r requirements.txt
python manage.py migrate --noinput
uwsgi ./dev_uwsgi.ini
cd /code/project/static
npm install
node_modules/gulp/bin/gulp.js dev &
