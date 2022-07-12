import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full.component';
export const AppRoutes: Routes = [{
  path: '',
  component: FullComponent,
  children: [
    {
      path: '',
      redirectTo: '/login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
    },
    {
      path: '',
      loadChildren:
        () => import('./views/views.module').then(m => m.ViewsModule)
    }
  ]
}];