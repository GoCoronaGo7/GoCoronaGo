class config:
    DEBUG=True
    ENV = ['DATABASE_URL', 'DB_NAME', 'EMAIL_USERNAME', 'EMAIL_PASSWORD','FLASK_SECRET_KEY', 'PORT', 'HOT_RELOAD', 'NO_DB']

class dev(config):
    DEBUG=True
    HOST='localhost'

class prod(config):
    DEBUG=False
    HOST='gocoronagoapp.herokuapp.com'