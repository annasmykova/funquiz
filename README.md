# Fun Quiz App

It consists 2 projects:
1. `client` - React web app 
2. `server` - server app that also is divided into 2 folders:
   1. `api` - Fun Quiz API
   2. `db` - Postgres DB config and structure

Steps to run server project:

## Server 

Go to server folder. 

First of all you need to run db in docker.

### Postgres DB

1. COPY .env.example to .env file
2. install docker if you haven't yet
3. run docker image by running `docker compose up` in terminal


### API

1. Run `npm i` command
2. Run local `npm run start:dev` command (Be sure that you have `nodemon` installed)


## React App

1. Run `npm i` command
2. Run local `npm start`

