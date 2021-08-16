import mysql.connector as connector
import datetime
from datetime import datetime


class Db:
    def __init__(self, env):
        self.connection = connector.connect(
            host=env['DB_HOST'],
            user=env['DB_USER'],
            passwd=env['DB_PASSWORD'],
            database=env['DB_NAME']
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
        query_blog_setup = '''CREATE TABLE IF NOT EXISTS `blog`
                    (
                    id INT NOT NULL AUTO_INCREMENT,
                    title varchar(25) NOT NULL,
                    username varchar(25) NOT NULL,
                    content varchar(450) NOT NULL,
                    date_post varchar(25) NOT NULL,
                    PRIMARY KEY (id) 
                    )         
        ''' 
        query_admin = '''CREATE TABLE IF NOT EXISTS `admin`
                    (
                    name varchar(25) NOT NULL,
                    speciality varchar(450) NOT NULL,
                    consultation_fee int NOT NULL,
                    username_ad varchar(25) NOT NULL,
                    password_ad varchar(16) NOT NULL,
                    gmeet_id varchar(20) NOT NULL
                    )         
        ''' 
        cursor.execute(query_user_setup)
        cursor.execute(query_doc_setup)
        cursor.execute(query_blog_setup)
        cursor.execute(query_admin)
        
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
    
    def insert_admin(self,doctname,speciality,fee,usrname,passwrd,meet_id):
        cursor = self.get_cursor()
        cursor.execute(
            f'''INSERT INTO `admin` (name,speciality,consultation_fee,username_ad,password_ad,gmeet_id) values('{doctname}', '{speciality}', '{fee}', '{usrname}', '{passwrd}','{meet_id}')''')
        return self.connection.commit()
    
    def get_admins(self):
        cursor = self.get_cursor()
        cursor.execute(
            f'''SELECT * FROM `admin` ''')
        doct_det_out=cursor.fetchall()
        return doct_det_out
    def get_admin_by_username(self, username):
        cursor = self.get_cursor()
        cursor.execute(
            f'''SELECT * FROM `admin` ''')
        doct_det_out=cursor.fetchall()
        return doct_det_out
    def insert_blog(self,user,content,date,title):
        cursor = self.get_cursor()
        cursor.execute(
            f'''INSERT INTO `blog` (username,content,date_post,title) values('{user}', '{content}','{date}','{title}')''')
        return self.connection.commit()
    
    def get_blog(self):
        cursor = self.get_cursor()
        cursor.execute(
            f'''SELECT * FROM `blog` ''')
        blogout=cursor.fetchall()
        return blogout
    
    def check_blog(self,Blog_date_check):
        cursor = self.get_cursor()
        cursor.execute(
            f'''SELECT `date_post` FROM `blog` where `id`=1 ''')
        blog_post_date_tup = cursor.fetchone()
        try:
            blog_post_date = blog_post_date_tup[0]
            if Blog_date_check != blog_post_date:
                cursor.execute(
                    f'''DELETE FROM `blog` where date_post = '{blog_post_date}' ''')
        except:
            pass
        return self.connection.commit()
    
    def update(self, user, **kwargs):
        print(kwargs)
        cursor = self.get_cursor()

        cursor.execute(
            f'''UPDATE `user` SET {self.dict_to_query(kwargs)}, WHERE `user`.`username`={user}'''
        )
    def update_admin(self, user, **kwargs):
        print(kwargs)
        cursor = self.get_cursor()

        cursor.execute(
            f'''UPDATE `admin` SET {self.dict_to_query(kwargs)}, WHERE `admin`.`username`={user}'''
        )
    def to_dict(self, values):
        keys = ('id', 'username', 'password', 'email')
        return dict(zip(keys, values))

    def dict_to_query(self, args):
        query = ''
        for (key, value) in args.items():
            query += f'{key}={value}'
        return query
