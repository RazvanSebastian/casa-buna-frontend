import { DatePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { NotificationModel } from '../../../global/model/notification.model';

@Component({
  imports: [DatePipe, MatButtonModule, MatDialogModule],
  selector: 'app-notification-details-dialog',
  templateUrl: './notification-details-dialog.html',
})
export class NotificationDetailsDialog {
  protected readonly notification = inject<NotificationModel>(MAT_DIALOG_DATA);
}
