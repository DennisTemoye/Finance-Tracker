import { Component, inject, OnInit } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { SampleDataService } from '../../shared/data/sample-data';
import { PriceFormatPipe } from '../../shared/price-format-pipe';
import { Router } from '@angular/router';
import { NgFor, NgClass, NgIf } from '@angular/common';
import { Card } from '../../shared/components/card/card';

@Component({
  selector: 'app-reports',
  imports: [BaseChartDirective, NgFor, Card],
  templateUrl: './reports.html',
  styleUrl: './reports.css',
})
export class ReportsComponent implements OnInit {
  router = inject(Router);
  dataService = inject(SampleDataService);
  priceFormat = new PriceFormatPipe();

  // Summary statistics
  statistics: any[] = [];

  // Chart configurations
  public lineChartType: 'line' = 'line';
  public pieChartType: 'pie' = 'pie';

  // Line Chart Data - Monthly Trends
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
    datasets: [
      {
        data: [45000, 52000, 48000, 61000, 58000, 63000, 59000, 64000],
        label: 'Total Income',
        borderColor: 'rgba(40, 167, 69, 1)',
        backgroundColor: 'rgba(40, 167, 69, 0.2)',
        tension: 0.4,
      },
      {
        data: [28000, 31000, 29000, 33000, 30000, 35000, 32000, 34000],
        label: 'Total Expenses',
        borderColor: 'rgba(220, 53, 69, 1)',
        backgroundColor: 'rgba(220, 53, 69, 0.2)',
        tension: 0.4,
      },
    ],
  };

  public lineChartOptions: ChartConfiguration<'line'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Financial Trends Over Time',
        font: { size: 16, weight: 'bold' },
      },
      legend: { display: true, position: 'top' },
    },
    scales: {
      y: {
        title: { display: true, text: 'Amount (NGN)' },
        ticks: {
          callback: function (value: any) {
            return '₦' + value.toLocaleString();
          },
        },
      },
    },
  };

  // Pie Chart Data - Payment Methods Distribution
  public pieChartData: ChartConfiguration<'pie'>['data'] = {
    labels: ['Credit Card', 'Bank Transfer', 'PayPal', 'Cash'],
    datasets: [
      {
        data: [45, 30, 20, 5],
        backgroundColor: [
          'rgba(40, 167, 69, 0.8)',
          'rgba(0, 123, 255, 0.8)',
          'rgba(220, 53, 69, 0.8)',
          'rgba(255, 193, 7, 0.8)',
        ],
        borderColor: [
          'rgba(40, 167, 69, 1)',
          'rgba(0, 123, 255, 1)',
          'rgba(220, 53, 69, 1)',
          'rgba(255, 193, 7, 1)',
        ],
        borderWidth: 2,
      },
    ],
  };

  public pieChartOptions: ChartConfiguration<'pie'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Payment Methods Distribution',
        font: { size: 16, weight: 'bold' },
      },
      legend: { display: true, position: 'bottom' },
    },
  };

  // Doughnut Chart Data - Account Status
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Active Accounts', 'Inactive Accounts'],
    datasets: [
      {
        data: [6, 5],
        backgroundColor: ['rgba(40, 167, 69, 0.8)', 'rgba(220, 53, 69, 0.8)'],
        borderColor: ['rgba(40, 167, 69, 1)', 'rgba(220, 53, 69, 1)'],
        borderWidth: 2,
      },
    ],
  };

  public doughnutChartOptions: ChartConfiguration<'doughnut'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Account Status Overview',
        font: { size: 16, weight: 'bold' },
      },
      legend: { display: true, position: 'bottom' },
    },
  };

  ngOnInit(): void {
    this.calculateStatistics();
  }

  calculateStatistics() {
    const transactions = this.dataService.getTransactions();
    const accounts = this.dataService.getAccounts();

    const successful = transactions.filter((t) => t.status === 'Successful');
    const pending = transactions.filter((t) => t.status === 'Pending');
    const failed = transactions.filter((t) => t.status === 'Failed');

    const totalIncome = successful.reduce((sum, t) => sum + t.amount, 0);
    const activeAccounts = accounts.filter((a) => a.status === 'Active').length;
    const inactiveAccounts = accounts.filter((a) => a.status === 'Inactive').length;
    const totalBalance = accounts.reduce((acc, account) => acc + account.amount, 0);

    this.statistics = [
      {
        label: 'Total Transactions',
        value: transactions.length,
        icon: 'bi-receipt',
        color: 'primary',
      },
      { label: 'Successful', value: successful.length, icon: 'bi-check-circle', color: 'success' },
      { label: 'Pending', value: pending.length, icon: 'bi-hourglass-split', color: 'warning' },
      { label: 'Failed', value: failed.length, icon: 'bi-x-circle', color: 'danger' },
      {
        label: 'Total Income',
        value: this.priceFormat.transform(totalIncome),
        icon: 'bi-arrow-up-circle',
        color: 'success',
      },
      {
        label: 'Active Accounts',
        value: activeAccounts,
        icon: 'bi-person-check',
        color: 'success',
      },
      { label: 'Inactive Accounts', value: inactiveAccounts, icon: 'bi-person-x', color: 'danger' },
      {
        label: 'Total Balance',
        value: this.priceFormat.transform(totalBalance),
        icon: 'bi-wallet2',
        color: 'info',
      },
    ];
  }

  exportReport() {
    console.log('Exporting report...');
    // Implement export functionality
  }
}
