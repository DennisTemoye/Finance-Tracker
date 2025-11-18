import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Card } from '../../shared/components/card/card';
import { NgForOf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { TableComponent } from '../../shared/components/table/table';
import { Router } from '@angular/router';
import { SampleDataService } from '../../shared/data/sample-data';
import { PriceFormatPipe } from '../../shared/price-format-pipe';
import { DashboardService } from '../../core/services/dashboard.service';
import { TransactionsService } from '../../core/services/transactions.service';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
import { loadTransactions } from '../../state/transactions/transactions.actions';
import { Store } from '@ngrx/store';
import { selectAllTransactions } from '../../state/transactions/transactions.selectors';
import { Transaction } from '../../state/transactions/transactions.state';

export interface IDashboardStats {
  monthlyIncome: number;
  monthlyExpenses: number;
  totalSystemBalance: number;
  totalUser: number;
}
@Component({
  selector: 'app-dashboard',
  imports: [Card, NgForOf, BaseChartDirective, TableComponent],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class DashboardComponent implements OnInit, OnDestroy {
  router = inject(Router);
  private store = inject(Store);
  private dataService = inject(SampleDataService);
  private dashboardService = inject(DashboardService);
  private transactionsService = inject(TransactionsService);
  columns = [
    { key: 'index', label: 'No' },
    { key: 'name', label: 'Name' },
    { key: 'phone', label: 'Phone' },
    { key: 'amount', label: 'Amount' },
    { key: 'method', label: 'Method' },
    { key: 'status', label: 'Status' },
    { key: 'date', label: 'Date' },
  ];
  stats: IDashboardStats | null = null;
  transactions$!: Observable<Transaction[]>;
  transactions: Transaction[] = [];
  private transactionsSub?: Subscription;
  priceFormat = new PriceFormatPipe();
  async ngOnInit(): Promise<void> {
    await this.loadDashboardStats();
    this.transactions$ = this.store.select(selectAllTransactions);
    this.transactionsSub = this.transactions$.subscribe((transactions) => {
      console.log(transactions);
      this.transactions = transactions;
    });
    await this.dispatchTransactions();
    this.updateChartData();
  }

  totalBalance: number = this.dataService
    .getAccounts()
    .reduce((acc, account) => acc + account.amount, 0);

  calculateMonthlyStats() {
    const allTransactions = this.dataService.getTransactions();
    const successfulTransactions = allTransactions.filter((t) => t.status === 'Successful');
    const monthlyIncome = successfulTransactions.reduce((sum, t) => sum + t.amount, 0);
    const monthlyExpenses = allTransactions
      .filter((t) => t.status === 'Failed')
      .reduce((sum, t) => sum + t.amount, 0);

    return { monthlyIncome, monthlyExpenses };
  }

  get statistics() {
    return [
      { label: 'Total Accounts', value: this.stats?.totalUser ?? 0 },
      {
        label: 'Total Balance',
        value: this.priceFormat.transform(this.stats?.totalSystemBalance ?? 0),
      },
      {
        label: 'Monthly Expenses',
        value: this.priceFormat.transform(this.stats?.monthlyExpenses ?? 0),
      },
      {
        label: 'Monthly Income',
        value: this.priceFormat.transform(this.stats?.monthlyIncome ?? 0),
      },
    ];
  }

  public barChartLegend = true;
  public barChartPlugins = [];

  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        data: [4500, 5200, 4800, 6100, 5800, 6300, 5900],
        label: 'Income',
        backgroundColor: 'rgba(40, 167, 69, 0.6)',
        borderColor: 'rgba(40, 167, 69, 1)',
        borderWidth: 2,
      },
      {
        data: [2800, 3100, 2900, 3300, 3000, 3500, 3200],
        label: 'Expenses',
        backgroundColor: 'rgba(220, 53, 69, 0.6)',
        borderColor: 'rgba(220, 53, 69, 1)',
        borderWidth: 2,
      },
    ],
  };

  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: 'Monthly Income vs Expenses (Last 7 Months)',
        font: {
          size: 16,
          weight: 'bold',
        },
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        stacked: false,
        title: {
          display: true,
          text: 'Amount (NGN)',
        },
        ticks: {
          callback: function (value: any) {
            return '₦' + value.toLocaleString();
          },
        },
      },
    },
  };

  updateChartData() {
    const allTransactions = this.dataService.getTransactions();

    const monthlyData = this.calculateMonthlyTransactions(allTransactions);

    this.barChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      datasets: [
        {
          data: monthlyData.income,
          label: 'Income',
          backgroundColor: 'rgba(40, 167, 69, 0.6)',
          borderColor: 'rgba(40, 167, 69, 1)',
          borderWidth: 2,
        },
        {
          data: monthlyData.expenses,
          label: 'Expenses',
          backgroundColor: 'rgba(220, 53, 69, 0.6)',
          borderColor: 'rgba(220, 53, 69, 1)',
          borderWidth: 2,
        },
      ],
    };
  }

  calculateMonthlyTransactions(transactions: any[]) {
    const successful = transactions.filter((t) => t.status === 'Successful');
    const failed = transactions.filter((t) => t.status === 'Failed');

    const totalIncome = successful.reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = failed.reduce((sum, t) => sum + t.amount, 0);

    const avgMonthlyIncome = totalIncome > 0 ? totalIncome / successful.length : 5000;
    const avgMonthlyExpense = totalExpenses > 0 ? totalExpenses / failed.length : 3200;

    return {
      income: [
        Math.round(avgMonthlyIncome * 0.9),
        Math.round(avgMonthlyIncome * 1.05),
        Math.round(avgMonthlyIncome * 0.95),
        Math.round(avgMonthlyIncome * 1.2),
        Math.round(avgMonthlyIncome * 1.15),
        Math.round(avgMonthlyIncome * 1.25),
        Math.round(avgMonthlyIncome * 1.15),
      ],
      expenses: [
        Math.round(avgMonthlyExpense * 0.85),
        Math.round(avgMonthlyExpense * 0.95),
        Math.round(avgMonthlyExpense * 0.9),
        Math.round(avgMonthlyExpense * 1.05),
        Math.round(avgMonthlyExpense * 0.95),
        Math.round(avgMonthlyExpense * 1.1),
        Math.round(avgMonthlyExpense * 1.0),
      ],
    };
  }

  onEdit(item: Transaction) {
    console.log('Edit action triggered for:', item);
  }

  onDelete(transaction: Transaction) {
    const index = this.transactions.indexOf(transaction);
    if (index > -1) {
      this.transactions.splice(index, 1);
    }
    console.log('Delete transaction:', transaction);
  }
  onSelect(event: { trans_id: string }) {
    this.router.navigate(['/transactions', event.trans_id]);
    console.log(
      this.transactions.find((item: any) => item.trans_id === event.trans_id)?.transactionId || null
    );
  }

  private async loadDashboardStats(): Promise<void> {
    try {
      const response = await firstValueFrom(this.dashboardService.getDashboardStats());
      this.stats = response.data;
    } catch (error) {
      console.error('Failed to load dashboard stats', error);
    }
  }

  ngOnDestroy(): void {
    this.transactionsSub?.unsubscribe();
  }

  private async dispatchTransactions(): Promise<void> {
    try {
      const response = await firstValueFrom(this.transactionsService.getTransactions());
      const transactions =
        (response as { data?: Transaction[] }).data ?? (response as Transaction[]);
      this.store.dispatch(loadTransactions({ transactions }));
    } catch (error) {
      console.error('Failed to load transactions', error);
    }
  }
}
