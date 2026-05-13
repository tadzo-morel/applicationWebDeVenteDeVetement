import { Component } from '@angular/core';
import { ProductDetail } from '../product-detail/product-detail';

/**
 * Variante de ProductDetail.
 * Reutilise integralement le composant principal pour assurer la coherence.
 */
@Component({
  selector: 'app-product-layout2',
  standalone: true,
  imports: [ProductDetail],
  template: '<app-product-detail></app-product-detail>'
})
export class ProductLayout2 {}
