from datetime import datetime
from flask import Blueprint, render_template, request, session, redirect, url_for, current_app
from lib.forms import LoginForm, RegisterForm, OTPForm
import re

accounts = Blueprint('accounts', __name__)
accounts.webserver = current_app

# Account methods


@accounts.route('/login/', methods=['GET', 'POST'])
def login():
    msg = ''
    # Convert our request form ( The user submitted one ) into WTF Form so that we can validate it
    form = LoginForm(request.form)
    # .validate_on_submit() will check if user has submitted a valid form
    if request.method == 'POST' and form.validate_on_submit():
        user = accounts.webserver.app.db.get_username(request.form['username'])
        if user is None:
            msg = 'RED User not found!'
        else:
            passwordCorrect = accounts.webserver.app.verify_password(
                user['password'], request.form['password'], request.form['username'])
            if passwordCorrect:
                # Session uses cookies to set variables that are present in the client
                session['loggedin'] = True
                session['username'] = user['username']
                msg = 'GREEN Logged in!'
                return redirect('/dashboard')
            else:
                msg = 'RED Wrong Password!'
    return render_template('login.html', form=form, msg=msg)


@accounts.route('/logout')
def logout():
    session.pop('loggedin', None)  # Remove cookies
    session.pop('id', None)
    session.pop('username', None)
    session.pop('admin', None)
    return redirect(url_for('accounts.login'))


@accounts.route('/register', methods=['GET', 'POST'])
def register():
    msg = ''
    form = RegisterForm(request.form)
    if request.method == 'POST' and form.validate_on_submit():
        username = request.form['username']
        password = request.form['password']
        email = request.form['email']

        account = accounts.webserver.app.db.get_username(username)
        account_email = accounts.webserver.app.db.get_email(email)

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
            accounts.webserver.app.temp_data[request.form['email']
                                             ] = request.form
            otp = accounts.webserver.app.crypto.random()
            print(otp)
            accounts.webserver.app.register_otp[request.form['email']] = otp
            accounts.webserver.app.send_email(
                email, otp, request.url_root + url_for("accounts.otp_verification"))
            return redirect(url_for('accounts.otp_verification', email=email))
    elif request.method == 'POST':
        msg = 'RED Please fill out the form !'
    return render_template('register.html', msg=msg, form=form)


@accounts.route('/otp_verification', methods=['GET', 'POST'])
def otp_verification():
    email = request.args.get('email')
    msg = ''

    real_otp = accounts.webserver.app.register_otp.get(email)

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
                user = accounts.webserver.app.temp_data[email]
                accounts.webserver.app.register_account(user)
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


@accounts.route('/dashboard')
def dash():
    doctors = []
    requests = []
    if 'username' in session.keys():
        doctors = list(map(lambda x: x if x.pop('password') else x, map(
            accounts.webserver.app.db.to_dict_ad, accounts.webserver.app.db.get_admins())))
        requests = accounts.webserver.app.db.get_requests_for_patient(
            session['username'])
    return render_template('dashboard.html', doctors=doctors, requests=requests)


@accounts.route('/dashboard/book', methods=['POST'])
def book():
    if 'username' not in session.keys():
        return ('Unauthorized!', 401)
    data = request.get_json()
    print(data)
    doctname = data['name']
    time = data['time']
    patient = session['username']
    accounts.webserver.app.db.add_request(doctname, patient, time)  # convert timestamp to seconds
    return ('Ok', 200)
