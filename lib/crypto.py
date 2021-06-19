from argon2 import PasswordHasher
from secrets import SystemRandom

rng = SystemRandom()

ph = PasswordHasher(
    salt_len=8,
    hash_len=16
)

def hash(password):
    try:
        return ph.hash(password)
    except:
        print(f'Error hashing password {password}')

def verify(hash, password):
    try:
        result = ph.verify(hash, password)
        if (ph.check_needs_rehash(hash)):
            return ph.hash(password)
        else:
            return result # Must be True
    except Exception as e:
        print(e)
        return False

def random():
    return rng.randrange(10000,100000)