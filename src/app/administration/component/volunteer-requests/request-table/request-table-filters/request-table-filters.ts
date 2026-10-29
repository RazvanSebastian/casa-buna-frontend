import { Component, output, signal } from '@angular/core';
import { form, FormField } from '@angular/forms/signals';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { VolunteerRequestStatus } from '../../../../../global/model/volunteer-request.model';
import { FiltersChange } from './model';

type FormModel = {
  email: string;
  status: VolunteerRequestStatus;
};

@Component({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormField,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  selector: 'app-request-table-filters',
  styleUrl: './request-table-filters.scss',
  templateUrl: './request-table-filters.html',
})
export class RequestTableFilters {
  private readonly formTemplate = signal<FormModel>({
    email: '',
    status: VolunteerRequestStatus.PENDING,
  });
  protected readonly form = form(this.formTemplate);

  protected readonly filtersChange = output<FiltersChange>();

  protected readonly statuses = Object.values(VolunteerRequestStatus);

  protected onClickSearch() {
    this.filtersChange.emit({
      email: this.form.email().value(),
      status: this.form.status().value(),
    });
  }
}
