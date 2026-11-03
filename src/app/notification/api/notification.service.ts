import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import {
  NotificationModel,
  NotificationsPreviewModel,
} from '../../global/model/notification.model';
import { PageModel } from '../../global/model/page.model';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private connection: {
    eventSource: EventSource;
    observer: Subscriber<MessageEvent<string>>;
  } | null = null;
  private readonly http = inject(HttpClient);

  connect() {
    return new Observable<MessageEvent<string>>((observer) => {
      this.disconnect();

      const eventSource = new EventSource('/api/notifications/subscribe', {
        withCredentials: true,
      });

      const connection = { eventSource, observer };
      this.connection = connection;

      eventSource.onmessage = (event) => observer.next(event);
      eventSource.onerror = (error) => observer.error(error);

      return () => {
        eventSource.close();
        if (this.connection === connection) {
          this.connection = null;
        }
      };
    });
  }

  disconnect(): void {
    const connection = this.connection;
    if (!connection) {
      return;
    }

    this.connection = null;
    connection.eventSource.close();
    connection.observer.complete();
  }

  findAll(page: number) {
    return this.http.get<PageModel<NotificationModel>>('/api/notifications', {
      params: { page },
    });
  }

  getNotificationsPreview() {
    return this.http.get<NotificationsPreviewModel>('/api/notifications/preview');
  }

  markAsRead(id: number) {
    return this.http.patch<void>(`/api/notifications/${id}/read`, {});
  }

  test() {
    return this.http.get('/api/notifications/test');
  }
}
