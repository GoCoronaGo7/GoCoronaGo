

# coding: UTF-8
from flask import Flask
from flask_bootstrap import Bootstrap
from flask import render_template, session, request
from lib.forms import BlogForm

from requests_futures.sessions import FuturesSession
from concurrent.futures import as_completed


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

@webserver.route('/blogout' )
def blogout():
    webserver.app.db.get_blog(blogout)    
    return render_template('blogout.html',out=blogout)

@webserver.route('/stats') 
def stats():
    return render_template("stats.html")

@webserver.route("/static/build/<path:path>")
def getApp(path):
    return webserver.send_static_file("build/" + path)


code_names = ["amd","aps","beed","bengaluru","cgh","delhi","gandhinagar","ker","kolhapur","mp","nagpur","nashik","pune","rjs","rkt","tnadu","telangana","uttarpradesh","baroda","wb"]
websites   = ["https://covidamd.com/","https://covidaps.com/","https://covidbeed.com/","https://covidbengaluru.com/","https://covidcgh.com/","https://coviddelhi.com/","https://covidgandhinagar.com/","https://covidker.com/","https://covidkolhapur.com/","https://covidmp.com/","https://covidnagpur.com/","https://covidnashik.com/","https://covidpune.com/","https://covidrjs.com/","https://covidrkt.com/","https://covidtnadu.com/","https://covidtelangana.com/","https://coviduttarpradesh.com/","https://covidbaroda.com/","https://covidwb.com/"]
state_names= ["Ahmedabad","Andra Pradesh","Beed,Maharashtra","Bengaluru","Chhatisgarh","Delhi","Gandhinagar,Gujarat","Kerala","Kolhapur,Maharashtra","Madhya Pradesh","Nagpur,Maharashtra","Nashik,Maharashtra","Pune,Maharashtra","Rajastan","Rajkot,Gujarat","Tamil Nadu","Telangana","Uttar Pradesh","Baroda","West Bengal"]

requested_data = None
@webserver.route('/api/data/')
def vaccination():
    if requested_data is None:
        cache_data()
    name = request.args.get('name')
    all = request.args.get('all')
    if all is not None:
        return requested_data
    if name is None:
        return { 'data': [code_names, websites, state_names] }
    else:
        return { 'data': requested_data.get(name) }
        
def cache_data():
    global requested_data

    requested_data = {}
    session = FuturesSession()
    futures = []
    for i in range(0,20):
        website = websites[i]
        name = website.split('//')[1]
        data = session.get(website + 'data/' + name + 'bed_data.json')
        futures.append(data)
    for future in as_completed(futures):
        data = future.result()
        requested_data[data.url.split('data/covid')[1].split('.com')[0]] = data.json()
