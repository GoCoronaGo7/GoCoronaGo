import webserver

import os
import re
from flask import render_template

from lib.mysql import Db
from lib.email import EmailManager
from lib import crypto

from dotenv import load_dotenv  # for python-dotenv method
load_dotenv()

class App():
    def __init__(self):
        self.register_otp = {}
        self.temp_data = {}

def register_account(data):
    hash = crypto.hash(data['password'])
    try:
        verify_password(hash, data['password'], data['username'])
        print(hash)
        app.db.insert(data['username'], hash, data['email'])
    except:
        print('Crypto ERROR!')
        raise

def send_email(email, otp, url):
    html = render_template('email.html', url=url, email=email, otp = otp)
    app.email_manager.send_email(email, 'Verify Your Email', html)

def verify_password(hash, password, username):
    result = crypto.verify(hash,password)
    if result is True or result is False:
        return result
    else:
        db.update(username, password=result)
        return True

def load_config():
    mode = os.environ.get('FLASK_ENV')
    import configurations
    """Load config."""
    print('Loading in mode', mode)
    if mode == 'PRODUCTION':
        return configurations.prod
    else:
        return configurations.dev


config = load_config()
app = App()
app.ENV = dict()
for i in config.ENV:
    app.ENV[i] = os.environ.get(i)


# db = Db(app.ENV)
# if (db.connected()):
#     print('connected!')

app.email_manager = EmailManager(app.ENV)
app.host = config.HOST
# app.db = db

from webserver import webserver

app.webserver = webserver
app.webserver.config.from_object(config)
app.webserver.config.ENV = app.ENV
app.webserver.secret_key = app.ENV['FLASK_SECRET_KEY'] if app.ENV['FLASK_SECRET_KEY'] else "Test"

webserver.app = app

print(app.ENV)

if __name__ == '__main__':
    print(config.DEBUG)
    app.webserver.run(debug=config.DEBUG, port=app.ENV['PORT'])
