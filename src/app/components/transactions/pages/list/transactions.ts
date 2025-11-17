import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table';
import { SampleDataService } from '../../../../shared/data/sample-data';
import { CreateModal } from '../../../../shared/components/modal/create/create';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { AsyncPipe, NgForOf } from '@angular/common';
import { Confirmation } from '../../../../shared/components/modal/confirmation/confirmation';
import { TransactionsService } from '../../../../core/services/transactions.service';
import { Store } from '@ngrx/store';
import { loadTransactions } from '../../../../state/transactions/transactions.actions';
import { selectAllTransactions } from '../../../../state/transactions/transactions.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-transactions',
  imports: [TableComponent, CreateModal, FormsModule, NgForOf, Confirmation, AsyncPipe],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css',
})
export class TransactionsComponent implements OnInit {
  router = inject(Router);
  toast = inject(ToastrService);
  columns = [
    { key: 'senderName', label: 'Name' },
    { key: 'amount', label: 'Amount' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
  ];
  public transactions: any[] = [];
  filteredTransactions: any[] = [];
  newTransaction: any = {};
  selectedAccountUser: any = {};
  dataService = inject(SampleDataService);
  accounts: any[] = this.dataService.getAccounts();
  transactionsService = inject(TransactionsService);
  showCreateModal: boolean = false;

  searchTerm: string = '';
  statusFilter: string = '';
  confirmationMessage: string = '';
  showActivateConfirmationModal: boolean = false;
  showDeactivateConfirmationModal: boolean = false;
  newEvent: any;
  store = inject(Store);
  showConfirmationModal: boolean = false;
  t$: Observable<any[]> = this.store.select(selectAllTransactions);

  ngOnInit(): void {
    this.getTransactions();
    console.log(this.t$);
  }

  getTransactions() {
    this.transactionsService.getTransactions().subscribe({
      next: (res: any) => {
        const data = res?.data ?? res; // adjust if your array is somewhere else, e.g. res.transactions
        this.transactions = Array.isArray(data?.transactions) ? data.transactions : [];

        this.store.dispatch(loadTransactions({ transactions: this.transactions }));
        this.filteredTransactions = [...this.transactions];
        this.applyFilters();
        console.log('Transactions>>>>', this.filteredTransactions);
      },
      error: (err) => console.error(err),
    });
  }
  onEdit(transaction: any) {
    console.log('Edit transaction:', transaction);
  }

  onDelete($event: any): void {
    this.newEvent = $event;
    this.showConfirmationModal = true;
    console.log('Requesting delete for transaction:', $event);
    console.log('Transaction to delete:', this.showConfirmationModal);
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
        (transaction: any) =>
          (transaction.status || '')
            .toString()
            .toLowerCase()
            .includes(this.searchTerm.toLowerCase())
        //     transaction.method.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        //     transaction.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.statusFilter) {
      const statusFilterLower = this.statusFilter.toLowerCase();
      filtered = filtered.filter(
        (transaction: any) =>
          transaction.status && transaction.status.toString().toLowerCase() === statusFilterLower
      );
    }

    console.log('filtered', filtered);
    this.filteredTransactions = filtered;
  }

  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.applyFilters();
  }

  closeConfirmationModal() {
    console.log('Closing confirmation modal without action.');
    this.showConfirmationModal = false;
    this.newEvent = null;
    console.log('Confirmation modal closed without action.');
    return;
  }

  onConfirm() {
    const index = this.transactions.indexOf(
      this.transactions.find((trans) => trans.trans_id === this.newEvent.trans_id)!
    );
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
