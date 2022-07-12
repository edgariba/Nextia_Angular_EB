import { Routes } from '@angular/router';
import { ActionsUsersComponent } from './userComponents/actions-users/actions-users.component';
import { UsersComponent } from './userComponents/users/users.component';

export const ViewsRoutes: Routes = [
  {
    path: 'usuarios',
    children: [
      { path: '', component: UsersComponent },
      { path: 'editar/:hash_user', component: ActionsUsersComponent},
      { path: 'nuevo/:hash_device', component: ActionsUsersComponent},
    ]
  }
];
