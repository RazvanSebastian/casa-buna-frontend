import { UserDetailsMode } from './user.model';

export interface VolunteerRequestWithUserResponse extends VolunteerRequestModel {
  id: number;
  status: VolunteerRequestStatus;
  requestor: UserDetailsMode;
  approver: UserDetailsMode;
}

export interface VolunteerRequestModel extends VolunteerRequest {
  id: number;
  status: VolunteerRequestStatus;
  requestorId: number;
}

export enum VolunteerRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  REJECTED = 'REJECTED',
}

export interface NewVolunteerRequestModel extends VolunteerRequest {}

interface VolunteerRequest {
  selfDescription: string;
  educationActivities: string[];
  educationLevels: string[];
  healthActivities: string[];
  itSupportActivities: string[];
  logisticActivities: string[];
  otherActivities: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
  occupation: string;
}
