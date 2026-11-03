import { DatePipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';
import { Store } from '@ngxs/store';
import { NotificationModel } from '../../../global/model/notification.model';
import { NotificationState } from '../../state/notification.state';
import { NotificationStateAction } from '../../state/notificiation.action';
import { NotificationDetailsDialog } from '../notification-details-dialog/notification-details-dialog';

@Component({
  imports: [
    DatePipe,
    MatBadgeModule,
    MatButtonModule,
    MatIconModule,
    MatMenuModule,
    MatListModule,
    RouterLink,
  ],
  selector: 'app-notifications',
  styleUrl: './notifications.scss',
  templateUrl: './notifications.html',
})
export class Notifications implements OnInit {
  private readonly store = inject(Store);
  private readonly dialog = inject(MatDialog);

  protected readonly preview = this.store.selectSignal(NotificationState.getPreview);

  ngOnInit(): void {
    this.store.dispatch(new NotificationStateAction.Subscribe());
    this.store.dispatch(new NotificationStateAction.GetNotificationsPreview());
  }

  protected openNotification(notification: NotificationModel, menuTrigger: MatMenuTrigger): void {
    menuTrigger.closeMenu();
    this.dialog.open(NotificationDetailsDialog, { data: notification });
    if (!notification.read) {
      this.store.dispatch(new NotificationStateAction.MarkAsRead(notification.id));
    }
  }
}
