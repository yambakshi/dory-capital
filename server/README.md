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
WinSCP build to CentOS 8 machine.
Move server folder to /var/www/html/dory-capital
`cd /var/www/html/dory-capital/server`
`sudo touch nohup.out`
`sudo chmod 777 nohup.out`
`nohup node out/main.js > nohup.out 2>&1 &`