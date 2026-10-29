import { Routes } from '@angular/router';
import { RoleName } from './global/model/user.model';
import { canActivateByRoleGuard } from './global/security/can-activate-by-role';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./global/component/home/home').then((m) => m.Home),
  },
  {
    path: 'administration',
    loadChildren: () => import('./administration/routes').then((m) => m.ROUTES),
    canActivate: [canActivateByRoleGuard],
    data: { roles: [RoleName.ROLE_ADMIN] },
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./volunteer-request/routes').then((m) => m.ROUTES),
    canActivate: [canActivateByRoleGuard],
  },
];
