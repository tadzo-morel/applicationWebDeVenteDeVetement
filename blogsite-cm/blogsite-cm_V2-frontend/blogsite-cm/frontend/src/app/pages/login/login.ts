import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Header, Footer],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  private fb = inject(FormBuilder);
  private auth = inject(AuthService);
  private router = inject(Router);

  loading = signal(false);
  errorMsg = signal<string | null>(null);
  showPassword = signal(false);

  loginForm = this.fb.nonNullable.group({
    identifier: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(8)]],
    rememberMe: [false]
  });

  togglePassword() { this.showPassword.update(v => !v); }

  onSubmit() {
    if (this.loginForm.invalid) return;
    this.loading.set(true);
    this.errorMsg.set(null);

    const { identifier, password } = this.loginForm.getRawValue();
    this.auth.login({ identifier, password }).subscribe({
      next: () => {
        this.loading.set(false);
        this.router.navigate(['/my-account']);
      },
      error: err => {
        this.loading.set(false);
        this.errorMsg.set(err?.error?.message || 'Identifiants invalides. Verifiez votre email/telephone et votre mot de passe.');
      }
    });
  }
}
