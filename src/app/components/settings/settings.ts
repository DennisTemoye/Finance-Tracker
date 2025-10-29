import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-settings',
  imports: [ReactiveFormsModule],
  templateUrl: './settings.html',
  styleUrl: './settings.css',
})
export class SettingsComponent implements OnInit {
  router = inject(Router);
  fb = inject(FormBuilder);
  toast = inject(ToastrService);

  profileForm!: FormGroup;

  ngOnInit(): void {
    this.initForms();
  }

  initForms() {
    this.profileForm = this.fb.group({
      name: ['Admin User', Validators.required],
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
      phone: ['+234 801 234 5678', Validators.required],
      company: ['FinTrackr Ltd', Validators.required],
      location: ['Lagos, Nigeria'],
      bio: [''],
    });
  }

  onProfileSubmit() {
    if (this.profileForm.valid) {
      console.log('Profile updated:', this.profileForm.value);
      this.toast.success('Profile updated successfully!', 'Success');
    } else {
      this.toast.error('Please fill in all required fields', 'Error');
    }
  }
}
