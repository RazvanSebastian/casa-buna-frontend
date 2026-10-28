import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { RoleName } from './global/model/user/user.model';
import { canActivateByRoleGuard } from './global/security/can-activate-by-role';
import { VolunteerRequestState } from './volunteer-request/state/volunteer-request.state';

export const routes: Routes = [
  {
    path: 'user-administration',
    loadChildren: () => import('./user-administration/routes').then((m) => m.ROUTES),
    canActivate: [canActivateByRoleGuard],
    data: { roles: [RoleName.ROLE_ADMIN] },
  },
  {
    path: 'onboarding',
    loadChildren: () => import('./volunteer-request/routes').then((m) => m.ROUTES),
    providers: [provideStates([VolunteerRequestState])],
    canActivate: [canActivateByRoleGuard],
  },
];
