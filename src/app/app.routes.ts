import { Routes } from '@angular/router';
import {ChatTabComponent} from './component/chattab.component';
import {MainTabComponent} from './component/maintab.component';
import {UserTabComponent} from './component/usertab.component';
import {AppComponent} from './component/app.component';

export const routes: Routes = [
  {path: 'api/users/create', component: UserTabComponent},
  {path: 'api/users/getAll', component: UserTabComponent},
  {path: 'chat', component: ChatTabComponent},
  {path: 'main', component: MainTabComponent},
  {path: 'users', component: UserTabComponent}
];
