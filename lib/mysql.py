import mysql.connector as connector


class Db:
    def __init__(self, env):
        self.connection = connector.connect(
            host=env['DB_HOST'],
            user=env['DB_USER'],
            passwd=env['DB_PASSWORD']
        )
        self.env = env
        cursor = self.connection.cursor()

        query_setup = f'''CREATE DATABASE IF NOT EXISTS `{env['DB_NAME']}`'''
        cursor.execute(query_setup)
        cursor.execute(f'USE `{env["DB_NAME"]}`')
    
        query_user_setup = '''CREATE TABLE IF NOT EXISTS `user`
                    (
                    id INT NOT NULL AUTO_INCREMENT,
                    username varchar(25) NOT NULL,
                    password varchar(128) NOT NULL,
                    email varchar(32) NOT NULL,
                    PRIMARY KEY (id) 
                    )
                '''
        query_doc_setup = '''CREATE TABLE IF NOT EXISTS `doctor`
                    (
                    id INT NOT NULL AUTO_INCREMENT,
                    username varchar(25) NOT NULL,
                    password varchar(16) NOT NULL,
                    email varchar(25) NOT NULL,
                    PRIMARY KEY (id) 
                    )
        '''
        cursor.execute(query_user_setup)
        cursor.execute(query_doc_setup)
    def get_cursor(self):
        try:
            return self.connection.cursor()
        except:
            self.connection.reconnect()
            return self.connection.cursor()

    def connected(self):
        if self.connection:
            return True
        else:
            return False

    def get(self, id):
        cursor = self.get_cursor()
        cursor.execute(
            f'''SELECT * FROM `user` WHERE `id`='{id}' ''')
        return cursor.fetchone()

    def get_username(self, username):
        cursor = self.get_cursor()
        cursor.execute(
            f'''SELECT * FROM `user` WHERE `username`='{username}' ''')
        user = cursor.fetchone()
        if user is None:
            return None
        return self.to_dict(user)

    def get_email(self, email):
        cursor = self.get_cursor()
        cursor.execute(
            f'''SELECT * FROM `user` WHERE `email`='{email}' ''')
        user = cursor.fetchone()
        if user is None:
            return None
        return self.to_dict(user)

    def insert(self, user, passw, email):
        cursor = self.get_cursor()
        cursor.execute(
            f'''INSERT INTO `user` (username,password,email) values('{user}', '{passw}', '{email}')''')
        return self.connection.commit()
    
    def update(self, user, **kwargs):
        print(kwargs)
        cursor = self.get_cursor()

        cursor.execute(
            f'''UPDATE `user` SET {self.dict_to_query(kwargs)}, WHERE `user`.`username`={user}'''
        )
    def to_dict(self, values):
        keys = ('id', 'username', 'password', 'email')
        return dict(zip(keys, values))

    def dict_to_query(self, args):
        query = ''
        for (key, value) in args.items():
            query += f'{key}={value}'
        return query
