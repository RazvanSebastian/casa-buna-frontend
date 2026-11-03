import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { Store } from '@ngxs/store';
import { NotificationModel } from '../../../global/model/notification.model';
import { NotificationState } from '../../state/notification.state';
import { NotificationStateAction } from '../../state/notificiation.action';
import { NotificationDetailsDialog } from '../notification-details-dialog/notification-details-dialog';

@Component({
  imports: [DatePipe, MatButtonModule, MatListModule, MatPaginatorModule],
  selector: 'app-notification-list',
  styleUrl: './notification-list.scss',
  templateUrl: './notification-list.html',
})
export class NotificationList implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  protected readonly notifications = this.store.selectSignal(NotificationState.getNotifications);

  ngOnInit(): void {
    this.store.dispatch(new NotificationStateAction.GetNotifications(0));
  }

  protected onPageChange(event: PageEvent): void {
    this.store.dispatch(new NotificationStateAction.GetNotifications(event.pageIndex));
  }

  protected openNotification(notification: NotificationModel): void {
    this.dialog.open(NotificationDetailsDialog, { data: notification });
    if (!notification.read) {
      this.store.dispatch(new NotificationStateAction.MarkAsRead(notification.id));
    }
  }
}
