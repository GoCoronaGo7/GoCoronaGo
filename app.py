import webserver

import os
import re
from flask import render_template

from lib.db import Db
from lib.email import EmailManager
from lib import crypto

from dotenv import load_dotenv  # for python-dotenv method
load_dotenv()

class App():
    def __init__(self):
        self.register_otp = {}
        self.temp_data = {}

    def register_account(self, data):
        hash = crypto.hash(data['password'])
        try:
            self.verify_password(hash, data['password'], data['username'])
            app.db.insert(data['username'], hash, data['email'])
        except:
            print('Crypto ERROR!')
            raise

    def send_email(self, email, otp, url):
        html = render_template('email.html', url=url, email=email, otp = otp)
        app.email_manager.send_email(email, 'Verify Your Email', html)

    def verify_password(self, hash, password, username):
        result = crypto.verify(hash, password)
        if result is True or result is False:
            return result
        else:
            db.update(username, password=result)
            return True
    def verify_admin_password(self, hash, password, username):
        result = crypto.verify(hash, password)
        if result is True or result is False:
            return result
        else:
            db.update_admin(username, password=result)
            return True

    def load_config(self):
        mode = os.environ.get('FLASK_ENV')
        import configurations
        """Load config."""
        print('Loading in mode', mode)
        if mode == 'PRODUCTION':
            return configurations.prod
        else:
            return configurations.dev


app = App()
config = app.load_config()

app.ENV = dict()
for i in config.ENV:
    app.ENV[i] = os.environ.get(i)

print(app.ENV)

if app.ENV['NO_DB'] is None:
    db = Db(app.ENV)
    if (db.connected()):
        print('connected!')
        app.db = db


app.email_manager = EmailManager(app.ENV)
app.host = config.HOST
app.crypto = crypto

from webserver import webserver

app.webserver = webserver
app.webserver.config.from_object(config)
app.webserver.config.ENV = app.ENV
app.webserver.secret_key = app.ENV['FLASK_SECRET_KEY'] if app.ENV['FLASK_SECRET_KEY'] else "Test"

webserver.app = app


if __name__ == '__main__':
    app.webserver.run(debug=config.DEBUG, port=app.ENV['PORT'])
