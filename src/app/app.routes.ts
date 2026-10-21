import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'user-administration',
    loadChildren: () => import('./user-administration/routes').then((m) => m.ROUTES),
  },
];
