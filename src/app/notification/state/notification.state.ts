import { inject, Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext, Store } from '@ngxs/store';
import { map, tap } from 'rxjs';
import {
  NotificationModel,
  NotificationsPreviewModel,
} from '../../global/model/notification.model';
import { PageModel } from '../../global/model/page.model';
import { ToastNotifier } from '../../global/toast-notifier/toast-notififer';
import { UserStateAction } from '../../user/state/user.action';
import { NotificationService } from '../api/notification.service';
import { NotificationStateAction } from './notificiation.action';
import { NotificationStateModel } from './notificiation.model';

const defaults: NotificationStateModel = {
  notifications: null,
  preview: null,
};

@State({
  name: 'notificationState',
  defaults,
})
@Injectable()
export class NotificationState {
  private readonly notificationService = inject(NotificationService);
  private readonly toastNotifier = inject(ToastNotifier);
  private readonly store = inject(Store);

  static getPreview = createSelector(
    [NotificationState],
    (state: NotificationStateModel) => state.preview,
  );

  static getNotifications = createSelector(
    [NotificationState],
    (state: NotificationStateModel) => state.notifications,
  );

  @Action(NotificationStateAction.Subscribe)
  subscribe(ctx: StateContext<NotificationStateModel>) {
    this.notificationService
      .connect()
      .pipe(
        map((event) => JSON.parse(event.data) as NotificationModel),
        tap((notification) => {
          this.toastNotifier.success('Ai primit o noua notificare');
          ctx.patchState({
            preview: {
              unreadCounter: (ctx.getState().preview?.unreadCounter ?? 0) + 1,
              latest: [notification, ...(ctx.getState().preview?.latest ?? []).slice(0, 4)],
            },
          });
          this.updateOrFetchFirstPage(ctx, notification);
        }),
      )
      .subscribe();
  }

  @Action(NotificationStateAction.GetNotifications)
  getNotifications(
    ctx: StateContext<NotificationStateModel>,
    action: NotificationStateAction.GetNotifications,
  ) {
    return this.notificationService.findAll(action.page).pipe(
      tap((notifications) => {
        ctx.patchState({ notifications });
      }),
    );
  }

  @Action(NotificationStateAction.GetNotificationsPreview)
  getNotificationsPreview(ctx: StateContext<NotificationStateModel>) {
    return this.notificationService.getNotificationsPreview().pipe(
      tap((preview) => {
        ctx.patchState({ preview });
      }),
    );
  }

  @Action(NotificationStateAction.MarkAsRead)
  markAsRead(
    ctx: StateContext<NotificationStateModel>,
    action: NotificationStateAction.MarkAsRead,
  ) {
    return this.notificationService.markAsRead(action.id).pipe(
      tap(() => {
        const updatedPreview = {
          ...ctx.getState().preview,
          unreadCounter: (ctx.getState().preview?.unreadCounter ?? 0) - 1,
          latest: (ctx.getState().preview?.latest ?? []).map((notification) => {
            if (notification.id === action.id) {
              return { ...notification, read: true };
            } else {
              return { ...notification };
            }
          }),
        } as NotificationsPreviewModel;
        const updatedNotifications = {
          ...ctx.getState().notifications,
          content: (ctx.getState().notifications?.content ?? []).map((notification) => {
            if (notification.id === action.id) {
              return { ...notification, read: true };
            } else {
              return { ...notification };
            }
          }),
        } as PageModel<NotificationModel>;
        ctx.patchState({ preview: updatedPreview, notifications: updatedNotifications });
      }),
    );
  }

  @Action(UserStateAction.LogoutUser)
  logoutUser() {
    this.notificationService.disconnect();
  }

  @Action(NotificationStateAction.Test)
  test() {
    return this.notificationService.test();
  }

  private updateOrFetchFirstPage(
    ctx: StateContext<NotificationStateModel>,
    newNotification: NotificationModel,
  ) {
    let currentNotifications = ctx.getState().notifications;
    if (currentNotifications?.page.number === 0) {
      const newTotalElements = currentNotifications.page.totalElements + 1;
      currentNotifications = {
        ...currentNotifications,
        content: [
          newNotification,
          ...currentNotifications.content.slice(0, currentNotifications.content.length - 1),
        ],
        page: {
          ...currentNotifications.page,
          totalElements: newTotalElements,
          totalPages: Math.ceil(newTotalElements / currentNotifications.page.size),
        },
      };
    } else {
      this.store.dispatch(new NotificationStateAction.GetNotifications(1));
    }
  }
}
