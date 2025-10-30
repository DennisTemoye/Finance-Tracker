import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table';
import { SampleDataService } from '../../../../shared/data/sample-data';
import { CreateModal } from '../../../../shared/components/modal/create/create';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';
import { Confirmation } from "../../../../shared/components/modal/confirmation/confirmation";

@Component({
  selector: 'app-transactions',
  imports: [TableComponent, CreateModal, FormsModule, NgForOf, Confirmation],
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
  confirmationMessage: string = '';
  showActivateConfirmationModal: boolean = false
  showDeactivateConfirmationModal: boolean = false
  newEvent: any;
  showConfirmationModal: boolean = false;

  ngOnInit(): void {
    this.transactions = this.dataService.getTransactions();
    this.filteredTransactions = [...this.transactions];
  }
  onEdit(transaction: any) {
    console.log('Edit transaction:', transaction);
  }

  onDelete($event: any) {
    this.newEvent = $event
    this.showConfirmationModal = true;

  }

  // onDelete($event: any) {
  //   console.log('Deleting transaction:', $event);
  //   const index = this.transactions.indexOf(this.transactions.find((trans) => trans.trans_id === $event.trans_id)!);
  //   console.log('Index to delete:', index);
  //   if (index > -1) {
  //     this.transactions.splice(index, 1);
  //     this.applyFilters();
  //     this.toast.success('Transaction deleted successfully!', 'Success');
  //   }

  // }
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

    this.transactions.unshift({
      ...this.newTransaction,
      trans_id: 'TX' + (this.transactions.length + 1).toString(),
      date: new Date().toISOString().split('T')[0],
      name: this.selectedAccountUser.account,
    });
    this.applyFilters();
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

  closeConfirmationModal() {
    this.showConfirmationModal = false;
  }

  onConfirm() {
    const index = this.transactions.indexOf(this.transactions.find((trans) => trans.trans_id === this.newEvent.trans_id)!);
    console.log('Transaction index to delete:', index);
    if (index > -1) {
      this.transactions.splice(index, 1);
      this.applyFilters();
      this.toast.success('Transaction deleted successfully!', 'Success');
    }
    this.closeConfirmationModal();

  }
  closeActivateConfirmationModal() {
    this.showActivateConfirmationModal = false;
  }
  onConfirmActivate() {
    console.log('Confirmed activation for account:', this.newEvent);
    if (this.accounts.length > 0) {
      const account = this.accounts.find((account) => account.id === this.newEvent.id);
      if (account) {
        account.status = 'Active';
        this.toast.success('Account activated successfully!', 'Success');
      }
    }

    this.closeActivateConfirmationModal();
  }
  closeDeactivateConfirmationModal() {
    this.showDeactivateConfirmationModal = false;
  }
  onConfirmDeactivate() {
    console.log('Confirmed deactivation for account:', this.newEvent);
    if (this.accounts.length > 0) {
      const account = this.accounts.find((account) => account.id === this.newEvent.id);
      if (account) {
        account.status = 'Inactive';
        this.toast.success('Account deactivated successfully!', 'Success');
      }
    }
    this.closeDeactivateConfirmationModal();
  }
}
