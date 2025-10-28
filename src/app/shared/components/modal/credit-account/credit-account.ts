import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-credit-account',
  imports: [NgIf],
  templateUrl: './credit-account.html',
  styleUrl: './credit-account.css'
})
export class CreditAccount {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<void>();
  @Input() FormGroup!: FormGroup;
  close() {
    this.visible = false;
    this.closeModal.emit();
  }
  creditAccount() {
    this.saveChanges.emit();
    this.visible = false;
  }

}
