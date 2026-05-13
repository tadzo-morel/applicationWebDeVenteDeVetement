import { Component, inject, signal, computed, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive, Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService } from '../../core/services/auth.service';
import { CartService } from '../../shared/cart.service';
import { WishlistService } from '../../shared/whislist.service';
import { LanguageSwitcher } from '../../shared/components/language-switcher/language-switcher';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive, TranslateModule, LanguageSwitcher],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  protected auth = inject(AuthService);
  protected cartService = inject(CartService);
  protected wishlistService = inject(WishlistService);
  private router = inject(Router);

  mobileMenuOpen = signal(false);
  searchOpen = signal(false);
  searchQuery = signal('');
  openDropdown = signal<string | null>(null);

  cartCount = computed(() => this.cartService.items().reduce((acc, i) => acc + i.quantity, 0));
  wishlistCount = computed(() => this.wishlistService.items().length);

  toggleMobileMenu() {
    this.mobileMenuOpen.update(v => !v);
  }

  toggleSearch() {
    this.searchOpen.update(v => !v);
  }

  onSearch(event: Event) {
    event.preventDefault();
    const q = this.searchQuery().trim();
    if (q) {
      this.router.navigate(['/shop'], { queryParams: { q } });
      this.searchOpen.set(false);
    }
  }

  showDropdown(name: string) {
    this.openDropdown.set(name);
  }

  hideDropdown() {
    this.openDropdown.set(null);
  }

  toggleDropdown(name: string) {
    this.openDropdown.update(v => v === name ? null : name);
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/']);
  }

  // Fermer dropdowns au clic dehors
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.has-dropdown') && !target.closest('.icon-btn')) {
      this.openDropdown.set(null);
    }
  }
}
