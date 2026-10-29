import { Component, computed, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Store } from '@ngxs/store';
import {
  VolunteerRequestStatus,
  VolunteerRequestWithUserResponse,
} from '../../../../global/model/volunteer-request.model';
import { VolunteerRequestsAdministrationStateAction } from '../../../state/volunteer-requests-administration/volunteer-requests-administration.action';
import { VolunteerRequestsAdministrationState } from '../../../state/volunteer-requests-administration/volunteer-requests-administration.state';
import { DialogRequestInfo } from '../dialog-request-info/dialog-request-info';
import { FiltersChange } from './request-table-filters/model';
import { RequestTableFilters } from './request-table-filters/request-table-filters';

@Component({
  imports: [MatTableModule, MatPaginator, MatIconModule, MatButtonModule, RequestTableFilters],
  selector: 'app-request-table',
  styleUrl: './request-table.scss',
  templateUrl: './request-table.html',
})
export class RequestTable implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  protected readonly displayedColumns = computed(() => {
    let columns = ['firstName', 'lastName', 'email', 'phone', 'status', 'detailsAction'];
    if (this.currentStatusFilter() === VolunteerRequestStatus.PENDING) {
      columns.push('approveAction', 'declineAction');
    }
    return columns;
  });

  protected readonly requestPage = this.store.selectSignal(
    VolunteerRequestsAdministrationState.getRequestPage,
  );

  protected readonly currentStatusFilter = this.store.selectSignal(
    VolunteerRequestsAdministrationState.getCurrentStatusFilter,
  );

  ngOnInit(): void {
    this.store.dispatch(
      new VolunteerRequestsAdministrationStateAction.GetAll(1, VolunteerRequestStatus.PENDING),
    );
  }

  protected onFiltersChange($event: FiltersChange) {
    this.store.dispatch(
      new VolunteerRequestsAdministrationStateAction.GetAll(1, $event.status, $event.email),
    );
  }

  protected onOpenDialogRequestInfo(request: VolunteerRequestWithUserResponse) {
    this.dialog.open(DialogRequestInfo, { data: request });
  }

  protected onPageChange(event: PageEvent) {
    this.store.dispatch(
      new VolunteerRequestsAdministrationStateAction.GetAll(
        event.pageIndex,
        VolunteerRequestStatus.PENDING,
      ),
    );
  }

  protected onApproveRequest(request: VolunteerRequestWithUserResponse) {
    this.store.dispatch(
      new VolunteerRequestsAdministrationStateAction.UpdateStatus(
        request.id,
        VolunteerRequestStatus.APPROVED,
      ),
    );
  }

  protected onDeclineRequest(request: VolunteerRequestWithUserResponse) {
    this.store.dispatch(
      new VolunteerRequestsAdministrationStateAction.UpdateStatus(
        request.id,
        VolunteerRequestStatus.APPROVED,
      ),
    );
  }
}
