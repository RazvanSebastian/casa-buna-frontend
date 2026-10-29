import { inject, Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext, Store } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { UserClientService } from '../api/user-client.service';
import { UserStateAction } from './user.action';
import { UserStateModel } from './user.model';

const defaults: UserStateModel = {
  user: null,
};

@State({
  name: 'userState',
  defaults,
})
@Injectable()
export class UserState {
  private readonly store = inject(Store);
  private readonly userClientService = inject(UserClientService);

  static getUser = createSelector([UserState], (state: UserStateModel) => state.user);

  static getRoles = createSelector([UserState], (state: UserStateModel) => state.user?.roles);

  @Action(UserStateAction.GetCurrentUser)
  getCurrentUser(ctx: StateContext<UserStateModel>) {
    return this.userClientService.getCurrentUser().pipe(
      tap((user) => {
        ctx.patchState({ user });
      }),
      catchError((err) => {
        ctx.patchState({ user: null });
        return throwError(() => err);
      }),
    );
  }

  @Action(UserStateAction.LogoutUser)
  logoutUser(ctx: StateContext<UserStateModel>) {
    return this.userClientService.logout().pipe(tap(() => ctx.patchState(defaults)));
  }
}
