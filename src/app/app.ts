import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Header } from './components/header/header';

@Component({
  selector: 'app-root',
  imports: [Header],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  router = inject(Router);
  protected readonly title = signal('FinTrackr');

  get isLoginPage(): boolean {
    return this.router.url.includes('login');
  }
}
