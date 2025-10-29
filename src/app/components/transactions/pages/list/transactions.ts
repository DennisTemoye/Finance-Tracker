import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table';
import { SampleDataService } from '../../../../shared/data/sample-data';
import { CreateModal } from '../../../../shared/components/modal/create/create';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';

@Component({
  selector: 'app-transactions',
  imports: [TableComponent, CreateModal, FormsModule, NgForOf],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class TransactionsComponent implements OnInit {
  router = inject(Router);
  toast = inject(ToastrService);
  columns = [
    { key: 'name', label: 'Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'method', label: 'Method' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
  ];
  transactions: any[] = [];
  filteredTransactions: any[] = [];
  newTransaction: any = {};
  selectedAccountUser: any = {};
  dataService = inject(SampleDataService);
  accounts: any[] = this.dataService.getAccounts();
  showCreateModal: boolean = false;

  searchTerm: string = '';
  statusFilter: string = '';

  ngOnInit(): void {
    this.transactions = this.dataService.getTransactions();
    this.filteredTransactions = [...this.transactions];
  }
  onEdit(transaction: any) {
    console.log('Edit transaction:', transaction);
  }

  onDelete(transaction: any) {
    const index = this.transactions.indexOf(transaction);
    if (index > -1) {
      this.transactions.splice(index, 1);
    }
    console.log('Delete transaction:', transaction);
  }

  onSelect($event: any) {
    this.router.navigate(['/transactions', $event.trans_id]);
    return (
      this.transactions.find((transaction) => transaction.trans_id === $event.trans_id) || null
    );
  }

  createTransaction(event: Event) {
    event.preventDefault();

    this.showCreateModal = true;
  }

  closeModal() {
    this.showCreateModal = false;
  }

  save() {
    console.log({ ...this.newTransaction });

    this.transactions.push({
      ...this.newTransaction,
      trans_id: 'TX' + (this.transactions.length + 1).toString().padStart(4, '0'),
      date: new Date().toISOString().split('T')[0],
      name: this.selectedAccountUser.account,
    });
    this.applyFilters(); // Refresh filtered list
    this.showCreateModal = true;
    this.toast.success('Transaction created successfully!', 'Success');

    this.showCreateModal = false;
  }

  onSearchChange(searchTerm: string) {
    this.searchTerm = searchTerm;
    this.applyFilters();
  }

  onStatusFilterChange(status: string) {
    this.statusFilter = status;
    this.applyFilters();
  }

  applyFilters() {
    let filtered = [...this.transactions];

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(
        (transaction) =>
          transaction.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          transaction.method.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          transaction.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter((transaction) => transaction.status === this.statusFilter);
    }

    this.filteredTransactions = filtered;
  }

  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredTransactions = [...this.transactions];
  }
}
