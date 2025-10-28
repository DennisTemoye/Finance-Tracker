import { NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-debit-account',
  imports: [NgIf],
  templateUrl: './debit-account.html',
  styleUrl: './debit-account.css'
})
export class DebitAccount {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<void>();
  @Input() FormGroup!: FormGroup;
  close() {
    this.visible = false;
    this.closeModal.emit();
  }
  withdrawAccount() {
    this.saveChanges.emit();
    this.visible = false;
  }
}
