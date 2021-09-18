import os
from lib.db import Db
from lib import crypto

def load_config():
    from dotenv import load_dotenv  # for python-dotenv method
    load_dotenv()
    mode = os.environ.get('FLASK_ENV')
    import configurations
    """Load config."""
    print('Loading in mode', mode)
    if mode == 'PRODUCTION':
        return configurations.prod
    else:
        return configurations.dev

CNF = load_config()
ENV = dict()
for i in CNF.ENV:
    ENV[i] = os.environ.get(i)

print('Loading with ENV: ', ENV)
if ENV['NO_DB'] is not None:
    print('ERROR CAN\'T ADD ADMINS WITHOUT DB!')
    exit(1)

db = Db(ENV)
if (db.connected()):
    print('connected!')
else: 
    print('Failed to connect to DB!')
    exit(1)

ans = 'y'
while ans == 'y':
    name = input('Enter Admin name: ')
    username = input('Enter Admin Username: ')
    password = crypto.hash(input('Enter Admin Password: '))
    speciality = input('Enter Admin Speciality: ')
    consultation_fee = input('Enter Admin Consultation Fee: ')
    gmeet_link = input('Enter GMEET Link: ')
    db.insert_admin(name, speciality, consultation_fee, username, password, gmeet_link)

    ans = input('Succesfuly inserted, do you want to continue? (y)')