## Deploy

Run `npm run build` to build the server.
WinSCP build to CentOS 8 machine.
Move server folder to /var/www/html/dory-capital
cd /var/www/html/dory-capital
cd server
sudo touch nohup.out
sudo chmod 777 nohup.out
nohup node out/main.js > nohup.out 2>&1 &