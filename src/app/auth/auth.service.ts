import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl = 'https://commotional-chasmogamic-brittani.ngrok-free.dev';
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
