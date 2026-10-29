import { VolunteerRequestStatus } from '../../../../../global/model/volunteer-request.model';

export interface FiltersChange {
  email: string;
  status: VolunteerRequestStatus;
}
