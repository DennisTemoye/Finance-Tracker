import { Component, inject, OnInit } from '@angular/core';
import { Button } from '../../../../../shared/components/button/button';
import { ActivatedRoute, Router } from '@angular/router';
import { EditModal } from '../../../../../shared/components/modal/edit/edit-modal';
import { PriceFormatPipe } from '../../../../../shared/price-format-pipe';
import { SampleDataService } from '../../../../../shared/data/sample-data';
import { Location, NgClass } from '@angular/common';
import { StatusColorPipe } from '../../../../../shared/status-color-pipe';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { CreateModal } from "../../../../../shared/components/modal/create/create";
@Component({
  selector: 'app-transaction',
  imports: [Button, EditModal, PriceFormatPipe, NgClass, StatusColorPipe, FormsModule],
  templateUrl: './transaction.html',
  styleUrl: './transaction.css'
})
export class TransactionComponent implements OnInit {
  route: ActivatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  transaction: any = [];
  id!: string;
  dataService = inject(SampleDataService);
  toast = inject(ToastrService);
  showModal: boolean = false;
  showCreateModal: boolean = false;

  constructor(private location: Location) { }



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;

    this.transaction = this.dataService.getTransactions().find(transaction => transaction.trans_id === this.id) || null;
  }

  goBack() {
    this.location.back();
  }

  editTransaction(event: Event) {
    event.preventDefault();
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
  save() {
    // Implement save logic here
    this.toast.success('Account details updated successfully!', 'Success');

    this.showModal = false;
  }
  onAmountChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.transaction.amount = Number(input.value.replace(/,/g, ''));
  }

}
