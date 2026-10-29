import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { PageModel } from '../../global/model/page.model';
import {
  VolunteerRequestStatus,
  VolunteerRequestWithUserResponse,
} from '../../global/model/volunteer-request.model';

@Injectable({ providedIn: 'root' })
export class VolunteerRequestsAdministrationClientService {
  private readonly baseUrl = '/api/admin/volunteer/request';

  private readonly http = inject(HttpClient);

  getAllVolunteerRequests(page: number, status: string, requestorEmail?: string) {
    let params = new HttpParams().set('page', page.toString()).set('status', status);
    if (requestorEmail) {
      params = params.set('requestorEmail', requestorEmail);
    }
    return this.http.get<PageModel<VolunteerRequestWithUserResponse>>(`${this.baseUrl}/all`, {
      params,
    });
  }

  updateStatus(requestId: number, status: VolunteerRequestStatus) {
    return this.http.patch(`${this.baseUrl}/${requestId}/status/${status}`, null);
  }
}
