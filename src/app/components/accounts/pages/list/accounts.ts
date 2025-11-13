import { Component, inject, OnInit } from '@angular/core';
import { TableComponent } from '../../../../shared/components/table/table';
import { Router } from '@angular/router';
import { SampleDataService } from '../../../../shared/data/sample-data';
import { ToastrService } from 'ngx-toastr';
import { CreateModal } from '../../../../shared/components/modal/create/create';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgForOf, NgIf } from '@angular/common';
import { CreditAccount } from '../../../../shared/components/modal/credit-account/credit-account';
import { DebitAccount } from '../../../../shared/components/modal/debit-account/debit-account';
import { PriceFormatPipe } from '../../../../shared/price-format-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { Confirmation } from "../../../../shared/components/modal/confirmation/confirmation";
import { AccountsService } from '../../../../core/services/accounts.service';

@Component({
  selector: 'app-accounts',
  imports: [
    TableComponent,
    CreateModal,
    FormsModule,
    ReactiveFormsModule,
    NgIf,
    CreditAccount,
    DebitAccount,
    PriceFormatPipe,
    NgForOf,
    Confirmation
  ],
  templateUrl: './accounts.html',
  styleUrl: './accounts.css',
})
export class AccountsComponent implements OnInit {

  accountService = inject(AccountsService)
  router = inject(Router);
  toast = inject(ToastrService);
  header = [
    { key: 'index', label: 'No' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'phone', label: 'Phone' },
    { key: 'amount', label: 'Balance' },
    { key: 'status', label: 'Status' },
  ];
  accounts: any[] = [];
  filteredAccounts: any[] = [];
  newAccount: any = {};
  showCreateModal: boolean = false;
  showCreditModal: boolean = false;
  showDebitModal: boolean = false;
  dataService = inject(SampleDataService);
  accountForm!: FormGroup;
  withdrawForm!: FormGroup;
  creditForm!: FormGroup;
  showConfirmationModal: boolean = false;
  newEvent: any;
  searchTerm: string = '';
  statusFilter: string = '';
  confirmationMessage: string = '';
  showActivateConfirmationModal: boolean = false
  showDeactivateConfirmationModal: boolean = false




  onEdit(account: any) {
    console.log('Edit account:', account);
  }
  ngOnInit(): void {
    this.getAccounts();
    this.filteredAccounts = [...this.accounts];
    this.accountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      amount: new FormControl('0'),
      status: new FormControl(''),
    });

    this.creditForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      method: new FormControl('', Validators.required),
    });

    this.withdrawForm = new FormGroup({
      name: new FormControl('', Validators.required),
      amount: new FormControl('', [Validators.required, Validators.min(1)]),
      method: new FormControl('', Validators.required),
    });
  }

  getAccounts() {
    this.accountService.getAccount().subscribe({
      next: (res: any) => (this.accounts = res.data),
      error: (err) => console.error(err),
    });
  }


  onDelete($event: any) {
    this.newEvent = $event
    this.showConfirmationModal = true;

  }
  onSelect($event: any) {
    this.router.navigate(['/accounts', $event.id]);
    return this.accounts.find((account) => account.id === $event.id) || null;
  }

  onActivate($event: any) {
    this.newEvent = $event
    this.showActivateConfirmationModal = true;
  }

  onDeactivate($event: any) {
    this.newEvent = $event
    this.showDeactivateConfirmationModal = true;
  }

  save() {
    console.log('Creating account with form values:', this.accountForm.value);
    console.log('Creating account:', { ...this.accountForm.value });

    this.accounts.unshift({
      ...this.accountForm.value,
      id: 'AC' + (this.accounts.length + 1).toString(),
      status: 'Inactive',
    });
    this.applyFilters();
    this.toast.success('Account created successfully!', 'Success');
    this.newAccount = {};
    this.showCreateModal = false;
  }
  creditAccount() {
    console.log('Credit account:', this.creditForm.value);
    const account = this.accounts.find((account) => account.id === this.creditForm.value.name);
    console.log('Found account:', account);
    if (account) {
      if (account.status !== 'Active') {
        this.toast.error('Cannot credit an inactive account.', 'Error');
        this.showCreditModal = true;
      } else {
        account.amount += Number(this.creditForm.value.amount);
        this.toast.success('Account credited successfully!', 'Success');
      }
    }
    this.showCreditModal = false;
  }

  withdrawAccount() {
    console.log('Withdraw from account:', this.withdrawForm.value);
    const account = this.accounts.find((account) => account.id === this.withdrawForm.value.name);
    console.log('Found account:', account);
    if (account) {
      if (account.status !== 'Active') {
        this.toast.error('Cannot withdraw from an inactive account.', 'Error');
        this.showDebitModal = true;
      } else if (account.amount < Number(this.withdrawForm.value.amount)) {
        this.toast.error('Insufficient funds for this withdrawal.', 'Error');
        this.showDebitModal = true;
      } else {
        account.amount -= Number(this.withdrawForm.value.amount);
        this.toast.success('Account debited successfully!', 'Success');
      }
    }
    this.showDebitModal = false;
  }

  closeModal() {
    this.showCreateModal = false;
  }

  openCreateModal() {
    this.accountForm.reset();
    this.showCreateModal = true;
  }

  openCreditModal() {
    this.creditForm.reset();
    this.showCreditModal = true;
  }

  closeCreditModal() {
    this.showCreditModal = false;
  }
  openDebitModal() {
    this.withdrawForm.reset();

    this.showDebitModal = true;
  }
  closeDebitModal() {
    this.showDebitModal = false;
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
    let filtered = [...this.accounts];

    if (this.searchTerm.trim()) {
      filtered = filtered.filter(
        (account) =>
          account.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          account.email.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          account.phone.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }

    if (this.statusFilter) {
      filtered = filtered.filter((account) => account.status === this.statusFilter);
    }

    this.filteredAccounts = filtered;
  }

  clearFilters() {
    this.searchTerm = '';
    this.statusFilter = '';
    this.filteredAccounts = [...this.accounts];
  }

  closeConfirmationModal() {
    this.showConfirmationModal = false;
  }

  onConfirm() {
    console.log('Confirmed action for account:', this.newEvent);
    console.log('Current accounts before deletion:', this.accounts);
    console.log('Filtered accounts before deletion:', this.filteredAccounts);

    const index = this.accounts.indexOf(this.accounts.find((acc) => acc.id === this.newEvent.id)!);
    console.log('Account index to delete:', index);
    if (index > -1) {
      this.accounts.splice(index, 1);
      this.applyFilters();
      this.toast.success('Account deleted successfully!', 'Success');
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
    console.log('Current accounts before deletion:', this.accounts);
    console.log('Filtered accounts before deletion:', this.filteredAccounts);
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
