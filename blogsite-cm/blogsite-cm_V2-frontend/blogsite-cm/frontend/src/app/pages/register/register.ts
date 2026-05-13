import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { AuthService } from '../../core/services/auth.service';
import { cameroonPhoneValidator } from '../../core/validators/cameroon-phone.validator';

function passwordMatchValidator(group: AbstractControl): ValidationErrors | null {
  const password = group.get('password')?.value;
  const confirmPassword = group.get('confirmPassword')?.value;
  return password && confirmPassword && password !== confirmPassword ? { mismatch: true } : null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Header, Footer],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  errorMsg = signal<string | null>(null);

  registerForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required, Validators.minLength(2)]],
    lastName: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.email]],
    phone: ['', [Validators.required, cameroonPhoneValidator]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]],
    acceptTerms: [false, [Validators.requiredTrue]]
  }, { validators: passwordMatchValidator });

  onSubmit() {
    if (this.registerForm.invalid) return;
    this.loading.set(true);
    this.errorMsg.set(null);

    const v = this.registerForm.getRawValue();
    this.auth.register({
      firstName: v.firstName,
      lastName: v.lastName,
      email: v.email || undefined,
      phone: v.phone,
      password: v.password
    }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/my-account']);
      },
      error: err => {
        this.loading.set(false);
        this.errorMsg.set(err?.error?.message || 'Erreur lors de l\'inscription. Verifiez vos informations.');
      }
    });
  }
}
