

# coding: UTF-8
from flask import Flask
from flask_bootstrap import Bootstrap
from flask import render_template, redirect, url_for, session, request
from lib.forms import BlogForm

webserver = Flask(__name__)
Bootstrap(webserver)

from blueprints.accounts import accounts

webserver.register_blueprint(accounts)

@webserver.route('/')
def index():
    user = 'Not Logged in'
    if 'username' in session.keys():
        user = session['username']
    return render_template('base.html')

@webserver.route('/blog', methods=['GET', 'POST'])
def blog():
    form = BlogForm(request.form)
    msg=''
    if request.method == 'POST' and form.validate_on_submit():
        content = request.form['content']
    return render_template('blog.html',form=form, msg=msg)

@webserver.route('/stats') 
def stats():
    return render_template('stats.html')