import datetime

# coding: UTF-8
from flask import Flask
from flask import render_template, session, request
from lib.forms import BlogForm

from requests_futures.sessions import FuturesSession
from concurrent.futures import as_completed
from datetime import datetime


webserver = Flask(__name__)


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
    date_posting=datetime.now().strftime('%m%d%Y')
    date_posting=str(date_posting)
    Blog_date_now=datetime.now().strftime('%m%d%Y')
    Blog_date_now=str(Blog_date_now)
    webserver.app.db.check_blog(Blog_date_now)    
    if request.method == 'POST' and form.validate_on_submit():
        content_blog = request.form['content'] #content
        user_blog = 'Anonymous' # username
        title_blog = request.form['title'] # title
        if 'username' in session.keys():
            user_blog = session['username']        
        webserver.app.db.insert_blog(user_blog,content_blog,date_posting,title_blog)
    return render_template('blog.html',form=form, msg=msg)

@webserver.route('/blogout' )
def blogout():
    blog_out=webserver.app.db.get_blog()    
    return render_template('blogout.html',out=blog_out)
    

@webserver.route('/stats') 
def stats():
    return render_template("stats.html", )

@webserver.route('/hospitals') 
def hospitals():
    str_code_names = ",".join(map(lambda x: "'" + x + "'", code_names))
    str_state_names = ",".join(map(lambda x: "'" + x + "'", state_names))
    data = f'[ [{ str_code_names }], [{ str_state_names }]]'
    print(data)
    return render_template("hospitals.html", data=data)

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
        return { 'data': [code_names, state_names] }
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
