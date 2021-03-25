# Dory Capital - Server
## MongoDB
```
# Initial login URI
mongodb://127.0.0.1:27017

# Create DB
use dory-capital

# Create collection
db.createCollection("paragraphs")

# Create 'dbAdmin' user
db.createUser({ user: "yambakshi", pwd: "1234", roles: [{ role: "dbAdmin", db: "dory-capital" }]})

# Drop user
db.dropUser("yambakshi")
```

## Deploy

Run `npm run build` to build the server on local machine.  
WinSCP `out` and `package.json` into `~/server` on CentOS 8 machine.
```
cd /var/www/html/dory-capital/server
mv ~/server/* .
npm i
mkdir log tmp
sudo chmod 777 log tmp
pm2 start out/main.js
```