import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AccountsService {

  getAccount() {
    return this.http.get('/users');
  }

  private http = inject(HttpClient);
}
