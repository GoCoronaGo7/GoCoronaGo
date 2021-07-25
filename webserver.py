

# coding: UTF-8
from flask import Flask
from flask_bootstrap import Bootstrap
from flask import render_template, redirect, url_for, session, request
from requests import get

from lib.forms import BlogForm

WEBPACK_DEV_SERVER_HOST = "http://localhost:3000"

webserver = Flask(__name__)
Bootstrap(webserver)

from blueprints.accounts import accounts

webserver.register_blueprint(accounts)

def proxy(host, path):
    print(f"{host}{path}")
    response = get(f"{host}{path}")
    excluded_headers = [
        "content-encoding",
        "content-length",
        "transfer-encoding",
        "connection",
    ]
    headers = {
        name: value
        for name, value in response.raw.headers.items()
        if name.lower() not in excluded_headers
    }
    return (response.content, response.status_code, headers)

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
    if webserver.env == 'DEVELOPMENT':
        return proxy(WEBPACK_DEV_SERVER_HOST, '/build/stats.html')
    return webserver.send_static_file("build/stats.html",)

@webserver.route("/static/build/<path:path>")
def getApp(path):
    if webserver.env == 'DEVELOPMENT':
        return proxy(WEBPACK_DEV_SERVER_HOST, request.path)
    return webserver.send_static_file("build/" + path)