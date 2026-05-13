import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { FcfaPipe } from '../../core/pipes/fcfa.pipe';
import { CartService } from '../../shared/cart.service';
import { WishlistService } from '../../shared/whislist.service';

interface ShopProduct {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviewCount: number;
  category: string;
  gender: 'femme' | 'homme' | 'enfant' | 'unisexe';
  colors: string[];
  sizes: string[];
  inStock: boolean;
  badge?: 'sale' | 'new' | 'hot';
}

type SortKey = 'pertinence' | 'prix-asc' | 'prix-desc' | 'note' | 'nouveau';

@Component({
  selector: 'app-shop-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, FormsModule, Header, Footer, FcfaPipe],
  templateUrl: './shop-left-sidebar.html',
  styleUrl: './shop-left-sidebar.css'
})
export class ShopLeftSidebar implements OnInit {
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);

  // Filtres
  searchQuery = signal('');
  selectedCategory = signal<string>('');
  selectedGender = signal<string>('');
  selectedColors = signal<Set<string>>(new Set());
  selectedSizes = signal<Set<string>>(new Set());
  priceMin = signal(0);
  priceMax = signal(100000);
  sortBy = signal<SortKey>('pertinence');
  currentPage = signal(1);
  itemsPerPage = 9;

  categories = [
    { value: 'robes', label: 'Robes' },
    { value: 'tops', label: 'Tops & T-shirts' },
    { value: 'pantalons', label: 'Pantalons' },
    { value: 'jupes', label: 'Jupes' },
    { value: 'vestes', label: 'Vestes' },
    { value: 'chemises', label: 'Chemises' },
    { value: 'costumes', label: 'Costumes' },
    { value: 'sacs', label: 'Sacs' },
    { value: 'chaussures', label: 'Chaussures' },
    { value: 'bijoux', label: 'Bijoux' }
  ];

  allColors = [
    { name: 'Noir', hex: '#000000' },
    { name: 'Blanc', hex: '#ffffff' },
    { name: 'Rouge', hex: '#d32f2f' },
    { name: 'Bleu', hex: '#1976d2' },
    { name: 'Vert', hex: '#388e3c' },
    { name: 'Jaune', hex: '#fbc02d' },
    { name: 'Rose', hex: '#e91e63' },
    { name: 'Beige', hex: '#d2b48c' },
    { name: 'Marron', hex: '#5d4037' }
  ];

  allSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '38', '40', '42', '44'];

  // Catalogue produits avec prix FCFA
  products: ShopProduct[] = [
    { id: 1, name: 'Cardigan Casual Femme', price: 25000, oldPrice: 32000, image: 'assets/images/product-images/product-image1.jpg', hoverImage: 'assets/images/product-images/product-image1-1.jpg', rating: 4.5, reviewCount: 128, category: 'tops', gender: 'femme', colors: ['#000', '#fff', '#d32f2f'], sizes: ['S', 'M', 'L'], inStock: true, badge: 'new' },
    { id: 2, name: 'Robe a manches longues', price: 18000, image: 'assets/images/product-images/product-image2.jpg', hoverImage: 'assets/images/product-images/product-image2-1.jpg', rating: 5, reviewCount: 256, category: 'robes', gender: 'femme', colors: ['#1a1a1a', '#8B4513'], sizes: ['XS', 'S', 'M', 'L'], inStock: true },
    { id: 3, name: 'Jean Slim Fit Homme', price: 22000, oldPrice: 28000, image: 'assets/images/product-images/product-image3.jpg', hoverImage: 'assets/images/product-images/product-image3-1.jpg', rating: 4.5, reviewCount: 89, category: 'pantalons', gender: 'homme', colors: ['#1a1a1a', '#0d47a1'], sizes: ['38', '40', '42', '44'], inStock: true, badge: 'sale' },
    { id: 4, name: 'Costume affaires Homme', price: 65000, image: 'assets/images/product-images/product-image4.jpg', hoverImage: 'assets/images/product-images/product-image4-1.jpg', rating: 5, reviewCount: 42, category: 'costumes', gender: 'homme', colors: ['#1a1a1a', '#37474f'], sizes: ['M', 'L', 'XL'], inStock: true, badge: 'hot' },
    { id: 5, name: 'Robe de soiree elegante', price: 35000, oldPrice: 45000, image: 'assets/images/product-images/product-image5.jpg', rating: 5, reviewCount: 167, category: 'robes', gender: 'femme', colors: ['#000', '#e91e63'], sizes: ['XS', 'S', 'M'], inStock: true, badge: 'sale' },
    { id: 6, name: 'Chemise en lin Homme', price: 15000, image: 'assets/images/product-images/product-image1.jpg', hoverImage: 'assets/images/product-images/product-image1-1.jpg', rating: 4, reviewCount: 65, category: 'chemises', gender: 'homme', colors: ['#fff', '#d2b48c'], sizes: ['M', 'L', 'XL'], inStock: true },
    { id: 7, name: 'Sac a main cuir Premium', price: 42000, image: 'assets/images/product-images/product-image2.jpg', hoverImage: 'assets/images/product-images/product-image2-1.jpg', rating: 4.5, reviewCount: 98, category: 'sacs', gender: 'femme', colors: ['#5d4037', '#000'], sizes: [], inStock: true },
    { id: 8, name: 'Veste blazer Femme', price: 28000, image: 'assets/images/product-images/product-image3.jpg', hoverImage: 'assets/images/product-images/product-image3-1.jpg', rating: 4.5, reviewCount: 73, category: 'vestes', gender: 'femme', colors: ['#1a1a1a', '#fff', '#d2b48c'], sizes: ['S', 'M', 'L'], inStock: true },
    { id: 9, name: 'T-shirt graphique Homme', price: 8500, image: 'assets/images/product-images/product-image4.jpg', hoverImage: 'assets/images/product-images/product-image4-1.jpg', rating: 4, reviewCount: 145, category: 'tops', gender: 'homme', colors: ['#1a1a1a', '#fff'], sizes: ['S', 'M', 'L', 'XL'], inStock: true },
    { id: 10, name: 'Jupe plissee mi-longue', price: 16500, image: 'assets/images/product-images/product-image5.jpg', rating: 4.5, reviewCount: 56, category: 'jupes', gender: 'femme', colors: ['#1a1a1a', '#5d4037', '#e91e63'], sizes: ['XS', 'S', 'M'], inStock: true },
    { id: 11, name: 'Chaussures cuir Homme', price: 38000, image: 'assets/images/product-images/product-image1.jpg', rating: 5, reviewCount: 87, category: 'chaussures', gender: 'homme', colors: ['#5d4037', '#1a1a1a'], sizes: ['40', '42', '44'], inStock: true },
    { id: 12, name: 'Collier perles', price: 12000, oldPrice: 15000, image: 'assets/images/product-images/product-image2.jpg', rating: 4.5, reviewCount: 124, category: 'bijoux', gender: 'femme', colors: ['#fff'], sizes: [], inStock: true, badge: 'sale' }
  ];

  // Filtrage
  filteredProducts = computed(() => {
    let result = [...this.products];
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      result = result.filter(p => p.name.toLowerCase().includes(q));
    }
    if (this.selectedCategory()) {
      result = result.filter(p => p.category === this.selectedCategory());
    }
    if (this.selectedGender()) {
      result = result.filter(p => p.gender === this.selectedGender());
    }
    const colors = this.selectedColors();
    if (colors.size) {
      result = result.filter(p => p.colors.some(c => colors.has(c)));
    }
    const sizes = this.selectedSizes();
    if (sizes.size) {
      result = result.filter(p => p.sizes.some(s => sizes.has(s)));
    }
    result = result.filter(p => p.price >= this.priceMin() && p.price <= this.priceMax());

    switch (this.sortBy()) {
      case 'prix-asc': result.sort((a, b) => a.price - b.price); break;
      case 'prix-desc': result.sort((a, b) => b.price - a.price); break;
      case 'note': result.sort((a, b) => b.rating - a.rating); break;
      case 'nouveau': result.sort((a, b) => b.id - a.id); break;
    }
    return result;
  });

  paginatedProducts = computed(() => {
    const start = (this.currentPage() - 1) * this.itemsPerPage;
    return this.filteredProducts().slice(start, start + this.itemsPerPage);
  });

  totalPages = computed(() => Math.max(1, Math.ceil(this.filteredProducts().length / this.itemsPerPage)));

  pageNumbers = computed(() => {
    const total = this.totalPages();
    return Array.from({ length: total }, (_, i) => i + 1);
  });

  ngOnInit() {
    this.route.queryParams.subscribe(p => {
      if (p['q']) this.searchQuery.set(p['q']);
      if (p['cat']) this.selectedCategory.set(p['cat']);
      if (p['category']) this.selectedGender.set(p['category']);
    });
  }

  toggleColor(color: string) {
    const newSet = new Set(this.selectedColors());
    newSet.has(color) ? newSet.delete(color) : newSet.add(color);
    this.selectedColors.set(newSet);
    this.currentPage.set(1);
  }

  toggleSize(size: string) {
    const newSet = new Set(this.selectedSizes());
    newSet.has(size) ? newSet.delete(size) : newSet.add(size);
    this.selectedSizes.set(newSet);
    this.currentPage.set(1);
  }

  setCategory(cat: string) {
    this.selectedCategory.set(this.selectedCategory() === cat ? '' : cat);
    this.currentPage.set(1);
  }

  setGender(g: string) {
    this.selectedGender.set(this.selectedGender() === g ? '' : g);
    this.currentPage.set(1);
  }

  resetFilters() {
    this.searchQuery.set('');
    this.selectedCategory.set('');
    this.selectedGender.set('');
    this.selectedColors.set(new Set());
    this.selectedSizes.set(new Set());
    this.priceMin.set(0);
    this.priceMax.set(100000);
    this.sortBy.set('pertinence');
    this.currentPage.set(1);
  }

  goToPage(p: number) {
    if (p < 1 || p > this.totalPages()) return;
    this.currentPage.set(p);
    if (typeof window !== 'undefined') window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  addToCart(p: ShopProduct, ev: Event) {
    ev.stopPropagation();
    this.cartService.addToCart({ id: p.id, name: p.name, price: p.price, quantity: 1, image: p.image });
  }

  toggleWishlist(p: ShopProduct, ev: Event) {
    ev.stopPropagation();
    if (this.wishlistService.isInWishlist(p.id)) {
      this.wishlistService.removeFromWishlist(p.id);
    } else {
      this.wishlistService.addToWishlist({ id: p.id, name: p.name, price: p.price, image: p.image });
    }
  }

  isInWishlist(id: number) { return this.wishlistService.isInWishlist(id); }

  getStarsArray(rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) stars.push('full');
      else if (i - 0.5 <= rating) stars.push('half');
      else stars.push('empty');
    }
    return stars;
  }
}
