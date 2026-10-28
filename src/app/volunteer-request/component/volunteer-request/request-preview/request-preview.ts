import { Component, input } from '@angular/core';
import { VolunteerRequestModel } from '../../../api/volunteer-request-client.model';

@Component({
  imports: [],
  selector: 'app-request-preview',
  styleUrl: './request-preview.scss',
  templateUrl: './request-preview.html',
})
export class RequestPreview {
  readonly request = input.required<VolunteerRequestModel>();
}
