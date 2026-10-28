import { RoleModel } from '../../global/model/user/user.model';

const USER_STATE = '[UserState]';

export namespace UserAdministrationStateAction {
  export class GetAllUsers {
    static readonly type = `${USER_STATE} Get All Users`;
    constructor(
      public page: number,
      public email?: string,
    ) {}
  }

  export class GetAllRoles {
    static readonly type = `${USER_STATE} Get All Roles`;
  }

  export class SetUserRoles {
    static readonly type = `${USER_STATE} Set User Roles`;
    constructor(
      public id: number,
      public roles: RoleModel[],
    ) {}
  }
}
