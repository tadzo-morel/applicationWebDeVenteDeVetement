import { Component } from '@angular/core';
import { ShopLeftSidebar } from '../shop-left-sidebar/shop-left-sidebar';

/**
 * Variante de ShopLeftSidebar.
 * Reutilise integralement le composant principal pour assurer la coherence.
 */
@Component({
  selector: 'app-shop-fullwidth',
  standalone: true,
  imports: [ShopLeftSidebar],
  template: '<app-shop-left-sidebar></app-shop-left-sidebar>'
})
export class ShopFullwidth {}
