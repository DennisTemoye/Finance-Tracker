import { NgIf, NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-confirmation',
  imports: [NgIf, NgClass],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css'
})
export class Confirmation {
  @Input() cancel: string = 'No';
  @Input() confirmText: string = 'Yes';
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Input() message: string = '';
  @Output() confirm = new EventEmitter<void>()
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<void>();
  @Input() FormGroup!: FormGroup;
  close() {
    this.visible = false;
    this.closeModal.emit();
  }
  save() {

    this.saveChanges.emit();
    this.visible = false;
  }

}
