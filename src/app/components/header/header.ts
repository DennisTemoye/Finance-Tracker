import { NgIf } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavItem } from '../nav-item/nav-item';
@Component({
  selector: 'app-header',
  imports: [NgIf, RouterOutlet, NavItem],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  router = inject(Router);
  protected readonly title = signal('FinTrackr');

  get isLoginPage(): boolean {
    return this.router.url.includes('login');
  }
  role = 'Admin';
}
