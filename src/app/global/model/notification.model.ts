export interface NotificationModel {
  id: number;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  userId: number;
}

export interface NotificationsPreviewModel {
  unreadCounter: number;
  latest: NotificationModel[];
}
