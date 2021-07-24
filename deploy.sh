cd client/
yarn build
cd ../
FLASK_ENV=PRODUCTION
gunicorn app:app --preload