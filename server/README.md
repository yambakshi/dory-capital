# Dory Capital - Server
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
### Manual Deployment
Run `npm run build` to build the server on local machine.  
WinSCP `out` and `package.json` into `~/server` on CentOS 8 machine.
```
cd /var/www/html/dory-capital/server
mv ~/server/* .
npm i
mkdir log tmp
sudo chmod 777 log tmp
```
### Run Server
```
pm2 start out/main.js
```
### Start Server On Machine Boot
```
pm2 startup
pm2 save
```

## PM2 Commands & Logs

### Check Server Status
```
pm2 list
```

### Stop Server
```
pm2 stop 0
```
### PM2 Logs Folder
```
ll ~/.pm2/logs
```