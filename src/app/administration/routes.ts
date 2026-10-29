import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { DashboardComponent } from './component/dashboard/dashboard';
import { UserAdministrationState } from './state/user-administration/user-administration.state';
import { VolunteerRequestsAdministrationState } from './state/volunteer-requests-administration/volunteer-requests-administration.state';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      {
        path: 'users',
        loadComponent: () =>
          import('./component/users/user-table/user-table').then((m) => m.UserTable),
        providers: [provideStates([UserAdministrationState])],
      },
      {
        path: 'volunteer-requests',
        loadComponent: () =>
          import('./component/volunteer-requests/request-table/request-table').then(
            (m) => m.RequestTable,
          ),
        providers: [provideStates([VolunteerRequestsAdministrationState])],
      },
    ],
  },
];
