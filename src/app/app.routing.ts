import { Routes } from '@angular/router';
import { FullComponent } from './layouts/full.component';
export const AppRoutes: Routes = [{
  path: '',
  component: FullComponent,
  children: [
    {
      path: '',
      redirectTo: '/',
      pathMatch: 'full'
    },
    {
      path: '',
      loadChildren: () => import('./starter/starter.module').then(m => m.StarterModule)
    },
    {
      path: '',
      loadChildren:
        () => import('./views/views.module').then(m => m.ViewsModule)
    }
  ]
}];