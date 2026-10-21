import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { DashboardComponent } from './component/dashboard/dashboard';
import { UserAdministrationState } from './state/user-administration.state';

export const ROUTES: Routes = [
  {
    path: '',
    component: DashboardComponent,
    providers: [provideStates([UserAdministrationState])],
  },
];
