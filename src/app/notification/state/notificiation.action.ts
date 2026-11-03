const STATE = '[NotificationState]';

export namespace NotificationStateAction {
  export class Subscribe {
    static readonly type = `${STATE} Subscribe`;
  }

  export class GetNotifications {
    static readonly type = `${STATE} Get Notifications`;

    constructor(public page: number) {}
  }

  export class GetNotificationsPreview {
    static readonly type = `${STATE} Get Notifications Preview`;
  }

  export class MarkAsRead {
    static readonly type = `${STATE} Mark As Read`;

    constructor(public id: number) {}
  }

  export class Test {
    static readonly type = `${STATE} Test`;
  }
}
