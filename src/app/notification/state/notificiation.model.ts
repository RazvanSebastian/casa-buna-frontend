import {
  NotificationModel,
  NotificationsPreviewModel,
} from '../../global/model/notification.model';
import { PageModel } from '../../global/model/page.model';

export interface NotificationStateModel {
  notifications: PageModel<NotificationModel> | null;
  preview: NotificationsPreviewModel | null;
}
