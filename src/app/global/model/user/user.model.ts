export interface UserModel {
  id: number;
  email: string;
  firstName: string;
  lastName: string;
  roles: RoleModel[];
}

export interface RoleModel {
  name: string;
}
