import { UserModel } from '../../global/model/user.model';

export interface UserStateModel {
  user: UserModel | null;
}
