import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SampleDataService } from '../../../../shared/data/sample-data';
import { PriceFormatPipe } from '../../../../shared/price-format-pipe';
import { Button } from '../../../../shared/components/button/button';
import { ToastrService } from 'ngx-toastr';
import { EditModal } from "../../../../shared/components/modal/edit/edit-modal";
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { StatusColorPipe } from '../../../../shared/status-color-pipe';

@Component({
  selector: 'app-account-details',
  imports: [PriceFormatPipe, Button, EditModal, FormsModule, NgClass, StatusColorPipe],
  templateUrl: './account-details.html',
  styleUrl: './account-details.css'
})
export class AccountDetails implements OnInit {
  router = inject(Router);
  route: ActivatedRoute = inject(ActivatedRoute);
  id!: string;
  account: any;
  showModal: boolean = false;
  dataService = inject(SampleDataService)
  toast = inject(ToastrService)
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.account = this.dataService.getAccounts().find(account => account.id === this.id);
  }


  editAccount(event: Event) {
    event.preventDefault();
    this.showModal = true;
  }
  closeModal() {
    this.showModal = false;
  }
  save() {

    this.toast.success('Account details updated successfully!', 'Success');

    this.showModal = false;
  }



  onAmountChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.account.amount = Number(input.value.replace(/,/g, ''));
  }



}
