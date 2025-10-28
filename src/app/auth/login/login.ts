import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, ToastrModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  toastr = inject(ToastrService);
  router = inject(Router);
  fb = inject(FormBuilder);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(e?: Event): void {
    const { email, password } = this.loginForm.value;
    e?.preventDefault();
    if (email === 'admin@gmail.com' && password === 'password') {
      this.toastr.success('Login successful!', 'Welcome back!');
      this.router.navigate(['/dashboard']);
    } else {
      this.toastr.error('Error!', 'Invalid email or password.');
    }
    console.log('Login attempted with', email, password);
  }
}
