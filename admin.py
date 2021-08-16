import os
from lib import Db


def load_config():
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
if ENV['NO_DB'] is None:
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
    # DO DB STUFF here
    pass