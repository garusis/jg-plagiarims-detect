# jg-plagiarims-detect
A simple tool to simplify plagiarims checking in documents using sources like Google or Google Academics.

## Requirements
In development you need install [Yarn](https://yarnpkg.com/en/)(>=0.24), [NodeJS](https://nodejs.org)(>=4), [GIT](https://git-scm.com) and [Docker](https://www.docker.com/)(>=17).

## For development
Emerge-uw use docker for development. The dev.Dockerfile can be used to build a development environment with all required tools and settings.

### Important
To use the docker dev environment you need add in the project root and .env file with the environment variables for the local env.
The basic variables and its values can be found in *Google Drive* in `Emerge_microservices_env/${project_name}/local` 
  
### How to use
You can use the npm tasks to build and run the docker container and also get a bash terminal inside the container.
 
To build and run the container
```
yarn run d-build:dev
yarn run d-run:dev
```
once executed you will have the dev environment permanently and you can get a bash terminal to run the node server or do anything else using
```
yarn run d-bash:dev
```
in the terminal you can start the node server with `npm start` and test the API since [localhost:3000](http://localhost:3000)

### How debug

If you want **debug** you need [jq](https://stedolan.github.io/jq/) and [curl](https://curl.haxx.se/)

To start in debug mode, first stop the current docker environment (`yarn run d-stop:dev`) and then run `yarn run d-debug:dev` and open the url in Google Chrome
