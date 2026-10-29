import { PageModel } from '../../../global/model/page.model';
import {
  VolunteerRequestStatus,
  VolunteerRequestWithUserResponse,
} from '../../../global/model/volunteer-request.model';

export interface VolunteerRequestsAdministrationStateModel {
  volunteerRequestsPage: PageModel<VolunteerRequestWithUserResponse> | null;
  statusFilter: VolunteerRequestStatus;
}
