import { Injectable, signal } from '@angular/core';

export interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  size?: string;
  color?: string;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cartItems = signal<CartItem[]>([]);
  readonly items = this.cartItems.asReadonly();

  constructor() {
    this.loadCart();
  }

  private loadCart() {
    if (typeof localStorage === 'undefined') return;
    const saved = localStorage.getItem('cart');
    if (saved) {
      try {
        this.cartItems.set(JSON.parse(saved));
      } catch {
        this.cartItems.set([]);
      }
    }
  }

  private saveCart() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('cart', JSON.stringify(this.cartItems()));
  }

  addToCart(item: CartItem) {
    const currentItems = this.cartItems();
    const existingItem = currentItems.find(
      i => i.id === item.id && i.size === item.size && i.color === item.color
    );

    if (existingItem) {
      const newItems = currentItems.map(i =>
        i.id === item.id && i.size === item.size && i.color === item.color
          ? { ...i, quantity: i.quantity + item.quantity }
          : i
      );
      this.cartItems.set(newItems);
    } else {
      this.cartItems.set([...currentItems, { ...item }]);
    }

    this.saveCart();
    this.showNotification('Produit ajoute au panier !');
  }

  removeFromCart(itemId: number, size?: string, color?: string) {
    const filtered = this.cartItems().filter(
      item => !(item.id === itemId && item.size === size && item.color === color)
    );
    this.cartItems.set(filtered);
    this.saveCart();
  }

  updateQuantity(itemId: number, quantity: number, size?: string, color?: string) {
    if (quantity < 1) return;
    const newItems = this.cartItems().map(i =>
      i.id === itemId && i.size === size && i.color === color
        ? { ...i, quantity }
        : i
    );
    this.cartItems.set(newItems);
    this.saveCart();
  }

  getTotal(): number {
    return this.cartItems().reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  getItemCount(): number {
    return this.cartItems().reduce((count, item) => count + item.quantity, 0);
  }

  clearCart() {
    this.cartItems.set([]);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('cart');
    }
  }

  private showNotification(message: string) {
    if (typeof document === 'undefined') return;
    const notification = document.createElement('div');
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 90px;
      right: 20px;
      background: #ee6c4d;
      color: white;
      padding: 12px 20px;
      border-radius: 4px;
      z-index: 9999;
      font-weight: 600;
      box-shadow: 0 4px 12px rgba(0,0,0,.15);
    `;
    document.body.appendChild(notification);
    setTimeout(() => notification.remove(), 2500);
  }
}
