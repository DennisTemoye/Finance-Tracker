import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgForOf, NgClass, NgIf } from '@angular/common';
import { PriceFormatPipe } from '../../price-format-pipe';
import { NgxPaginationModule } from 'ngx-pagination';
@Component({
  selector: 'app-table',
  imports: [NgForOf, NgClass, NgIf, PriceFormatPipe, NgxPaginationModule],
  templateUrl: './table.html',
  styleUrl: './table.css'
})
export class TableComponent {

  @Input({ required: true }) columns: { key: string, label: string }[] = [];
  @Input({ required: true }) data: any[] = [];
  @Output() edit = new EventEmitter<any>();
  @Output() delete = new EventEmitter<any>();
  @Output() select = new EventEmitter<any>();
  @Output() activate = new EventEmitter<any>();
  @Output() deactivate = new EventEmitter<any>();
  @Input() showActions: boolean = false;
  @Input() enablePagination: boolean = true;

  indexOf(row: any) {
    return this.data.indexOf(row);
  }

  getStatusClass(status: string) {
    return {
      'text-success': status === 'Active' || status === 'Successful',
      'text-danger': status === 'Inactive' || status === 'Failed',
      'text-warning': status === 'Pending',
    };
  }

  getIfActive(status: string) {
    return status !== 'Active';
  }
  p: number = 1;

}