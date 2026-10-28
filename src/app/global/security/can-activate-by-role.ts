import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { UserState } from '../../user/state/user.state';

export const canActivateByRoleGuard: CanActivateFn = (route) => {
  const store = inject(Store);

  const allowedRoles: string[] = route.data['roles'] ?? [];

  if (!allowedRoles.length) {
    return true;
  }

  return (store.selectSnapshot(UserState.getUser)?.roles ?? [])
    .map((role) => role.name)
    .some((role) => allowedRoles.includes(role));
};
