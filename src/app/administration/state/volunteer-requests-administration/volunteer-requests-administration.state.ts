import { inject, Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext, Store } from '@ngxs/store';
import { switchMap, tap } from 'rxjs';
import { VolunteerRequestStatus } from '../../../global/model/volunteer-request.model';
import { VolunteerRequestsAdministrationClientService } from '../../api/volunteer-requests-administration-client.service';
import { VolunteerRequestsAdministrationStateAction } from './volunteer-requests-administration.action';
import { VolunteerRequestsAdministrationStateModel } from './volunteer-requests-administration.model';

const defaults: VolunteerRequestsAdministrationStateModel = {
  volunteerRequestsPage: null,
  statusFilter: VolunteerRequestStatus.PENDING,
};

@State({
  name: 'volunteerRequestsAdministration',
  defaults,
})
@Injectable()
export class VolunteerRequestsAdministrationState {
  private readonly store = inject(Store);
  private readonly volunteerRequestsAdministrationClientService = inject(
    VolunteerRequestsAdministrationClientService,
  );

  static getRequestPage = createSelector(
    [VolunteerRequestsAdministrationState],
    (state: VolunteerRequestsAdministrationStateModel) => state.volunteerRequestsPage,
  );

  static getCurrentStatusFilter = createSelector(
    [VolunteerRequestsAdministrationState],
    (state: VolunteerRequestsAdministrationStateModel) => state.statusFilter,
  );

  @Action(VolunteerRequestsAdministrationStateAction.GetAll)
  getAll(
    ctx: StateContext<VolunteerRequestsAdministrationStateModel>,
    action: VolunteerRequestsAdministrationStateAction.GetAll,
  ) {
    return this.volunteerRequestsAdministrationClientService
      .getAllVolunteerRequests(action.page, action.status, action.requestorEmail)
      .pipe(
        tap((volunteerRequestsPage) =>
          ctx.patchState({ volunteerRequestsPage, statusFilter: action.status }),
        ),
      );
  }

  @Action(VolunteerRequestsAdministrationStateAction.UpdateStatus)
  updateStatus(
    ctx: StateContext<VolunteerRequestsAdministrationStateModel>,
    action: VolunteerRequestsAdministrationStateAction.UpdateStatus,
  ) {
    const currentStatusFilter = ctx.getState().statusFilter;
    return this.volunteerRequestsAdministrationClientService
      .updateStatus(action.requestId, action.status)
      .pipe(
        switchMap(() =>
          this.store.dispatch(
            new VolunteerRequestsAdministrationStateAction.GetAll(1, currentStatusFilter),
          ),
        ),
      );
  }
}
