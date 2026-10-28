import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, of, throwError } from 'rxjs';
import { NewVolunteerRequestModel, VolunteerRequestModel } from './volunteer-request-client.model';

@Injectable({
  providedIn: 'root',
})
export class VolunteerRequestClientService {
  private readonly baseUrl = '/api/volunteer/request';
  private http = inject(HttpClient);

  getRequestInPending() {
    return this.http.get<VolunteerRequestModel>(this.baseUrl).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 404) {
          return of(null);
        }
        return throwError(() => error);
      }),
    );
  }

  createRequest(request: NewVolunteerRequestModel) {
    return this.http.post<VolunteerRequestModel>(this.baseUrl, request);
  }
}
