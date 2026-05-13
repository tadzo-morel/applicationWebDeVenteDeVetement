import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { FcfaPipe } from '../../core/pipes/fcfa.pipe';
import { AuthService } from '../../core/services/auth.service';
import { cameroonPhoneValidator } from '../../core/validators/cameroon-phone.validator';

interface Order {
  id: string;
  date: string;
  total: number;
  status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
  items: number;
  payment: 'mtn_momo' | 'orange_money' | 'cod';
}

@Component({
  selector: 'app-my-account',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink, Header, Footer, FcfaPipe],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css'
})
export class MyAccount implements OnInit {
  private fb = inject(FormBuilder);
  protected auth = inject(AuthService);
  private router = inject(Router);

  activeTab = signal<'profile' | 'orders' | 'addresses' | 'security'>('profile');

  profileForm = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone: ['', [Validators.required, cameroonPhoneValidator]]
  });

  passwordForm = this.fb.nonNullable.group({
    currentPassword: ['', [Validators.required]],
    newPassword: ['', [Validators.required, Validators.minLength(8)]],
    confirmPassword: ['', [Validators.required]]
  });

  saveSuccess = signal<string | null>(null);

  // Demo : commandes fictives
  orders: Order[] = [
    { id: 'BS-20260508-001', date: '8 mai 2026', total: 47500, status: 'delivered', items: 2, payment: 'mtn_momo' },
    { id: 'BS-20260420-005', date: '20 avril 2026', total: 22000, status: 'shipped', items: 1, payment: 'orange_money' },
    { id: 'BS-20260315-012', date: '15 mars 2026', total: 65000, status: 'delivered', items: 3, payment: 'cod' }
  ];

  addresses = [
    {
      id: 1, label: 'Domicile', isDefault: true,
      address: 'Rue Kingue Bell, Akwa', city: 'Douala', region: 'Littoral'
    },
    {
      id: 2, label: 'Bureau', isDefault: false,
      address: 'Bd. de la Liberte, Bonanjo', city: 'Douala', region: 'Littoral'
    }
  ];

  ngOnInit() {
    const user = this.auth.currentUser();
    if (user) {
      this.profileForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email ?? '',
        phone: user.phone
      });
    }
  }

  setTab(t: 'profile' | 'orders' | 'addresses' | 'security') {
    this.activeTab.set(t);
    this.saveSuccess.set(null);
  }

  saveProfile() {
    if (this.profileForm.invalid) return;
    // POST /api/v1/users/me
    this.saveSuccess.set('Profil mis a jour avec succes');
    setTimeout(() => this.saveSuccess.set(null), 3000);
  }

  changePassword() {
    if (this.passwordForm.invalid) return;
    const { newPassword, confirmPassword } = this.passwordForm.getRawValue();
    if (newPassword !== confirmPassword) {
      alert('Les mots de passe ne correspondent pas');
      return;
    }
    this.saveSuccess.set('Mot de passe change avec succes');
    this.passwordForm.reset();
    setTimeout(() => this.saveSuccess.set(null), 3000);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  getStatusLabel(s: Order['status']): string {
    return { pending: 'En attente', shipped: 'Expedie', delivered: 'Livre', cancelled: 'Annule' }[s];
  }

  getPaymentLabel(p: Order['payment']): string {
    return { mtn_momo: 'MTN MoMo', orange_money: 'Orange Money', cod: 'A la livraison' }[p];
  }
}
