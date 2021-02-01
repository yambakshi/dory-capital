# DoryCapital

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 9.1.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Deploy

Run `npm run build:ssr` to build the project in SSR mode.
WinSCP build to CentOS 8 machine.
Move server and client folders to /var/www/html/dory-capital
cd /var/www/html/dory-capital

Server
cd server
sudo touch nohup.out
sudo chmod 777 nohup.out
nohup node out/main.js > nohup.out 2>&1 &

Client
cd client
sudo touch nohup.out
sudo chmod 777 nohup.out
nohup node dist/dory-capital/server/main.js > nohup.out 2>&1 &

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
