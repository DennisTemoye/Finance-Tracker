import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SampleDataService {

  getStatistics() {
    return [
      { label: 'Total Accounts', value: 12 },
      { label: 'Total Balance', value: '$25,000' },
      { label: 'Monthly Expenses', value: '$3,200' },
      { label: 'Monthly Income', value: '$5,400' }
    ];
  }

  getTransactions() {
    return [
      { trans_id: "T243", name: 'John Doe', phone: '123-456-7890', amount: 100, method: 'Credit Card', status: 'Successful', date: '2023-01-01' },
      { trans_id: "T244", name: 'Jane Smith', phone: '987-654-3210', amount: 200, method: 'PayPal', status: 'Pending', date: '2023-01-02' },
      { trans_id: "T245", name: 'Alice Johnson', phone: '555-555-5555', amount: 300, method: 'Bank Transfer', status: 'Failed', date: '2023-01-03' },
      { trans_id: "T246", name: 'Bob Brown', phone: '444-444-4444', amount: 400, method: 'Credit Card', status: 'Successful', date: '2023-01-04' },
      { trans_id: "T247", name: 'Charlie Davis', phone: '333-333-3333', amount: 500, method: 'PayPal', status: 'Pending', date: '2023-01-05' },
      { trans_id: "T248", name: 'Diana Evans', phone: '222-222-2222', amount: 600, method: 'Bank Transfer', status: 'Failed', date: '2023-01-06' },
      { trans_id: "T249", name: 'Ethan Foster', phone: '111-111-1111', amount: 700, method: 'Credit Card', status: 'Successful', date: '2023-01-07' },
      { trans_id: "T250", name: 'Fiona Green', phone: '000-000-0000', amount: 800, method: 'PayPal', status: 'Pending', date: '2023-01-08' },
      { trans_id: "T251", name: 'George Harris', phone: '999-999-9999', amount: 900, method: 'Bank Transfer', status: 'Failed', date: '2023-01-09' },
      { trans_id: "T252", name: 'Hannah Irving', phone: '888-888-8888', amount: 1000, method: 'Credit Card', status: 'Successful', date: '2023-01-10' },
      { trans_id: "T253", name: 'Ian Jackson', phone: '777-777-7777', amount: 1100, method: 'PayPal', status: 'Pending', date: '2023-01-11' },
      { trans_id: "T254", name: 'Jack Kelly', phone: '666-666-6666', amount: 1200, method: 'Bank Transfer', status: 'Failed', date: '2023-01-12' }
    ];
  }

  getAccounts() {
    return [
      { id: "AC1", name: 'John Doe', email: 'john@example.com', phone: '123-456-7890', amount: 1000, status: 'Active' },
      { id: "AC2", name: 'Jane Smith', email: 'jane@example.com', phone: '987-654-3210', amount: 2000, status: 'Inactive' },
      { id: "AC3", name: 'Alice Johnson', email: 'alice@example.com', phone: '555-555-5555', amount: 3000, status: 'Active' },
      { id: "AC4", name: 'Bob Brown', email: 'bob@example.com', phone: '444-444-4444', amount: 4000, status: 'Inactive' },
      { id: "AC5", name: 'Charlie Davis', email: 'charlie@example.com', phone: '333-333-3333', amount: 5000, status: 'Active' },
      { id: "AC6", name: 'Diana Evans', email: 'diana@example.com', phone: '222-222-2222', amount: 6000, status: 'Inactive' },
      { id: "AC7", name: 'Ethan Foster', email: 'ethan@example.com', phone: '111-111-1111', amount: 7000, status: 'Active' },
      { id: "AC8", name: 'Fiona Green', email: 'fiona@example.com', phone: '000-000-0000', amount: 8000, status: 'Inactive' },
      { id: "AC9", name: 'George Harris', email: 'george@example.com', phone: '999-999-9999', amount: 9000, status: 'Active' },
      { id: "AC10", name: 'Hannah Irving', email: 'hannah@example.com', phone: '888-888-8888', amount: 10000, status: 'Inactive' },
      { id: "AC11", name: 'Ian Jackson', email: 'ian@example.com', phone: '777-777-7777', amount: 11000, status: 'Active' }
    ];

  }

}
