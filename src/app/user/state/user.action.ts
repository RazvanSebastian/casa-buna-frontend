const USER_STATE = '[UserState]';

export namespace UserStateAction {
  export class GetCurrentUser {
    static readonly type = `${USER_STATE} Get Current User`;
  }

  export class LogoutUser {
    static readonly type = `${USER_STATE} Logout user`;
  }
}
