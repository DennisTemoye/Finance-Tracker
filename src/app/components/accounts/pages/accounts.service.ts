import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {
  private baseUrl = environment.apiUrl
  getAccount() {
    return this.http.get(`${this.baseUrl}/users`);
  }

  private http = inject(HttpClient);
}
