import os

from lib.mysql import Db
from lib.email import EmailManager

from dotenv import load_dotenv  # for python-dotenv method
load_dotenv()

# coding: UTF-8
import re
from flask import Flask
from flask_bootstrap import Bootstrap
from flask import render_template, redirect, url_for, g, session, request
from lib.forms import LoginForm, RegisterForm, OTPForm
from lib import crypto


app = Flask(__name__)
Bootstrap(app)


app.register_otp = {}
app.temp_data = {}


@app.route('/')
def index():
    user = 'Not Logged in'
    if 'username' in session.keys():
        user = session['username']
    return f'Hello World: Logged in as {user}'

# Account methods


@app.route('/login/', methods=['GET', 'POST'])
def login():
    msg = ''

    # Convert our request form ( The user submitted one ) into WTF Form so that we can validate it
    form = LoginForm(request.form)
    # .validate_on_submit() will check if user has submitted a valid form
    if request.method == 'POST' and form.validate_on_submit():
        user = app.db.get_username(request.form['username'])
        if user is None:
            msg = 'RED No user found with that username, please register first!'
        print(request.form)

        passwordCorrect = verify_password(user['password'], request.form['password'], request.form['username'])
        if passwordCorrect:
            # Session uses cookies to set variables that are present in the client
            session['loggedin'] = True
            session['username'] = user['username']
            msg = 'GREEN Logged in!'
        else:
            msg = 'RED Wrong Password!'
    return render_template('login.html', form=form, msg=msg)


@app.route('/logout')
def logout():
    session.pop('loggedin', None)  # Remove cookies
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    msg = ''
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate_on_submit():
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        account = app.db.get_username(username)
        account_email = app.db.get_email(email)

        if account:
            msg = 'RED Please choose a different email!'
        if account_email:
            msg = 'RED Email is already registered!'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'RED Invalid email address !'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'RED Username must contain only characters and numbers !'
        elif not username or not password or not email:
            msg = 'RED Please fill out the form !'
        else:
            app.temp_data[request.form['email']] = request.form
            otp =  crypto.random()
            app.register_otp[request.form['email']] = otp
            send_email(email, otp)
            return redirect(url_for('otp_verification', email=email))
    elif request.method == 'POST':
        msg = 'RED Please fill out the form !'
    return render_template('register.html', msg=msg, form=form)


@app.route('/otp_verification', methods=['GET', 'POST'])
def otp_verification():
    email = request.args.get('email')
    msg = ''

    real_otp = app.register_otp.get(email)

    if real_otp is None:
        return redirect('register')
    form = OTPForm(request.form)
    if form.validate_on_submit():
        otp = request.form['otp']
        if email is None:
            msg = 'RED Incorrect Email provided!'
            email = 'None'
        if otp is not None:
            if int(real_otp) == int(otp):
                user = app.temp_data[email]
                register_account(user)
                session['loggedin'] = True
                session['username'] = user['username']
                return redirect(url_for('index'))
            else:
                msg = 'RED Incorrect OTP please check again'
        else:
            msg = 'RED Enter OTP..'
    else:
        if request.args.get('otp') is None:
            msg = 'GREEN Check your email ({}) for the OTP'.format(email)
        else:
            msg = 'GREEN Click on submit to complete account registration'

    return render_template('otp.html', form=form, msg=msg)


def register_account(data):
    hash = crypto.hash(data['password'])
    try:
        verify_password(hash, data['password'], data['username'])
        print(hash)
        app.db.insert(data['username'], hash, data['email'])
    except:
        print('Crypto ERROR!')
        raise

def send_email(email, otp):
    html = render_template('email.html', url=request.url_root + url_for("otp_verification" , email=email, otp = otp), otp=otp)
    app.email_manager.send_email(email, 'Verify Your Email', html)

def verify_password(hash, password, username):
    result = crypto.verify(hash,password)
    if result is True or result is False:
        return result
    else:
        db.update(username, password=result)
        return True

def load_config():
    mode=os.environ.get('FLASK_ENV')
    """Load config."""
    print('Loading in mode', mode)
    try:
        if mode == 'PRODUCTION':
            from config.production import prodConfig
            return prodConfig
        else:
            from config.development import devConfig
            return devConfig
    except ImportError:
        from config.base import config
        return config


config = load_config()
app.ENV = dict()
for i in config.ENV:
    app.ENV[i] = os.environ.get(i)
app.secret_key = app.ENV['FLASK_SECRET_KEY'] if app.ENV['FLASK_SECRET_KEY'] else "Test"
print('secret key', app.secret_key)
db = Db(app.ENV)
if (db.connected()):
    print('connected!')

app.email_manager = EmailManager(app.ENV)
app.host = config.HOST
app.db = db
app.cfg = config
print(app.ENV)

if __name__ == '__main__':
    app.run(debug=config.DEBUG, port=app.ENV['PORT'])
