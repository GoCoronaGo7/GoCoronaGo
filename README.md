# Loading ENV Variables into Heroku
`cat .env | tr '\n' ' ' | xargs heroku config:set`