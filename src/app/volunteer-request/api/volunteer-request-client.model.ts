export interface VolunteerRequestModel extends VolunteerRequest {
  id: number;
  status: VolunteerRequestStatus;
  requestorId: number;
}

export enum VolunteerRequestStatus {
  PENDING = 'PENDING',
  APPROVED = 'APPROVED',
  DECLINED = 'DECLINED',
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
