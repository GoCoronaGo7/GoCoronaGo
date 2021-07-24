class config:
    DEBUG=True
    ENV = ['DB_HOST', 'DB_PASSWORD', 'DB_USER', 'DB_NAME', 'EMAIL_USERNAME', 'EMAIL_PASSWORD','FLASK_SECRET_KEY', 'PORT']

class dev(config):
    DEBUG=True
    HOST='localhost'

class prod(config):
    DEBUG=False
    HOST='covid19projectt.herokuapp.com'