import { VolunteerRequestModel } from '../api/volunteer-request-client.model';

export interface VolunteerRequestStateModel {
  request: VolunteerRequestModel | null;
}
