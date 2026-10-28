import { Component, inject } from '@angular/core';
import { form, FormField, required } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Store } from '@ngxs/store';
import { VolunteerRequestStateAction } from '../../../state/volunteer-request.action';
import { createDefaultFormModelSignal, mapToNewVolunteerRequestModel } from './form.util';

@Component({
  imports: [FormField, MatFormFieldModule, MatInputModule, MatCheckboxModule, MatButtonModule],
  selector: 'app-request-form',
  styleUrl: './request-form.scss',
  templateUrl: './request-form.html',
})
export class RequestForm {
  private readonly store = inject(Store);

  protected readonly formModel = createDefaultFormModelSignal();
  protected readonly form = form(this.formModel, (schemaPath) => {
    required(schemaPath.selfDescription, { message: 'Descrierea este obligatorie' });
    required(schemaPath.age, { message: 'Varsta este obligatorie' });
    required(schemaPath.firstName, { message: 'Prenumele este obligatoriu' });
    required(schemaPath.lastName, { message: 'Numele este obligatoriu' });
    required(schemaPath.phone, { message: 'Ocupatia este obligatorie' });
  });

  onSubmit() {
    const newVolunteerRequest = mapToNewVolunteerRequestModel(this.form);
    this.store.dispatch(
      new VolunteerRequestStateAction.CreateVolunteerRequest(newVolunteerRequest),
    );
  }
}
