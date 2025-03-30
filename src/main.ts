import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/component/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

/*
*     Server Side (Trying to avoid configuration issues)
* */
/*
import { APP_BASE_HREF } from '@angular/common';
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


