import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TableComponent } from '../../../../shared/components/table/table';
import { SampleDataService } from '../../../../shared/data/sample-data';
import { CreateModal } from "../../../../shared/components/modal/create/create";
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { NgForOf } from '@angular/common';


@Component({
  selector: 'app-transactions',
  imports: [TableComponent, CreateModal, FormsModule, NgForOf],
  templateUrl: './transactions.html',
  styleUrl: './transactions.css'
})

export class TransactionsComponent implements OnInit {
  router = inject(Router);
  toast = inject(ToastrService)
  columns = [{ key: "name", label: "Name" }, { key: "amount", label: "Amount" }, { key: "method", label: "Method" }, { key: "status", label: "Status" }, { key: "date", label: "Date" }];
  transactions: any[] = [];
  newTransaction: any = {};
  selectedAccountUser: any = {};
  dataService = inject(SampleDataService)
  accounts: any[] = this.dataService.getAccounts();
  showCreateModal: boolean = false;
  ngOnInit(): void {
    this.transactions = this.dataService.getTransactions();
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
    return this.transactions.find(transaction => transaction.trans_id === $event.trans_id) || null;
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


    this.transactions.push({ ...this.newTransaction, trans_id: 'TX' + (this.transactions.length + 1).toString().padStart(4, '0'), date: new Date().toISOString().split('T')[0], name: this.selectedAccountUser.account });
    this.showCreateModal = true;
    this.toast.success('Transaction created successfully!', 'Success');

    this.showCreateModal = false;
  }
}
