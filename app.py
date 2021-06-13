from flask import Flask, render_template, redirect, url_for, g, session
from flask_login import LoginManager, login_user, current_user
from lib.forms import Login

app = Flask(__name__)
app.secret_key = 'some key'

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = 'login'

users = {}

@app.route('/')
def hello_world():
   return 'Hello World'

@app.before_request
def before_request():
    g.user = current_user

@login_manager.user_loader
def load_user(id):
    return users(int(id))

@app.route('/login/', methods = ['GET', 'POST'])
def login():
    if g.user is not None and g.user.is_authenticated:
        return redirect(url_for('index'))
    form = Login()
    if form.validate_on_submit():
        login_user(g.user)
    print(form)
    return render_template('login.html',form = form)

@app.route('/signup')
def signup():
    ##this is a test function for the signup page link
    return 'sign up page'

if __name__ == '__main__':
   app.run(debug=True)