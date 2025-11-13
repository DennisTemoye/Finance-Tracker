import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private http = inject(HttpClient);

  userLogin(data: {
    email: string;
    password: string;
  }) {
    return this.http.post<{
      data: { accessToken: string; refreshToken: string; tokenType: string };
    }>(`/auth/login`, data);
  }

  saveToken(token: string): void {
    localStorage.setItem('access_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  logout(): void {

    localStorage.removeItem('access_token');
  }
}
