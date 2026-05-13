import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { cameroonPhoneValidator } from '../../core/validators/cameroon-phone.validator';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Header, Footer],
  templateUrl: './contact-us.html',
  styleUrl: './contact-us.css'
})
export class ContactUs {
  private fb = inject(FormBuilder);
  loading = signal(false);
  successMessage = signal<string | null>(null);

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [cameroonPhoneValidator]],
    subject: ['', [Validators.required]],
    message: ['', [Validators.required, Validators.minLength(10)]]
  });

  submit(): void {
    if (this.form.invalid) {
      return;
    }
    this.loading.set(true);
    setTimeout(() => {
      this.loading.set(false);
      this.successMessage.set('Votre message a bien ete envoye. Nous vous repondrons sous 24h.');
      this.form.reset();
    }, 800);
  }
}
