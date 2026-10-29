import { PageModel } from '../../../global/model/page.model';
import { RoleModel, UserModel } from '../../../global/model/user.model';

export interface UserAdministrationStateModel {
  usersPage: PageModel<UserModel> | null;
  allRoles: RoleModel[] | null;
}
