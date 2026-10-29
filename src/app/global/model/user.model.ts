export interface UserDetailsMode {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
}

export interface UserModel extends UserDetailsMode {
  roles: RoleModel[];
}

export interface RoleModel {
  name: RoleName;
}

export enum RoleName {
  ROLE_USER = 'ROLE_USER',
  ROLE_ADMIN = 'ROLE_ADMIN',
  ROLE_VOLUNTEER = 'ROLE_VOLUNTEER',
}
