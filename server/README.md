## Setup
Initial Login URI
`mongodb://127.0.0.1:27017`

Create DB
`use dory-capital`

Create Collection
`db.createCollection("paragraphs")`

Create 'dbAdmin' User
`db.createUser({ user: "yambakshi", pwd: "1234", roles: [{ role: "dbAdmin", db: "dory-capital" }]})`

Drop user
`db.dropUser("yambakshi")`

## Deploy

Run `npm run build` to build the server.
WinSCP `out` and `package.json` to `~/server` on CentOS 8 machine.
`cd ~/server`
`npm i`
`mv ~/server/* /var/www/html/dory-capital/server`
`cd /var/www/html/dory-capital/server`
`sudo touch nohup.out`
`sudo chmod 777 nohup.out`
`sudo chown -R root:root ./*`
`nohup node out/main.js > nohup.out 2>&1 &`