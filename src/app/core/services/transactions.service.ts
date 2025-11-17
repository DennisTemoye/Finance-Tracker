import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.prod';

@Injectable({
    providedIn: 'root',
})
export class TransactionsService {
    getTransactions() {
        return this.http.get('/admin/allTransactions');
    }

    private http = inject(HttpClient);
}
