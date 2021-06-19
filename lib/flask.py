import re
from flask import Flask
from flask_bootstrap import Bootstrap
from flask import render_template, redirect, url_for, g, session, request
from lib.forms import LoginForm, RegisterForm
from . import crypto


app = Flask(__name__)
Bootstrap(app)

app.secret_key = 'some key'

app.register_otp = {}
app.temp_data = {}

@app.route('/')
def hello_world():
    user = 'Not Logged in'
    if 'username' in session.keys():
        user = session['username']
    return f'Hello World: Logged in as {user}'

# Account methods
@app.route('/login/', methods=['GET', 'POST'])
def login():
    msg = ''

    form = LoginForm(request.form) # Convert our request form ( The user submitted one ) into WTF Form so that we can validate it 
    if request.method == 'POST' and form.validate_on_submit(): # .validate_on_submit() will check if user has submitted a valid form
        user = app.db.get_username(request.form['username'])
        if user is None:
            msg = 'RED No user found with that username, please register first!'
        elif user['password'] == request.form['password']:
            session['loggedin'] = True # Session uses cookies to set variables that are present in the client
            session['id'] = user['id']
            session['username'] = user['username']
            msg = 'GREEN Logged in!'
        else:
            msg = 'RED Wrong Password!'
    return render_template('login.html', form=form, msg=msg)


@app.route('/logout')
def logout():
    session.pop('loggedin', None) # Remove cookies
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
            msg = 'OTP !'
            app.register_otp[request.form['email']] = crypto.random()
            redirect()
    elif request.method == 'POST':
        msg = 'RED Please fill out the form !'
    return render_template('register.html', msg=msg, form = form)


@app.route('/otp_verification', methods=['GET', 'POST'])
def register():
    email = request.args.get('email')
    otp = request.args.get('token')

    
    app.db.insert(username, password, email)

