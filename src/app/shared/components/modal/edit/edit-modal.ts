import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
@Component({
  selector: 'app-edit-modal',
  imports: [NgIf],
  templateUrl: './edit-modal.html',
  styleUrl: './edit-modal.css'
})
export class EditModal {
  @Input() title: string = '';
  @Input() visible: boolean = false;
  @Output() closeModal = new EventEmitter<void>();
  @Output() saveChanges = new EventEmitter<void>();

  close() {
    this.visible = false;
    this.closeModal.emit();
  }
  save() {
    this.saveChanges.emit();
    this.visible = false;
  }
}
