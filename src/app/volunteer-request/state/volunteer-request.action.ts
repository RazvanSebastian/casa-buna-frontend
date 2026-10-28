import { NewVolunteerRequestModel } from '../api/volunteer-request-client.model';

const VOLUNTEER_REQUEST_STATE = '[VolunteerRequestState]';

export namespace VolunteerRequestStateAction {
  export class GetRequestInPending {
    static readonly type = `${VOLUNTEER_REQUEST_STATE} Get Request In Pending`;
  }

  export class CreateVolunteerRequest {
    static readonly type = `${VOLUNTEER_REQUEST_STATE} Create Volunteer Request`;

    constructor(public request: NewVolunteerRequestModel) {}
  }
}
