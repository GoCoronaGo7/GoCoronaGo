import psycopg2
user = [(1, 'Jytesh', '$argon2id$v=19$m=102400,t=2,p=8$mJT79m3t0x8$ZFobClybvlNCqysLP+14WQ',
         'djitesh.man@gmail.com')]
admin = [('Jitesh', 'Pulmonologist', 10000, 'Jitesh', '$argon2id$v=19$m=102400,t=2,p=8$jhGjqgEMfao$t7GM2ix9Es4fSu9V2I+Mww', 'none'), ('Aniruddhan', 'nephrologist', 1000, 'Aniruddhan', '$argon2id$v=19$m=65536,t=3,p=4$XoCXpwHbrf0$TPgo8jNBJPh4FhchHF9gqg', 'dax-ahao-kfd'), ('S Adityan', 'gaynecologist', 10000, 'SA', '$argon2id$v=19$m=102400,t=2,p=8$EIdM0OGazas$kNWA6MysqMP3s3NrAM+SOg', 'zert-ssv-ovi'), ('Harikeshavan', 'Dermatologist', 2000, 'Harikeshavan', '$argon2id$v=19$m=65536,t=3,p=4$Q/o5q1WmPJE$fmTJQjbvoCqavDX0bC51Uw', 'ojk-qcrs-vjp'), ('Druva', 'Urologist', 2500, 'Druva', '$argon2id$v=19$m=65536,t=3,p=4$+ImpHFnLrmE$rP1VOb7Dzp8Q6irQLV9mIg', 'uvm-xxyy-gmk'), ('Rohin', 'Surgeon', 30000, 'Rohin', '$argon2id$v=19$m=65536,t=3,p=4$qKjXwaOqSCA$8d1ur/3nlWHFG2KYyGh5Rw', 'zbc-gjie-nxi'), ('Mukund', 'Anesthesiologist', 35000, 'Mukund', '$argon2id$v=19$m=65536,t=3,p=4$569T5boa7h8$jItMy8TVQKkl9qZcXJ7Q8A', 'tyj-awdf-nvi'), ('Rakesh', 'Radiologist', 40000, 'Rakesh', '$argon2id$v=19$m=65536,t=3,p=4$C9/4aOWds/k$9rAib2FHN9DR5a/Odp6XAA', 'ext-ynui-idc'), ('Rohit', 'Pulmonologist', 50000, 'Rohit', '$argon2id$v=19$m=65536,t=3,p=4$L8oN5Fovt2Y$+2BdDK3nn1K5Jz10Mec2Vw', 'rxi-tyzu-yno'),
         ('Ashwin', 'Cardiologist', 500000, 'Ashwin', '$argon2id$v=19$m=65536,t=3,p=4$d2BGeaW4558$v1yntQT7ypvm+HT79HHapg', 'rsu-tvia-far'), ('Akash', 'Family doctor', 300, 'Akash', '$argon2id$v=19$m=65536,t=3,p=4$5DjLXbWr294$InRFkm63D0+VYD47nYxmgA', 'zor-luff-boa'), ('Dheepaswarupan', 'Family doctor', 500, 'Dheepaswarupan', '$argon2id$v=19$m=65536,t=3,p=4$nU3+4sLQjhM$Y+kG2CwHtu3YgjCH18S7NQ', 'nam-croc-cho'), ('Santhosh', 'surgeon', 4500, 'Santhosh', '$argon2id$v=19$m=65536,t=3,p=4$cMQBKCOE1/E$4WeKrW9md0f+2XZTd0VwnQ', 'tra-jagg-dof'), ('Yugaan', 'Nephrologist', 3500, 'Yugaan', '$argon2id$v=19$m=65536,t=3,p=4$WOZRU7b/xHk$3R+7o/AoLlPD1Q+QqyCN+Q', 'eus-leig-san'), ('Eshwar', 'surgeon', 50000, 'Eshwar', '$argon2id$v=19$m=65536,t=3,p=4$Aoee3vNvlF8$tz0ihI5VAW2YOjJdpASYpQ', 'lhj-gjie-ixn'), ('Vaibhav', 'Radiologist', 5500, 'Vaibhav', '$argon2id$v=19$m=65536,t=3,p=4$8AUCV8OMqzM$fFdcXurBqnnlx34q7swg6Q', 'bkr-ook-uhm'), ('Sheshadri', 'Cardiologist', 6000, 'Sheshadri', '$argon2id$v=19$m=65536,t=3,p=4$o64IbMVL0RI$kCDG7cUBjLxhvQvFkpJ2+Q', 'rdr-nxie-jig'), ('Kapilesh', 'Neurologist', 5000, 'Kapilesh', '$argon2id$v=19$m=65536,t=3,p=4$43EwH/uVbFY$UoON6R6dT5Pzq2rfs8RPDw', 'tha-aydu-ofg')]

query_user_setup = '''CREATE TABLE "user"
    (
    id SERIAL,
    username varchar(25) NOT NULL,
    password varchar(128) NOT NULL,
    email varchar(32) NOT NULL,
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

conn = psycopg2.connect(
    'postgresql://postgres:OB7ZEtRGgRh4cSzw5w1F@containers-us-west-18.railway.app:7752/railway')
conn.autocommit = True


def commit(x):
    print(x)
    c.execute(
        'INSERT INTO public.admin (name, speciality, consultation_fee, username_ad, password_ad, gmeet_id) VALUES (%s, %s, %s, %s, %s, %s)',
        x)
    conn.commit()


with conn.cursor() as c:
    print(list(map(commit, admin)))
