import { Component } from '@angular/core';
import { Cart } from '../cart/cart';

/**
 * Variante de Cart.
 * Reutilise integralement le composant principal pour assurer la coherence.
 */
@Component({
  selector: 'app-cart-style2',
  standalone: true,
  imports: [Cart],
  template: '<app-cart></app-cart>'
})
export class CartStyle2 {}
