import { Component, inject, OnInit } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { NgForOf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { TableComponent } from '../../shared/components/table/table';
import { Router } from '@angular/router';
import { SampleDataService } from '../../shared/data/sample-data';
import { PriceFormatPipe } from '../../shared/price-format-pipe';
@Component({
  selector: 'app-dashboard',
  imports: [Card, NgForOf, BaseChartDirective, TableComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class DashboardComponent implements OnInit {
  router = inject(Router);
  columns = [{ key: "index", label: "No" }, { key: "name", label: "Name" }, { key: "phone", label: "Phone" }, { key: "amount", label: "Amount" }, { key: "method", label: "Method" }, { key: "status", label: "Status" }, { key: "date", label: "Date" }];
  transactions: any[] = [];
  priceFormat = new PriceFormatPipe();
  dataService = inject(SampleDataService);
  ngOnInit(): void {

    this.transactions = this.dataService.getTransactions().slice(0, 5);

  }

  totalBalance: number = this.dataService.getAccounts().reduce((acc, account) => acc + account.amount, 0);
  statistics = [
    { label: 'Total Accounts', value: this.dataService.getAccounts().length },
    { label: 'Total Balance', value: this.priceFormat.transform(this.totalBalance) },
    { label: 'Monthly Expenses', value: this.priceFormat.transform(3200) },
    { label: 'Monthly Income', value: this.priceFormat.transform(5400) }
  ];
  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['2006', '2007', '2008', '2009', '2010', '2011', '2012'],
    datasets: [
      { data: [65, 59, 80, 81, 56, 55, 40], label: 'Series A' },
      { data: [28, 48, 40, 19, 86, 27, 90], label: 'Series B' }
    ]
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: false,
  };

  onEdit(item: any) {
    console.log('Edit action triggered for:', item);
  }

  onDelete(transactions: any) {
    const index = this.transactions.indexOf(transactions);
    if (index > -1) {
      this.transactions.splice(index, 1);
    }
    console.log('Delete transaction:', transactions);
  }
  onSelect($event: any) {
    this.router.navigate(['/transactions', $event.trans_id]);
    console.log(this.transactions.find(item => item.trans_id === $event.trans_id)?.trans_id || null);
  }


}
