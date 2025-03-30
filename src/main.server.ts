//import { APP_BASE_HREF } from '@angular/common';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

import {AppModel} from './app/model/app.model';
import {GetUsersResponse, IGetUsersResponse, IUser, IUserResponse, User, UserResponse} from './app/model/user.model';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();                      // Primary app engine
const appModel = new AppModel();                    // Primary server side model
const port = process.env['PORT'] || 4000;

const cors = require('cors');

app.route('/users/getAll')
  .get((req, res) => {

    console.log('Request:  api/users/getAll');

    //appModel.users = [new User(0, 'albees')];

    // Response
    //res.json(new GetUsersResponse(appModel.users));

    res.send(new GetUsersResponse([new User(0, 'albees')]));
  });

app.get('/users/create/:userName', (req, res, next) => {

  console.log('Request:  api/users/create');

  // Request: Store user
  appModel.users.push(new User(0, req.params.userName));

  res.status(404);

  // Response
  //res.send(new UserResponse(req.body.user.id, true, 'User Created Successfully:  ' + req.body.user.name));
});

/**
 * Start the server if this module is the main entry point.
 * The server listens on the port defined by the `PORT` environment variable, or defaults to 4000.
 */
app.listen(port, () => {

  let url: string = 'http://localhost:' + port;
  console.log(`Node Express server listening on ` + url);

  var corsOptions = {
    origin: url,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

  app.use(cors(corsOptions));
  console.log(`Node Express: CORS applied on ${url}`);
});

export default app;
