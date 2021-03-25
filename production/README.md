# Dory Capital - Production
## Create VM Instance
1. Go to Google Cloud console.
2. Go to `Compute Engine` -> `VM Instances` and select `CREATE INSTANCE`.
3. Select an `f1-micro` machine under `N1`.
4. Select `CentOS 7` OS Image.
5. Select `europe-west1-b` zone.

## SSH to Remote Machine
1. Install `MobaXtrem` and `WinSCP` on local machine.
2. Open `WinSCP` and go to `Tools -> Run PuTTYGen`.
3. Generate a private + public key pair.
4. Save `key-fingerprint.txt`, `private-key.ppk` and `public-key.txt` in `C:\Users\<USERNAME>\.ssh\dory-capital`
5. In Google Cloud console, add the publc key to `Compute Engine` -> `Metadata` -> `SSH Keys` (username = `yambakshi`)
6. Create a SSH session in `MobaXtrem`, provide the remote host IP, username (`yambakshi`) and private key (`Advanced SSH Settings`).
7. Create a SFTP session in `WinSCP`, provide `Host name`, `User name` and private key (`Advanced` -> `Authentication`).
8. Verify CentOS version:
```
cat /etc/centos-release
>>> CentOS Linux release 7.9.2009 (Core)
```

## GoDaddy
1. Login to you `GoDaddy` account.
2. Go to `My Domains` and select the website's domain.
3. Go to `DNS` -> `Manage Zones` and find your domain name.
4. Set the A Record value to your machine's IP.

## Configure Remote Machine
### YUM Repository
```
sudo yum update
```

### Folders
```
mkdir ~/server ~/client
mkdir /var/www/html/dory-capital/server
mkdir /var/www/html/dory-capital/client
```

### SELinux
Check SELinux status:
```
getenforce
>>> Enforced
```
```
vi /etc/selinux/config
...
SELINUX=permissive
...
```
Then reset machine.

### Environment Variables
Add the following environment variables to the end of `~/.bashrc`:
```
export NODE_ENV=production
export API_PORT=9356
export CORS_ORIGIN=http://127.0.0.1:4000
export MONGODB_URI_PREFIX=mongodb+srv
export MONGODB_USERNAME=yambakshi
export MONGODB_PASSWORD=<MONGODB_PASSWORD>
export MONGODB_HOST=<MONGODB_HOST>
export MONGODB_DB=dory-capital
export CLOUDINARY_CLOUD_NAME=dory-capital
export CLOUDINARY_API_KEY=<CLOUDINARY_API_KEY>
export CLOUDINARY_API_SECRET=<CLOUDINARY_API_SECRET>
```
Then run:
```
source ~/.bashrc
```

### NodeJS
**NVM**
```
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash
source ~/.bashrc
```

**NodeJS & NPM**
```
nvm install 10.15.3
node --version # Verify NodeJS installation (10.15.3)
npm --version # Verify NPM installation (6.4.1)
```
You can also verify it using `nvm` by running `nvm list` and see that 10.15.3 is selected.

### Nginx
```
sudo yum install epel-release
sudo yum install nginx
sudo systemctl start nginx # Start Nginx service
sudo systemctl status nginx # Verify Nginx service is started
sudo systemctl enable nginx # Configure Nginx to start on boot
```
Verify `Nginx` installation by navigating to your machine's IP using the browser.  
Configure `Nginx`:
```
sudo vi /etc/nginx/nginx.conf
```
Add/edit the following lines in the server block:
```
server_name    www.dory.capital;
```
```
root    /var/www/html/dory-capital/client/dist/dory-capital/browser;
```
```
gzip on;
gzip_comp_level    5;
gzip_min_length    256;
gzip_proxied       any;
gzip_vary          on;
gzip_types
    application/atom+xml
    application/javascript
    application/json
    application/rss+xml
    application/vnd.ms-fontobject
    application/x-font-ttf
    application/x-web-app-manifest+json
    application/xhtml+xml
    application/xml
    font/opentype
    image/svg+xml
    image/x-icon
    text/css
    text/plain
    text/x-component;
```
```
location / {
    proxy_pass http://127.0.0.1:4000;
}

location /api {
    proxy_pass http://127.0.0.1:9356/api;
}

location /dory-capital/socket.io {
    proxy_pass http://127.0.0.1:9356/dory-capital/socket.io;
}
```

### PM2
```
npm install pm2 -g
```

> Note:
In the output of the `pm2` installation you might see warnings about missing dependencies:
- bufferutil
- utf-8-validate

> Make sure to install them globally as well.

### CertBot
**Snap**
```
sudo yum install epel-release
sudo yum install snapd
sudo systemctl enable --now snapd.socket
sudo ln -s /var/lib/snapd/snap /snap
```
Either log out and back in again or restart your system to ensure snap’s paths are updated correctly.

**CertBot**
```
sudo snap install core; sudo snap refresh core # ensure that you have the latest version of snapd
sudo yum remove certbot # Install any previos version of CertBot
sudo snap install --classic certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot
```
Issue certificates:
```
sudo certbot --nginx
```