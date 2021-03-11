# Dory Capital Server
## MongoDB
### Initial Login URI
`mongodb://127.0.0.1:27017`

### Create DB
`use dory-capital`

### Create Collection
`db.createCollection("paragraphs")`

### Create 'dbAdmin' User
`db.createUser({ user: "yambakshi", pwd: "1234", roles: [{ role: "dbAdmin", db: "dory-capital" }]})`

### Drop user
`db.dropUser("yambakshi")`

## Deployment

### Prerequisites
```
mkdir ~/server
mkdir /var/www/html/dory-capital
npm install pm2 -g
```

**NOTE**
In the output of the `pm2` installation you might see warnings about missing dependencies:
- bufferutil
- utf-8-validate

Make sure to install them globally as well.

### Manual Deployment
Run `npm run build` to build the server on local machine.  
WinSCP `out` and `package.json` into `~/server` on CentOS 8 machine.  
```
cd /var/www/html/dory-capital
mkdir server
mv ~/server/* /var/www/html/dory-capital/server
cd ~/server
npm i
mkdir log tmp
sudo chmod 777 log tmp
```

### Run Server
```
pm2 start out/main.js
```

Check server status  
```
pm2 list
```

Stop server
```
pm2 stop 0
```

pm2 logs folder
```
ll ~/.pm2/logs
```

### Enable Startup
```
pm2 startup
pm2 save
```