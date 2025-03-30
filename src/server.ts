import {
  AngularNodeAppEngine,
  createNodeRequestHandler,
  isMainModule,
  writeResponseToNodeResponse,
} from '@angular/ssr/node';

import express from 'express';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Container, Token } from 'typedi';
import { GetUsersResponse, User, IUser, UserResponse } from './app/model/user.model';
import {DataModel} from './server/model/server.datamodel';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');

const app = express();
const angularApp = new AngularNodeAppEngine();

// TODO: Create the In Memory Database using angular's component model
const serverDb: DataModel = new DataModel();

// TODO: For now, just use the typeDI container
Container.set(DataModel, serverDb);

/**
 * Example Express Rest API endpoints can be defined here.
 * Uncomment and define endpoints as necessary.
 *
 * Example:
 * ```ts
 * app.get('/api/**', (req, res) => {
 *   // Handle API request
 * });
 * ```
 */

/**
 * Serve static files from /browser
 */
app.use(
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: false,
    redirect: false,
  }),
);

app.get('/users/getAll', async (req, res) => {

  console.log('Server Request:  /users/getAll');

  let db = Container.get(DataModel);

  res.send(new GetUsersResponse(db.users));
});

app.get('/users/create/:userName', async (req, res) => {

  console.log(`Server Request:  /users/create/${req.params.userName}`);

  let db = Container.get(DataModel);

  // Check for duplicate users
  if (db.users.some((value) =>{
    return value.name == req.params.userName;
  }))
  {
    res.send(new UserResponse(0, true, `User Creation Failed:  Duplicate user already exists`));
    return;
  }

  // Add User to in memory database
  db.users.push(new User(db.users.length, req.params.userName));

  res.send(new UserResponse(0, true, `User Created ${db.users[db.users.length - 1]}`));
});

/**
 * Handle all other requests by rendering the Angular application.
 */
app.use('/**', (req, res, next) => {
  angularApp
    .handle(req)
    .then((response) =>
      response ? writeResponseToNodeResponse(response, res) : next(),
    )
    .catch(next);
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
if (isMainModule(import.meta.url)) {
  const port = process.env['PORT'] || 4000;
  app.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

/**
 * Request handler used by the Angular CLI (for dev-server and during build) or Firebase Cloud Functions.
 */
export const reqHandler = createNodeRequestHandler(app);
