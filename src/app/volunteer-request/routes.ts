import { Routes } from '@angular/router';
import { provideStates } from '@ngxs/store';
import { VolunteerRequest } from './component/volunteer-request/volunteer-request';
import { VolunteerRequestState } from './state/volunteer-request.state';

export const ROUTES: Routes = [
  {
    path: '',
    component: VolunteerRequest,
    providers: [provideStates([VolunteerRequestState])],
  },
];
