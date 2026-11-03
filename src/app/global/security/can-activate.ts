import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { Store } from '@ngxs/store';
import { filter, map } from 'rxjs';
import { UserState } from '../../user/state/user.state';
import { RoleName } from '../model/user.model';

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

export const canActivateOnboarding = () => {
  return inject(Store)
    .select(UserState.getRoles)
    .pipe(
      filter((userRoles) => !!userRoles),
      map(
        (userRoles) =>
          userRoles.length === 0 ||
          (userRoles.length === 1 && userRoles[0].name === RoleName.ROLE_USER),
      ),
    );
};
