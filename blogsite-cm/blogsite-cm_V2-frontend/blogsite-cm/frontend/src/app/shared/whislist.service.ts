import { Injectable, signal } from '@angular/core';

export interface WishlistItem {
  id: number;
  name: string;
  price: number;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class WishlistService {
  private wishlistItems = signal<WishlistItem[]>([]);
  readonly items = this.wishlistItems.asReadonly();

  constructor() {
    this.loadWishlist();
  }

  private loadWishlist() {
    if (typeof localStorage === 'undefined') return;
    const saved = localStorage.getItem('wishlist');
    if (saved) {
      try {
        this.wishlistItems.set(JSON.parse(saved));
      } catch {
        this.wishlistItems.set([]);
      }
    }
  }

  private saveWishlist() {
    if (typeof localStorage === 'undefined') return;
    localStorage.setItem('wishlist', JSON.stringify(this.wishlistItems()));
  }

  addToWishlist(item: WishlistItem) {
    const currentItems = this.wishlistItems();
    if (!currentItems.some(i => i.id === item.id)) {
      this.wishlistItems.set([...currentItems, item]);
      this.saveWishlist();
      this.showNotification('Produit ajoute aux favoris !');
    }
  }

  removeFromWishlist(itemId: number) {
    const currentItems = this.wishlistItems();
    const filtered = currentItems.filter(item => item.id !== itemId);
    this.wishlistItems.set(filtered);
    this.saveWishlist();
  }

  isInWishlist(itemId: number): boolean {
    return this.wishlistItems().some(item => item.id === itemId);
  }

  clear() {
    this.wishlistItems.set([]);
    if (typeof localStorage !== 'undefined') {
      localStorage.removeItem('wishlist');
    }
  }

  private showNotification(message: string) {
    if (typeof document === 'undefined') return;
    const notification = document.createElement('div');
    notification.className = 'wishlist-notification';
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #1F4E79;
      color: white;
      padding: 15px 25px;
      border-radius: 4px;
      z-index: 9999;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.remove();
    }, 3000);
  }
}
