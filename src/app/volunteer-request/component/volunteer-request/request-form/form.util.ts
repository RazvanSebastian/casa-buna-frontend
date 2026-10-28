import { signal } from '@angular/core';
import { FieldTree } from '@angular/forms/signals';
import { NewVolunteerRequestModel } from '../../../api/volunteer-request-client.model';
import { FormModel } from './form.model';

export const createDefaultFormModelSignal = () =>
  signal<FormModel>({
    selfDescription: '',
    educationalActivities: {
      onlineLearning: false,
      offlineLearning: false,
      practicalTraining: false,
      saturdayKindergarten: false,
      others: false,
      othersDescription: '',
    },
    educationalLevel: {
      kindergarten: false,
      primary: false,
      secondary: false,
      highSchool: false,
    },
    healthActivities: {
      sportActivities: false,
      medicalSupport: false,
      others: false,
      othersDescription: '',
    },
    itSupportActivities: {
      repairingComputers: false,
      childrenSupport: false,
      siteVisits: false,
      others: false,
      othersDescription: '',
    },
    logisticActivities: {
      deposit: false,
      kidsDriver: false,
      others: false,
      othersDescription: '',
    },
    otherActivities: '',
    age: 0,
    occupation: '',
    firstName: '',
    lastName: '',
    phone: '',
  });

export const mapToNewVolunteerRequestModel = (
  formValue: FieldTree<FormModel>,
): NewVolunteerRequestModel => {
  const educationActivities = collectSelectedLabels([
    [formValue.educationalActivities.offlineLearning().value(), 'Lectii offline'],
    [formValue.educationalActivities.onlineLearning().value(), 'Lectii online'],
    [formValue.educationalActivities.practicalTraining().value(), 'Ateliere'],
    [formValue.educationalActivities.saturdayKindergarten().value(), 'Sambata la gradinita'],
    [
      formValue.educationalActivities.others().value(),
      formValue.educationalActivities.othersDescription().value(),
    ],
  ]);

  const educationLevels = collectSelectedLabels([
    [formValue.educationalLevel.kindergarten().value(), 'Gradinita'],
    [formValue.educationalLevel.primary().value(), 'Ciclu primar'],
    [formValue.educationalLevel.secondary().value(), 'Ciclu gimnazial'],
    [formValue.educationalLevel.highSchool().value(), 'Liceu'],
  ]);

  const healthActivities = collectSelectedLabels([
    [formValue.healthActivities.sportActivities().value(), 'Activitati sportive'],
    [formValue.healthActivities.medicalSupport().value(), 'Asistenta medicala'],
    [
      formValue.healthActivities.others().value(),
      formValue.healthActivities.othersDescription().value(),
    ],
  ]);

  const itSupportActivities = collectSelectedLabels([
    [formValue.itSupportActivities.repairingComputers().value(), 'Repararea calculatorilor'],
    [formValue.itSupportActivities.childrenSupport().value(), 'Asistenta copiilor'],
    [formValue.itSupportActivities.siteVisits().value(), 'Vizite pe site'],
    [
      formValue.itSupportActivities.others().value(),
      formValue.itSupportActivities.othersDescription().value(),
    ],
  ]);

  const logisticActivities = collectSelectedLabels([
    [formValue.logisticActivities.deposit().value(), 'Depozitare'],
    [formValue.logisticActivities.kidsDriver().value(), 'Conducere copii'],
    [
      formValue.logisticActivities.others().value(),
      formValue.logisticActivities.othersDescription().value(),
    ],
  ]);

  return {
    educationActivities,
    educationLevels,
    healthActivities,
    itSupportActivities,
    logisticActivities,
    otherActivities: formValue.otherActivities().value(),
    occupation: formValue.occupation().value(),
    firstName: formValue.firstName().value(),
    lastName: formValue.lastName().value(),
    selfDescription: formValue.selfDescription().value(),
    age: formValue.age().value(),
    phone: formValue.phone().value(),
  } as NewVolunteerRequestModel;
};

const collectSelectedLabels = (items: ReadonlyArray<readonly [boolean, string]>): string[] =>
  items.filter(([selected]) => selected).map(([, label]) => label);
