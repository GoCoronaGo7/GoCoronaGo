
from flask_wtf import FlaskForm
from wtforms  import TextField, PasswordField
from wtforms.validators import Required

class Login(FlaskForm):
	user = TextField('Username', validators = [Required()])
	password = PasswordField('Password', validators = [Required()])