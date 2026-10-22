import { inject, Injectable } from '@angular/core';
import { Action, createSelector, State, StateContext, Store } from '@ngxs/store';
import { catchError, tap, throwError } from 'rxjs';
import { UserClientService } from '../api/user-client.service';
import { UserActions } from './user.action';
import { UserStateModel } from './user.model';

const defaults: UserStateModel = {
  user: null,
};

@State({
  name: 'userState',
})
@Injectable()
export class UserState {
  private readonly store = inject(Store);
  private readonly userClientService = inject(UserClientService);

  static getUser = createSelector([UserState], (state: UserStateModel) => state.user);

  @Action(UserActions.GetCurrentUser)
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

  @Action(UserActions.LogoutUser)
  logoutUser() {
    return this.userClientService.logout().pipe(tap(() => this.store.reset({})));
  }
}
