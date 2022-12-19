# vpn-server ui

This is the front end page to allow users to manage thier services, it is coupled with the go libraries in the root of the project

### Build

   In the project api/docker/build.dockerfile has all the commands needed to build this on top of npm.
   it can be built using 'docker-compose -f docker-compose.yml -f docker-compose-override-local.yml build accounts-api' from the the api directory
   Since this is all front-end react it can be built with:
   `npm run build` in the api/ui directory.  this will place the static files in a build directory

### Developing

  The project can run from `npm start` but it will still look for the backend apis.  For development purposes we can turn up the accounts_api via
  `docker-compose -f docker-compose.yml -f docker-compose-override-local.yml up accounts-api` and modify the account_service.js to point the
  accountserver with `http://localhost:8080/api/vi`

  