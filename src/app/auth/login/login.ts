import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, NgIf, ToastrModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  toastr = inject(ToastrService);
  router = inject(Router);
  fb = inject(FormBuilder);
  authService = inject(AuthService);

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login(e?: Event): void {
    const { email, password } = this.loginForm.value;
    e?.preventDefault();
    if (email === '' && password === '') {
      this.toastr.error('Invalid Cred');
      return;
    }

    this.authService.userLogin({ email, password }).subscribe({
      next: (res) => {
        console.log(res);
        this.authService.saveToken(res.data.accessToken);

        this.toastr.success('Login successful!', 'Welcome back!');
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.log(err.error.message);
        this.toastr.error('Error!', 'Invalid email or password.');
      },
    });
  }
}
