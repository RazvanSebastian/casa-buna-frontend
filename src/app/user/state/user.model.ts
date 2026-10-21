import { UserModel } from '../../global/model/user/user.model';

export interface UserStateModel {
  user: UserModel | null;
}
