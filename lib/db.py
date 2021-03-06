from urllib import request
import psycopg2
import datetime
from datetime import datetime

query_user_setup = '''CREATE TABLE "user"
    (
    id SERIAL,
    username varchar(25) NOT NULL,
    password varchar(128) NOT NULL,
    email varchar(32) NOT NULL,
    PRIMARY KEY (id)
    )
                '''
query_blog_setup = '''CREATE TABLE "blog"
    (
    id SERIAL,
    title varchar(25) NOT NULL,
    username varchar(25) NOT NULL,
    content varchar(450) NOT NULL,
    date_post varchar(25) NOT NULL,
    PRIMARY KEY (id)
    )
        '''
query_admin_setup = '''CREATE TABLE "admin"
    (
    name varchar(25) NOT NULL,
    speciality varchar(450) NOT NULL,
    consultation_fee int NOT NULL,
    username_ad varchar(25) NOT NULL,
    password_ad varchar(128) NOT NULL,
    gmeet_id varchar(20) NOT NULL
    )
'''
query_request_setup = '''CREATE TABLE "requests"
    (
    patient_username varchar(25) NOT NULL,
    doctor_name varchar(25) NOT NULL,
    time varchar(13) NOT NULL,
    status varchar(25) NOT NULL,
    details TEXT,
    PRIMARY KEY (patient_username, doctor_name, time)
    )
'''


class Db:
    def __init__(self, env):
        self.env = env
        self.connect()
        with self.connection.cursor() as cursor:
            try:
                cursor.execute(query_user_setup)
                cursor.execute(query_blog_setup)
                cursor.execute(query_admin_setup)
                cursor.execute(query_request_setup)
            except (Exception, psycopg2.errors.DuplicateTable) as e:
                pass

    def get_cursor(self):
        try:
            return self.connection.cursor()
        except:
            self.connect()
            return self.connection.cursor()

    def connect(self):
        self.connection = psycopg2.connect(
            self.env['DATABASE_URL'], dbname=self.env['DB_NAME']
        )
        self.connection.autocommit = True

    def connected(self):
        if self.connection:
            return True
        else:
            return False

    def get(self, id):
        cursor = self.get_cursor()
        cursor.execute('''SELECT * FROM public.user WHERE id=%s''', [id])
        return cursor.fetchone()

    def get_username(self, username):
        cursor = self.get_cursor()
        cursor.execute(
            '''SELECT * FROM public.user WHERE username=%s''', [username])
        user = cursor.fetchone()
        if user is None:
            return None
        return self.to_dict(user)

    def get_email(self, email):
        cursor = self.get_cursor()
        cursor.execute(
            '''SELECT * FROM public.user WHERE public.user.email=%s''', [email])
        user = cursor.fetchone()
        if user is None:
            return None
        return self.to_dict(user)

    def insert(self, user, passw, email):
        cursor = self.get_cursor()
        cursor.execute('INSERT INTO public.user(username,password,email) values(%s, %s, %s)', [
                       user, passw, email])
        return self.connection.commit()

    def insert_admin(self, doctname, speciality, fee, usrname, passwrd, meet_id):
        cursor = self.get_cursor()
        cursor.execute('INSERT INTO public.admin (name,speciality,consultation_fee,username_ad,password_ad,gmeet_id) values(%s, %s, %s, %s, %s, %s)', [
                       doctname, speciality, fee, usrname, passwrd, meet_id])
        return self.connection.commit()

    def get_admins(self):
        cursor = self.get_cursor()
        cursor.execute('SELECT * FROM public.admin')
        doct_det_out = cursor.fetchall()
        return doct_det_out

    def get_admin_by_username(self, username):
        cursor = self.get_cursor()
        cursor.execute(
            'SELECT * FROM public.admin WHERE admin.username_ad=%s', [username])
        user = cursor.fetchone()
        if user is None:
            return None
        return self.to_dict_ad(user)

    def insert_blog(self, user, content, date, title):
        cursor = self.get_cursor()
        cursor.execute(
            f'''INSERT INTO public.blog (username,content,date_post,title) values('{user}', '{content}','{date}','{title}')''')
        return self.connection.commit()

    def get_blog(self):
        cursor = self.get_cursor()
        cursor.execute(
            f'''SELECT * FROM blog ''')
        blogout = cursor.fetchall()
        return blogout

    def check_blog(self, Blog_date_check):
        cursor = self.get_cursor()
        cursor.execute(
            f'''SELECT date_post FROM public.blog''')
        blog_post_date_tup = cursor.fetchone()
        try:
            blog_post_date = blog_post_date_tup[0]
            if Blog_date_check != blog_post_date:
                cursor.execute(
                    f'''DELETE FROM public.blog where date_post = '{blog_post_date}' ''')
        except:
            pass
        return self.connection.commit()

    def update(self, user, **kwargs):
        cursor = self.get_cursor()

        cursor.execute(
            f'''UPDATE public.user SET {self.dict_to_query(kwargs)} WHERE public.user.username=%s''', [user])

    def update_admin(self, user, **kwargs):
        cursor = self.get_cursor()

        cursor.execute(
            f'''UPDATE public.admin SET {self.dict_to_query(kwargs)}, WHERE public.admin.username=%s''', [user])

    def get_requests_for_patient(self, patient):
        cursor = self.get_cursor()
        cursor.execute(
            '''SELECT * FROM public.requests WHERE patient_username=%s''', [patient])
        requests = list(map(self.to_dict_request, cursor.fetchall()))
        return requests

    def get_requests_for_doctor(self, doctname):
        cursor = self.get_cursor()
        cursor.execute(
            '''SELECT * FROM public.requests WHERE doctor_name=%s''', [doctname])
        requests = list(map(self.to_dict_request, cursor.fetchall()))
        return requests

    def add_request(self, doctname, patient, time):
        cursor = self.get_cursor()
        cursor.execute(
            '''INSERT INTO public.requests (doctor_name,patient_username,time,status) values(%s, %s, %s, %s)''', [doctname, patient, time, "pending"])
        return self.connection.commit()

    def update_request(self, doctname, patient, note, completed):
        query = ''
        args = []
        if note is not None:
            query = 'UPDATE public.requests SET details=%s WHERE doctor_name=%s AND patient_username=%s'
            args = [note, doctname, patient]
        if completed is not None:
            query = 'UPDATE public.requests SET status=%s WHERE doctor_name=%s AND patient_username=%s'
            args = ['completed', doctname, patient]
        cursor = self.get_cursor()
        cursor.execute(query, args)
        return self.connection.commit()
    def to_dict(self, values):
        keys = ('id', 'username', 'password', 'email')
        return dict(zip(keys, values))

    def to_dict_ad(self, values):
        keys = ['doctname', 'speciality', 'fee',
                'username', 'password', 'meet_id']
        return dict(zip(keys, values))

    def to_dict_request(self, values):
        keys = ['patient_username', 'doctname', 'time', 'status', 'details']
        return dict(zip(keys, values))

    def dict_to_query(self, args):
        query = ''
        for (key, value) in args.items():
            query += f'{key}=\'{value}\''
        return query
