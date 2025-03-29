import { APP_BASE_HREF } from '@angular/common';
import { CommonEngine, isMainModule } from '@angular/ssr/node';
import express from 'express';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import bootstrap from './main.server';

import {AppModel} from './app/model/app.model';
import {IGetUsersResponse, IUser, IUserResponse, User} from './app/model/user.model';
import {UserService} from './app/service/user.service';

const serverDistFolder = dirname(fileURLToPath(import.meta.url));
const browserDistFolder = resolve(serverDistFolder, '../browser');
const indexHtml = join(serverDistFolder, 'index.server.html');

const app = express();                      // Primary app engine
const appModel = new AppModel();            // Primary server side model
const commonEngine = new CommonEngine();    // Primary server side rendering engine

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
app.get(
  '**',
  express.static(browserDistFolder, {
    maxAge: '1y',
    index: 'index.html'
  }),
);

/**
 * Handle all other requests by rendering the Angular application.
 */
app.get('**', (req, res, next) => {
  const { protocol, originalUrl, baseUrl, headers } = req;

  commonEngine
    .render({
      bootstrap,
      documentFilePath: indexHtml,
      url: `${protocol}://${headers.host}${originalUrl}`,
      publicPath: browserDistFolder,
      providers: [{ provide: APP_BASE_HREF, useValue: baseUrl }],
    })
    .then((html) => res.send(html))
    .catch((err) => next(err));
});

/**
 * User API (get / post)
 */
app.get('/api/users/getAll', async (req, res) => {

  console.log('Request:  api/users/getAll');

  // Response
  res.send(appModel.users);

});

app.post('/api/users/create', (req, res, next) => {

  console.log('Request:  api/users/create');

  // Request: Store user
  appModel.users.push(req.body.user);

  // Response
  res.send({
      id: req.body.user.id,
      success: true,
      message: 'User Created Successfully:  ' + req.body.user.name
  });

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

export default app;
