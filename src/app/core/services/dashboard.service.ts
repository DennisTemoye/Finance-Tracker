import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IDashboardStats } from '../../components/dashboard/dashboard';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  getDashboardStats(): Observable<{ data: IDashboardStats }> {
    return this.http.get<{ data: IDashboardStats }>('/admin/dashBoard');
  }
}
