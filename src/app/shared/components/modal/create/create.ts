import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIf } from '@angular/common';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-create-modal',
  imports: [NgIf],
  templateUrl: './create.html',
  styleUrl: './create.css'
})
export class CreateModal {
  @Input() title: string = '';
  @Input() visible: boolean = false;
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
