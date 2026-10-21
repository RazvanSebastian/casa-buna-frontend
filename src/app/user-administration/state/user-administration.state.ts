import { inject, Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext } from '@ngxs/store';
import { catchError, of, tap, throwError } from 'rxjs';
import { PageModel } from '../../global/model/page.model';
import { UserModel } from '../../global/model/user/user.model';
import { NotificationService } from '../../global/notification/notification.service';
import { UserAdministrationClientService } from '../api/user-administration-client.service';
import { UserAdministrationActions } from './user-administration.action';
import { UserAdministrationStateModel } from './user-administration.model';

const defaults: UserAdministrationStateModel = {
  usersPage: null,
  allRoles: null,
};

@State({
  name: 'userAdministrationState',
  defaults,
})
@Injectable()
export class UserAdministrationState {
  private readonly userAdministrationClientService = inject(UserAdministrationClientService);
  private readonly notifier = inject(NotificationService);

  static getUsersPage = createSelector(
    [UserAdministrationState],
    (state: UserAdministrationStateModel) => state.usersPage,
  );

  static allRoles = createSelector(
    [UserAdministrationState],
    (state: UserAdministrationStateModel) => state.allRoles,
  );

  @Action(UserAdministrationActions.GetAllUsers)
  getAllUsers(
    ctx: StateContext<UserAdministrationStateModel>,
    action: UserAdministrationActions.GetAllUsers,
  ) {
    return this.userAdministrationClientService.getAllUsers(action.page, action.email).pipe(
      tap((usersPage) => {
        ctx.patchState({ usersPage });
      }),
      catchError((err) => {
        ctx.patchState({ usersPage: null });
        return throwError(() => err);
      }),
    );
  }

  @Action(UserAdministrationActions.GetAllRoles)
  getAllRoles(ctx: StateContext<UserAdministrationStateModel>) {
    const allRoles = ctx.getState().allRoles;
    if (allRoles) {
      ctx.patchState({ allRoles: [...allRoles] });
      return of(allRoles);
    } else {
      return this.userAdministrationClientService.getAllRoles().pipe(
        tap((allRoles) => {
          ctx.patchState({ allRoles });
        }),
        catchError((err) => {
          ctx.patchState({ allRoles: null });
          return throwError(() => err);
        }),
      );
    }
  }

  @Action(UserAdministrationActions.SetUserRoles)
  setUserRoles(
    ctx: StateContext<UserAdministrationStateModel>,
    action: UserAdministrationActions.SetUserRoles,
  ) {
    return this.userAdministrationClientService.setUserRoles(action.id, action.roles).pipe(
      tap(() => {
        const updatedUserPageContent = ctx.getState().usersPage?.content.map((user) => {
          if (user.id === action.id) {
            return { ...user, roles: action.roles };
          } else {
            return { ...user };
          }
        }) as UserModel[];
        ctx.patchState({
          usersPage: {
            ...(ctx.getState().usersPage as PageModel<UserModel>),
            content: updatedUserPageContent,
          },
        });
        this.notifier.success('Rolurile au fost actualizate cu succes');
      }),
      catchError((err) => {
        return throwError(() => err);
      }),
    );
  }
}
