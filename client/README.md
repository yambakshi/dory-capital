# Dory Capital - Client

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy

### Prerequisites
```
mkdir ~/client
mkdir /var/www/html/dory-capital
npm install pm2 -g
```

**NOTE**  
In the output of the `pm2` installation you might see warnings about missing dependencies:
- bufferutil
- utf-8-validate

Make sure to install them globally as well.

### Manual Deployment
Run `npm run build:ssr` to build the project in SSR mode on local machine.  
WinSCP `dist/dory-capital/*` to `~/client` on CentOS 8 machine.
```
cd /var/www/html/dory-capital
mkdir client/dist/dory-capital
sudo mv ~/client/* /var/www/html/dory-capital/client/dist/dory-capital
cd client
```

### Run Client
```
pm2 start dist/dory-capital/server/main.js
```

Check client status
```
pm2 list
```

Stop client
```
pm2 stop 1
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

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
