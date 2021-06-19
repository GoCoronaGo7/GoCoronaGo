from lib.mysql import db
from lib.flask import app

# coding: UTF-8
import os
def load_config(mode=os.environ.get('MODE')):
    """Load config."""
    try:
        if mode == 'PRODUCTION':
            from config.production import prodConfig
            return prodConfig
        else:
            from config.development import devConfig
            return devConfig
    except ImportError:
        from config.base import config
        return config

if __name__ == '__main__':
    config = load_config()
    if (db.connected()):
        print('connected!')
    app.host = config.host
    app.db = db
    app.run(debug=config.debug)
