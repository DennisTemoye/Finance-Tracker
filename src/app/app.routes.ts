import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login';
import { DashboardComponent } from './components/dashboard/dashboard';
import { AccountsComponent } from './components/accounts/pages/list/accounts';
import { ReportsComponent } from './components/reports/reports';
import { SettingsComponent } from './components/settings/settings';

import { AccountsRoutes } from './components/accounts/accounts.routes';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  { path: 'dashboard', component: DashboardComponent },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./components/accounts/accounts.routes').then((m) => m.AccountsRoutes),
  },
  {
    path: 'transactions',
    loadChildren: () =>
      import('./components/transactions/transactions.routes').then((m) => m.transactionsRoutes),
  },
  { path: 'reports', component: ReportsComponent },
  { path: 'settings', component: SettingsComponent },
];
