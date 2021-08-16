from flask import Blueprint, render_template, request, session, current_app
from lib.forms import AdminForm
import re

admins = Blueprint('admins', __name__)
admins.webserver = current_app

@admins.route('/admins/login', methods=['GET', 'POST'])
def admin_create():
    form = AdminForm(request.form)
    msg=''
    if request.method == 'POST' and form.validate_on_submit():
        user = admins.webserver.app.db.get_admin_by_username(request.form['username'])
        if user is None:
            msg = 'RED User not found!'
        else:
            passwordCorrect = admins.webserver.app.verify_admin_password(user['password'], request.form['password'], request.form['username'])
            if passwordCorrect:
                # Session uses cookies to set variables that are present in the client
                session['loggedin'] = True
                session['username'] = user['username']
                session['admin'] = True

                msg = 'GREEN Logged in!'
            else:
                msg = 'RED Wrong Password!'
    return render_template('adminreg.html',form=form, msg=msg)

@admins.route('/admins', methods=['GET','POST'])
def doctorspresent():
    admin_det=admins.webserver.app.db.get_admins()    
    return render_template('admin.html',admin=admin_det)