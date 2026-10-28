import { Component, inject, OnInit } from '@angular/core';

import { Store } from '@ngxs/store';
import { VolunteerRequestStateAction } from '../../state/volunteer-request.action';
import { VolunteerRequestState } from '../../state/volunteer-request.state';
import { RequestForm } from './request-form/request-form';
import { RequestPreview } from './request-preview/request-preview';

@Component({
  imports: [RequestPreview, RequestForm],
  selector: 'app-volunteer-request',
  styleUrl: './volunteer-request.scss',
  templateUrl: './volunteer-request.html',
})
export class VolunteerRequest implements OnInit {
  private readonly store = inject(Store);

  protected readonly request = this.store.selectSignal(VolunteerRequestState.getRequestInPending);

  ngOnInit(): void {
    this.store.dispatch(new VolunteerRequestStateAction.GetRequestInPending());
  }
}
