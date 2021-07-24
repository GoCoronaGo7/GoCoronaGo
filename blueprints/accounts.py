from flask import Blueprint, render_template, request, session, redirect, url_for, current_app
from lib.forms import LoginForm, RegisterForm, OTPForm
import re

accounts = Blueprint('accounts', __name__)
accounts.app = current_app

accounts.secret_key = 'test'

# print(current_app.db)

# Account methods
@accounts.route('/login/', methods=['GET', 'POST'])
def login():
    msg = ''

    # Convert our request form ( The user submitted one ) into WTF Form so that we can validate it
    form = LoginForm(request.form)
    # .validate_on_submit() will check if user has submitted a valid form
    if request.method == 'POST' and form.validate_on_submit():
        user = accounts.app.db.get_username(request.form['username'])
        if user is None:
            msg = 'RED User not found!'
        else:
            passwordCorrect = accounts.app.verify_password(user['password'], request.form['password'], request.form['username'])
            if passwordCorrect:
                # Session uses cookies to set variables that are present in the client
                session['loggedin'] = True
                session['username'] = user['username']
                msg = 'GREEN Logged in!'
            else:
                msg = 'RED Wrong Password!'
    return render_template('login.html', form=form, msg=msg)


@accounts.route('/logout')
def logout():
    session.pop('loggedin', None)  # Remove cookies
    session.pop('id', None)
    session.pop('username', None)
    return redirect(url_for('login'))


@accounts.route('/register', methods=['GET', 'POST'])
def register():
    msg = ''
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate_on_submit():
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        account = accounts.app.db.get_username(username)
        account_email = accounts.app.db.get_email(email)

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
            accounts.app.temp_data[request.form['email']] = request.form
            otp =  accounts.app.crypto.random()
            accounts.app.register_otp[request.form['email']] = otp
            accounts.app.send_email(email, otp, request.url_root + url_for("otp_verification"))
            return redirect(url_for('otp_verification', email=email))
    elif request.method == 'POST':
        msg = 'RED Please fill out the form !'
    return render_template('register.html', msg=msg, form=form)


@accounts.route('/otp_verification', methods=['GET', 'POST'])
def otp_verification():
    email = request.args.get('email')
    msg = ''

    real_otp = accounts.app.register_otp.get(email)

    if real_otp is None:
        return redirect('accounts.register')
    form = OTPForm(request.form)
    if form.validate_on_submit():
        otp = request.form['otp']
        if email is None:
            msg = 'RED Incorrect Email provided!'
            email = 'None'
        if otp is not None:
            if int(real_otp) == int(otp):
                user = accounts.app.temp_data[email]
                accounts.app.register_account(user)
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