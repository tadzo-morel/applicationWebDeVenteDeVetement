import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { CartService } from '../../shared/cart.service';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { FcfaPipe } from '../../core/pipes/fcfa.pipe';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterLink, TranslateModule, Header, Footer, FcfaPipe],
  templateUrl: './cart.html',
  styleUrl: './cart.css'
})
export class Cart {
  private cartService = inject(CartService);

  readonly items = this.cartService.items;
  readonly subtotal = computed(() => this.cartService.getTotal());
  readonly shipping = computed(() => this.subtotal() > 50000 ? 0 : 2500);
  readonly tva = computed(() => Math.round(this.subtotal() * 0.1925));
  readonly total = computed(() => this.subtotal() + this.shipping() + this.tva());

  updateQuantity(id: number, qty: number, size?: string, color?: string): void {
    if (qty < 1) return;
    this.cartService.updateQuantity(id, qty, size, color);
  }

  removeItem(id: number, size?: string, color?: string): void {
    this.cartService.removeFromCart(id, size, color);
  }

  clearCart(): void {
    this.cartService.clearCart();
  }
}
