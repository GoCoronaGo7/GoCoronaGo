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

def add_admins():
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
def list_login_links():
    ans = input('Enter admin username (a to get all, e to end)')
    if ans == 'a':
        admins = db.get_admins()
    else:
        admins = [db.get_admin_by_username(ans)]
    print(admins)

def delete_admin():
    ans = input('ENTER CONDITION FOR DELETION: \n')
    cursor = db.get_cursor()
    cursor.execute('SELECT * FROM public.admin WHERE ' + ans)
    data = cursor.fetchall()
    print('Are you sure you want to delete this?\n', str(data))
    confirm = input()
    if confirm != 'n':
        cursor.execute('DELETE FROM public.admin WHERE ' + ans)
        print('done')
    else:
        print('ok quitting')
    
call = int(input('1. Insert Admin\n2. List Admin\n3. Delete Admin: '))
if call == 1:
    add_admins()
elif call == 2:
    list_login_links()
elif call == 3:
    delete_admin()