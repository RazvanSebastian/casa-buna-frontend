import { VolunteerRequestStatus } from '../../../global/model/volunteer-request.model';

const VOLUNTEER_REQUESTS_ADMINISTRATION_STATE = '[VolunteerRequestsAdministrationState]';

export namespace VolunteerRequestsAdministrationStateAction {
  export class GetAll {
    static readonly type = `${VOLUNTEER_REQUESTS_ADMINISTRATION_STATE} GetAll`;

    constructor(
      public page: number,
      public status: VolunteerRequestStatus,
      public requestorEmail?: string,
    ) {}
  }

  export class UpdateStatus {
    static readonly type = `${VOLUNTEER_REQUESTS_ADMINISTRATION_STATE} Update Status`;

    constructor(
      public requestId: number,
      public status: VolunteerRequestStatus,
    ) {}
  }
}
