import { NgIf } from '@angular/common';
import { Component, inject, Input, OnInit, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavItem } from '../nav-item/nav-item';
@Component({
  selector: 'app-header',
  imports: [NgIf, RouterOutlet, NavItem],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header implements OnInit {
  router = inject(Router);
  protected readonly title = signal('FinTrackr');

  role = 'Admin';

  isMobile = false;
  get isLoginPage(): boolean {
    return this.router.url.includes('login');
  }

  ngOnInit(): void {
    this.checkViewport();
    window.addEventListener('resize', () => this.checkViewport());
  }
  checkViewport() {
    this.isMobile = window.innerWidth < 1024; // block below 1024px width
  }
}
