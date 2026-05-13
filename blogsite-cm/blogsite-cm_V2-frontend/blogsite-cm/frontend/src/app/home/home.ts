import { Component, OnInit, OnDestroy, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../layout/header/header';
import { Footer } from '../layout/footer/footer';
import { WhatsappFab } from '../shared/components/whatsapp-fab/whatsapp-fab';
import { FcfaPipe } from '../core/pipes/fcfa.pipe';
import { CartService } from '../shared/cart.service';
import { WishlistService } from '../shared/whislist.service';
import { ApiService } from '../core/services/api.service';

interface HomeProduct {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  image: string;
  hoverImage?: string;
  rating: number;
  reviewCount: number;
  badge?: 'sale' | 'new' | 'hot' | 'exclusive';
  discount?: string;
  colors: string[];
  category: 'all' | 'femme' | 'homme' | 'enfants' | 'accessoires';
}

interface OfferItem {
  id: number;
  name: string;
  price: number;
  oldPrice: number;
  image: string;
  discount: string;
  category: string;
  cta: 'buy' | 'explore' | 'discover';
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer, WhatsappFab, FcfaPipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home implements OnInit, OnDestroy {
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private api = inject(ApiService);

  // Filtres onglets
  activeTab = signal<'all' | 'femme' | 'homme' | 'enfants' | 'accessoires'>('all');

  // Compte a rebours pour les offres (24h)
  days = signal('00');
  hours = signal('00');
  minutes = signal('00');
  seconds = signal('00');
  private timerId: ReturnType<typeof setInterval> | null = null;

  // Heros
  heroBanner = {
    image: 'assets/images/slideshow-banners/home2-banner1.jpg',
    smallTitle: 'Collection ete 2026',
    title: 'Escapade',
    titleAccent: 'Balneaire',
    cta: 'Decouvrir',
    link: '/shop'
  };

  // Garanties (4 icones)
  guarantees = [
    { icon: 'an-truck', title: 'Livraison gratuite', subtitle: 'A partir de 50 000 FCFA' },
    { icon: 'an-redo', title: 'Retour facile', subtitle: '7 jours pour changer d\'avis' },
    { icon: 'an-shield', title: 'Paiement securise', subtitle: 'MTN MoMo, Orange Money' },
    { icon: 'an-tag', title: 'Discount sale', subtitle: 'Promotions chaque semaine' }
  ];

  // Onglets
  tabs = [
    { id: 'all' as const, label: 'Tous' },
    { id: 'femme' as const, label: 'Femme' },
    { id: 'homme' as const, label: 'Homme' },
    { id: 'enfants' as const, label: 'Enfants' },
    { id: 'accessoires' as const, label: 'Accessoires' }
  ];

  // Produits "Fresh Arrivals" - prix en FCFA adaptes au marche camerounais
  products: HomeProduct[] = [
    {
      id: 1,
      name: 'Cardigan Casual Femme',
      price: 25000,
      oldPrice: 32000,
      image: 'assets/images/product-images/product-image1.jpg',
      hoverImage: 'assets/images/product-images/product-image1-1.jpg',
      rating: 4.5,
      reviewCount: 128,
      badge: 'new',
      discount: '-22%',
      colors: ['#000', '#fff', '#d32f2f'],
      category: 'femme'
    },
    {
      id: 2,
      name: 'Robe a manches longues',
      price: 18000,
      image: 'assets/images/product-images/product-image2.jpg',
      hoverImage: 'assets/images/product-images/product-image2-1.jpg',
      rating: 5,
      reviewCount: 256,
      badge: 'exclusive',
      colors: ['#1a1a1a', '#8B4513', '#C0C0C0', '#FFD700'],
      category: 'femme'
    },
    {
      id: 3,
      name: 'Jean Slim Fit Homme',
      price: 22000,
      oldPrice: 28000,
      image: 'assets/images/product-images/product-image3.jpg',
      hoverImage: 'assets/images/product-images/product-image3-1.jpg',
      rating: 4.5,
      reviewCount: 89,
      badge: 'sale',
      discount: '-21%',
      colors: ['#1a1a1a', '#2c3e50', '#0d47a1', '#5d4037'],
      category: 'homme'
    },
    {
      id: 4,
      name: 'Costume affaires Homme',
      price: 65000,
      image: 'assets/images/product-images/product-image4.jpg',
      hoverImage: 'assets/images/product-images/product-image4-1.jpg',
      rating: 5,
      reviewCount: 42,
      badge: 'hot',
      colors: ['#1a1a1a', '#37474f', '#5d4037'],
      category: 'homme'
    }
  ];

  // Filtre dynamique
  filteredProducts = computed(() => {
    const tab = this.activeTab();
    if (tab === 'all') return this.products;
    return this.products.filter(p => p.category === tab);
  });

  // Great Offers (3 cartes promo)
  offers: OfferItem[] = [
    {
      id: 101,
      name: 'Robe de Soiree',
      price: 19000,
      oldPrice: 25000,
      image: 'assets/images/product-images/product-image5.jpg',
      discount: '-24%',
      category: 'Femme',
      cta: 'buy'
    },
    {
      id: 102,
      name: 'Looks Detresse',
      price: 12500,
      oldPrice: 18000,
      image: 'assets/images/product-images/product-image2-1.jpg',
      discount: '-30%',
      category: 'Streetwear',
      cta: 'explore'
    },
    {
      id: 103,
      name: 'Accessoires Luxe',
      price: 24000,
      oldPrice: 35000,
      image: 'assets/images/product-images/product-image3-1.jpg',
      discount: '-31%',
      category: 'Best Seller',
      cta: 'discover'
    }
  ];

  // Categories (Femme / Homme / Plage)
  categories = [
    {
      label: 'NOTRE COLLECTION',
      title: 'FEMME',
      image: 'assets/images/collection/home2-collection1.jpg',
      link: '/shop?category=femme',
      large: false
    },
    {
      label: 'NOTRE COLLECTION',
      title: 'HOMME',
      image: 'assets/images/collection/home2-collection2.jpg',
      link: '/shop?category=homme',
      large: false
    },
    {
      label: 'NOTRE COLLECTION',
      title: 'PLAGE',
      image: 'assets/images/collection/home2-collection3.jpg',
      link: '/shop?category=plage',
      large: true
    }
  ];

  // Marques (placeholder - 6 logos)
  brands = [
    { name: 'MTN MoMo', icon: 'an-mobile' },
    { name: 'Orange Money', icon: 'an-mobile-alt' },
    { name: 'Visa', icon: 'an-credit-card' },
    { name: 'Mastercard', icon: 'an-credit-card-alt' },
    { name: 'PayPal', icon: 'an-wallet' },
    { name: 'WhatsApp', icon: 'an-whatsapp' }
  ];

  // Temoignages
  testimonials = [
    {
      id: 1,
      name: 'Camille Mvondo',
      city: 'Douala',
      avatar: 'assets/images/product-detail-page/women-dress-1.jpg',
      rating: 5,
      text: 'blogSite Cameroun est devenu mon site prefere pour mes achats mode. La qualite des vetements et la rapidite de livraison sont exceptionnelles. Je recommande !'
    },
    {
      id: 2,
      name: 'Jean-Paul Etoo',
      city: 'Yaounde',
      avatar: 'assets/images/product-detail-page/women-dress-2.jpg',
      rating: 5,
      text: 'Service client tres reactif via WhatsApp. Paiement par MoMo super pratique. Mon costume m\'a ete livre en moins de 24h !'
    },
    {
      id: 3,
      name: 'Aminatou Bello',
      city: 'Garoua',
      avatar: 'assets/images/product-detail-page/women-dress-3.jpg',
      rating: 4.5,
      text: 'Tres satisfaite. Les couleurs des produits correspondent aux photos et les tailles sont fideles. Livraison nationale appreciee.'
    }
  ];

  activeTestimonial = signal(0);

  // Stats
  stats = [
    { value: '50K+', label: 'Clients satisfaits' },
    { value: '4.9/5', label: 'Note moyenne' },
    { value: '98%', label: 'Recommandent blogSite' }
  ];

  ngOnInit() {
    this.startCountdown();
    // Optionnel : pre-charger les regions du backend (utile pour le footer / checkout)
    this.api.get<unknown[]>('/regions').subscribe({
      next: regions => console.log(`Backend OK - ${regions.length} regions chargees`),
      error: () => console.log('Backend non joignable - mode demo active')
    });
  }

  ngOnDestroy() {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  setTab(tab: 'all' | 'femme' | 'homme' | 'enfants' | 'accessoires') {
    this.activeTab.set(tab);
  }

  setTestimonial(index: number) {
    this.activeTestimonial.set(index);
  }

  addToCart(product: HomeProduct, event: Event) {
    event.stopPropagation();
    this.cartService.addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image
    });
  }

  toggleWishlist(product: HomeProduct, event: Event) {
    event.stopPropagation();
    if (this.wishlistService.isInWishlist(product.id)) {
      this.wishlistService.removeFromWishlist(product.id);
    } else {
      this.wishlistService.addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image
      });
    }
  }

  isInWishlist(productId: number): boolean {
    return this.wishlistService.isInWishlist(productId);
  }

  getStarsArray(rating: number): ('full' | 'half' | 'empty')[] {
    const stars: ('full' | 'half' | 'empty')[] = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) stars.push('full');
      else if (i - 0.5 <= rating) stars.push('half');
      else stars.push('empty');
    }
    return stars;
  }

  // Compte a rebours sur 24h glissantes
  private startCountdown() {
    const target = new Date();
    target.setDate(target.getDate() + 1);
    target.setHours(0, 0, 0, 0);

    const update = () => {
      const now = new Date().getTime();
      const distance = target.getTime() - now;

      if (distance < 0) {
        target.setDate(target.getDate() + 1);
        return;
      }

      const d = Math.floor(distance / (1000 * 60 * 60 * 24));
      const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const s = Math.floor((distance % (1000 * 60)) / 1000);

      this.days.set(d.toString().padStart(2, '0'));
      this.hours.set(h.toString().padStart(2, '0'));
      this.minutes.set(m.toString().padStart(2, '0'));
      this.seconds.set(s.toString().padStart(2, '0'));
    };

    update();
    this.timerId = setInterval(update, 1000);
  }
}
