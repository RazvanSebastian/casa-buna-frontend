import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PageModel } from '../../global/model/page.model';
import { RoleModel, UserModel } from '../../global/model/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserAdministrationClientService {
  private readonly baseUrl = '/api/admin/user';

  private http = inject(HttpClient);

  getAllUsers(page: number, email?: string) {
    let params = new HttpParams().set('page', page.toString());
    if (email) {
      params = params.set('email', email);
    }
    return this.http.get<PageModel<UserModel>>(`${this.baseUrl}/all`, {
      params,
    });
  }

  getAllRoles() {
    return this.http.get<RoleModel[]>(`${this.baseUrl}/role/all`);
  }

  setUserRoles(id: number, roles: RoleModel[]) {
    return this.http.patch(`${this.baseUrl}/role`, {
      id,
      roles,
    });
  }
}
