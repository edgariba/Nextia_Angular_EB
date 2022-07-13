import { Routes } from '@angular/router';
import { FilesComponent } from './filesComponentes/files/files.component';
import { ActionsUsersComponent } from './userComponents/actions-users/actions-users.component';
import { UsersComponent } from './userComponents/users/users.component';

export const ViewsRoutes: Routes = [
  {
    path: 'usuarios',
    children: [
      { path: '', component: UsersComponent },
      { path: 'editar/:hashUser', component: ActionsUsersComponent, data: { ruta: 'editar' } },
      { path: 'nuevo', component: ActionsUsersComponent, data: { ruta: 'nuevo' } },
    ]
  },
  {
    path: 'archivos',
    component: FilesComponent
  },
];
