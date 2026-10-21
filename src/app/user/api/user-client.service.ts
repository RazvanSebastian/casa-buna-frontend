import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PageModel } from '../../global/model/page.model';
import { UserModel } from '../../global/model/user/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserClientService {
  private readonly baseUrl = '/api/user';

  private http = inject(HttpClient);

  getCurrentUser() {
    return this.http.get<UserModel>(`${this.baseUrl}/me`);
  }

  getAllUsers(page: number, email: string) {
    return this.http.get<PageModel<UserModel>>(`${this.baseUrl}/all`, {
      params: { page, email },
    });
  }
}
