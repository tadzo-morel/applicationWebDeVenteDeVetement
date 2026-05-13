import { Component, inject, signal, computed, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../shared/cart.service';
import { ApiService } from '../../core/services/api.service';
import { AuthService } from '../../core/services/auth.service';
import { cameroonPhoneValidator, normalizeCmPhone } from '../../core/validators/cameroon-phone.validator';
import { Region, City } from '../../core/models/location.models';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { FcfaPipe } from '../../core/pipes/fcfa.pipe';

type PaymentMethod = 'mtn_momo' | 'orange_money' | 'cod';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, Header, Footer, FcfaPipe],
  templateUrl: './checkout.html',
  styleUrl: './checkout.css'
})
export class Checkout implements OnInit {
  private fb = inject(FormBuilder);
  private cartService = inject(CartService);
  private api = inject(ApiService);
  private auth = inject(AuthService);
  private router = inject(Router);

  readonly items = this.cartService.items;
  readonly subtotal = computed(() => this.cartService.getTotal());
  readonly shipping = computed(() => this.subtotal() > 50000 ? 0 : 2500);
  readonly tva = computed(() => Math.round(this.subtotal() * 0.1925));
  readonly total = computed(() => this.subtotal() + this.shipping() + this.tva());

  regions = signal<Region[]>([]);
  cities = signal<City[]>([]);
  loading = signal(false);
  errorMessage = signal<string | null>(null);

  paymentMethod = signal<PaymentMethod>('mtn_momo');

  form = this.fb.nonNullable.group({
    firstName: ['', [Validators.required]],
    lastName: ['', [Validators.required]],
    email: ['', [Validators.email]],
    phone: ['', [Validators.required, cameroonPhoneValidator]],
    regionId: [0, [Validators.required, Validators.min(1)]],
    city: ['', [Validators.required]],
    address: ['', [Validators.required]],
    notes: ['']
  });

  ngOnInit(): void {
    const user = this.auth.currentUser();
    if (user) {
      this.form.patchValue({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email ?? '',
        phone: user.phone
      });
    }

    this.api.get<Region[]>('/regions').subscribe({
      next: rs => this.regions.set(rs),
      error: () => this.regions.set([])
    });
  }

  onRegionChange(regionId: number): void {
    if (!regionId) {
      this.cities.set([]);
      return;
    }
    this.api.get<City[]>(`/regions/${regionId}/cities`).subscribe({
      next: cs => this.cities.set(cs),
      error: () => this.cities.set([])
    });
  }

  selectPayment(method: PaymentMethod): void {
    this.paymentMethod.set(method);
  }

  submit(): void {
    if (this.form.invalid || this.items().length === 0) {
      return;
    }
    this.loading.set(true);
    this.errorMessage.set(null);

    const v = this.form.getRawValue();
    const payload = {
      customer: {
        firstName: v.firstName,
        lastName: v.lastName,
        email: v.email || null,
        phone: normalizeCmPhone(v.phone)
      },
      shipping: {
        regionId: v.regionId,
        city: v.city,
        address: v.address,
        notes: v.notes
      },
      payment: { method: this.paymentMethod() },
      items: this.items().map(i => ({
        productId: i.id,
        quantity: i.quantity,
        unitPrice: i.price,
        size: i.size,
        color: i.color
      })),
      totals: {
        subtotal: this.subtotal(),
        tva: this.tva(),
        shipping: this.shipping(),
        total: this.total()
      }
    };

    // Demo: en production, POST /api/v1/orders
    setTimeout(() => {
      this.cartService.clearCart();
      this.loading.set(false);
      this.router.navigate(['/checkout-success']);
    }, 1200);
  }
}
