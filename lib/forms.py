
from flask_wtf import FlaskForm
from wtforms import TextField, PasswordField
from wtforms.validators import Required, Length, Email
import wtforms.validators as validators


class LoginForm(FlaskForm):
    username = TextField('Username', validators=[Required()])
    password = PasswordField('Password', validators=[Required()])


class RegisterForm(FlaskForm):
    username = TextField("Username", validators=[
        Length(min=3, max=25),
        validators.DataRequired(message="Please Fill This Field")
    ])
    email = TextField("Email", validators=[
        Email(message="Please enter a valid email address"),
        validators.DataRequired(message="Please Fill This Field")
    ])
    password = PasswordField("Password", validators=[
        validators.DataRequired(message="Please Fill This Field"),
        validators.EqualTo(fieldname="confirm",
                           message="Your Passwords Do Not Match")
    ])
    confirm = PasswordField("Confirm Password", validators=[
                            validators.DataRequired(message="Please Fill This Field")])

class OTPForm(FlaskForm):
    email = TextField("Email")
    otp = TextField("OTP", validators=[
                            validators.DataRequired(message="Please Fill This Field")])

class BlogForm(FlaskForm):
    title = TextField("Title", validators=[
        Length(min=5, max=20),
         validators.DataRequired(message="Under/Over word limit")
    ])
    content = TextField("Content", validators=[
        Length(min=5, max=350),
        validators.DataRequired(message="Under/Over word limit")
    ])