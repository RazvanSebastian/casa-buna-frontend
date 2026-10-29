import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, map } from 'rxjs';
import { UserState } from '../../user/state/user.state';

export const canActivateByRoleGuard: CanActivateFn = (route) => {
  const store = inject(Store);

  const allowedRoles: string[] = route.data['roles'] ?? [];

  if (!allowedRoles.length) {
    return true;
  }

  return store.select(UserState.getRoles).pipe(
    filter((roles) => !!roles),
    map((roles) => roles.some((role) => allowedRoles.includes(role.name))),
  );
};
