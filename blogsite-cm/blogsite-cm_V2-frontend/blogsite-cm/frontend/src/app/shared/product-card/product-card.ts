import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FcfaPipe } from '../../core/pipes/fcfa.pipe';

export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviewCount?: number;
  badge?: 'sale' | 'new' | 'hot';
  discount?: string;
  colors?: string[];
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterLink, FcfaPipe],
  templateUrl: './product-card.html',
  styleUrl: './product-card.css'
})
export class ProductCard {
  @Input() product!: Product;
  @Input() isInWishlist = false;
  
  @Output() addToCart = new EventEmitter<Product>();
  @Output() addToWishlist = new EventEmitter<Product>();
  @Output() quickView = new EventEmitter<Product>();
  @Output() colorSelected = new EventEmitter<{product: Product, color: string}>();

  selectedColor: string | null = null;

  getStars(): number[] {
    return [1, 2, 3, 4, 5];
  }

  getStarType(star: number): string {
    if (star <= Math.floor(this.product.rating)) {
      return 'filled';
    } else if (star === Math.ceil(this.product.rating) && this.product.rating % 1 !== 0) {
      return 'half';
    }
    return '';
  }

  onAddToCart(event: Event) {
    event.stopPropagation();
    this.addToCart.emit(this.product);
  }

  onAddToWishlist(event: Event) {
    event.stopPropagation();
    this.addToWishlist.emit(this.product);
  }

  onQuickView(event: Event) {
    event.stopPropagation();
    this.quickView.emit(this.product);
  }

  onColorSelect(color: string) {
    this.selectedColor = color;
    this.colorSelected.emit({ product: this.product, color });
  }
}