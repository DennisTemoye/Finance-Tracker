import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development.ts';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = environment.apiUrl;
  private http = inject(HttpClient);

  userLogin(data: {
    email: string;
    password: string;
  }): Observable<{ data: { accessToken: string; refreshToken: string; tokenType: string } }> {
    return this.http.post<{
      data: { accessToken: string; refreshToken: string; tokenType: string };
    }>(`${this.baseUrl}/auth/login`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  logout(): void {
    localStorage.removeItem('authToken');
  }
}
