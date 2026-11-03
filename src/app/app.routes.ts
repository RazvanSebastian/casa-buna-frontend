import { Routes } from '@angular/router';
import { RoleName } from './global/model/user.model';
import { canActivateByRoleGuard, canActivateOnboarding } from './global/security/can-activate';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./global/component/home/home').then((m) => m.Home),
  },
  {
    path: 'notifications',
    loadComponent: () =>
      import('./notification/component/notification-list/notification-list').then(
        (m) => m.NotificationList,
      ),
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
    canActivate: [canActivateOnboarding],
  },
];
