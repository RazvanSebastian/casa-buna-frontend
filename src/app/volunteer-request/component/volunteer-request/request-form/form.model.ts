export interface FormModel {
  selfDescription: string;
  educationalActivities: {
    onlineLearning: boolean;
    offlineLearning: boolean;
    practicalTraining: boolean;
    saturdayKindergarten: boolean;
    others: boolean;
    othersDescription: string;
  };
  educationalLevel: {
    kindergarten: boolean;
    primary: boolean;
    secondary: boolean;
    highSchool: boolean;
  };
  healthActivities: {
    sportActivities: boolean;
    medicalSupport: boolean;
    others: boolean;
    othersDescription: string;
  };
  itSupportActivities: {
    repairingComputers: boolean;
    childrenSupport: boolean;
    siteVisits: boolean;
    others: boolean;
    othersDescription: string;
  };
  logisticActivities: {
    deposit: boolean;
    kidsDriver: boolean;
    others: boolean;
    othersDescription: string;
  };
  otherActivities: string;
  firstName: string;
  lastName: string;
  phone: string;
  age: number;
  occupation: string;
}
