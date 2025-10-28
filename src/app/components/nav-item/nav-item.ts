import { NgFor, NgIf, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-nav-item',
  imports: [NgFor, RouterLink, NgClass, RouterLinkActive],
  templateUrl: './nav-item.html',
  styleUrl: './nav-item.css'
})
export class NavItem {
  routerLink = inject(Router);
  items = [
    { link: '/dashboard', label: 'Dashboard', bgClass: 'primary', icon: 'bi-speedometer2', isactive: this.isActiveRoute },
    { link: '/accounts', label: 'Accounts', bgClass: 'info', icon: 'bi-wallet2', isactive: this.isActiveRoute },
    { link: '/transactions', label: 'Transaction', bgClass: 'secondary', icon: 'bi-cash-coin', isactive: this.isActiveRoute },
    { link: '/reports', label: 'Reports', bgClass: 'success', icon: 'bi-bar-chart-line', isactive: this.isActiveRoute },
    { link: '/settings', label: 'Settings', bgClass: 'warning', icon: 'bi-gear', isactive: this.isActiveRoute },

  ];

  get currentRoute(): string {
    return this.routerLink.url;
  }
  isActiveRoute(link: string): boolean {
    return this.routerLink.url.includes(link);
  }

}
