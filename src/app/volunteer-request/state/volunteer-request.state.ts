import { inject, Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { tap } from 'rxjs';
import { VolunteerRequestClientService } from '../api/volunteer-request-client.service';
import { VolunteerRequestStateAction } from './volunteer-request.action';
import { VolunteerRequestStateModel } from './volunteer-request.model';

const defaults: VolunteerRequestStateModel = {
  request: null,
};

@State({
  name: 'volunteerRequestState',
  defaults,
})
@Injectable()
export class VolunteerRequestState {
  private readonly volunteerRequestClientService = inject(VolunteerRequestClientService);

  static getRequestInPending = createSelector(
    [VolunteerRequestState],
    (state: VolunteerRequestStateModel) => state.request,
  );

  @Action(VolunteerRequestStateAction.GetRequestInPending)
  getRequestInPending(ctx: StateContext<VolunteerRequestStateModel>) {
    return this.volunteerRequestClientService
      .getRequestInPending()
      .pipe(tap((request) => ctx.patchState({ request })));
  }

  @Action(VolunteerRequestStateAction.CreateVolunteerRequest)
  createVolunteerRequest(
    ctx: StateContext<VolunteerRequestStateModel>,
    action: VolunteerRequestStateAction.CreateVolunteerRequest,
  ) {
    return this.volunteerRequestClientService
      .createRequest(action.request)
      .pipe(tap((request) => ctx.patchState({ request })));
  }
}
