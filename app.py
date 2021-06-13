import re
from flask import Flask, render_template, redirect, url_for, g, session, request
from lib.forms import LoginForm, RegisterForm
from flask_bootstrap import Bootstrap

from lib.mysql import db

app = Flask(__name__)
Bootstrap(app)
app.secret_key = 'some key'


@app.route('/')
def hello_world():
    user = session['username']
    return f'Hello World: Logged in as {user}'

# Account methods


@app.route('/login/', methods=['GET', 'POST'])
def login():
    msg = ''

    form = LoginForm(request.form)
    if request.method == 'POST' and form.validate_on_submit():
        user = db.get_username(request.form['username'])
        print(user['password'])
        if user is None:
            msg = 'No user found with that username, please register first!'
        elif user['password'] == request.form['password']:
            session['loggedin'] = True
            session['id'] = user['id']
            session['username'] = user['username']
            msg = 'Logged in!'
        else:
            print(user.password)
            msg = 'Wrong Password!'
    return render_template('login.html', form=form, msg=msg)


@app.route('/logout')
def logout():
    session.pop('loggedin', None)
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))


@app.route('/register', methods=['GET', 'POST'])
def register():
    msg = ''
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate():
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        account = db.get_username(username)
        if account:
            msg = 'Account already exists !'
        elif not re.match(r'[^@]+@[^@]+\.[^@]+', email):
            msg = 'Invalid email address !'
        elif not re.match(r'[A-Za-z0-9]+', username):
            msg = 'Username must contain only characters and numbers !'
        elif not username or not password or not email:
            msg = 'Please fill out the form !'
        else:
            db.insert(username, password, email)
            msg = 'You have successfully registered !'
    elif request.method == 'POST':
        msg = 'Please fill out the form !'
    return render_template('register.html', msg=msg, form = form)


@app.route('/signup')
def signup():
    ##this is a test function for the signup page link
    return 'sign up page'

if __name__ == '__main__':
    if (db.connected()):
        print('connected!')
    app.run(debug=True)
