import { Component } from '@angular/core';
import { Cart } from '../cart/cart';

@Component({
  selector: 'app-empty-cart',
  standalone: true,
  imports: [Cart],
  template: '<app-cart></app-cart>'
})
export class EmptyCart {}
