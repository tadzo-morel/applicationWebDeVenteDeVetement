import { Component, OnInit, inject, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';
import { FcfaPipe } from '../../core/pipes/fcfa.pipe';
import { CartService } from '../../shared/cart.service';
import { WishlistService } from '../../shared/whislist.service';

interface Review {
  id: number;
  user: string;
  city: string;
  rating: number;
  date: string;
  text: string;
}

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer, FcfaPipe],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.css'
})
export class ProductDetail implements OnInit {
  private route = inject(ActivatedRoute);
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);

  productId = signal<string | null>(null);
  quantity = signal(1);
  selectedSize = signal<string>('');
  selectedColor = signal<string>('');
  activeTab = signal<'description' | 'specs' | 'reviews'>('description');
  mainImage = signal('');

  product = {
    id: 1,
    name: 'Cardigan Casual Femme',
    sku: 'BS-CARD-001',
    price: 25000,
    oldPrice: 32000,
    discount: 22,
    rating: 4.5,
    reviewCount: 128,
    inStock: true,
    stockCount: 12,
    category: 'Tops & T-shirts',
    brand: 'blogSite Cameroun',
    description: `Le cardigan casual blogSite Cameroun est l'allie parfait pour vos tenues du quotidien comme pour vos sorties chic. Coupe ample et confortable, tissu doux et respirant adapte au climat camerounais. Disponible en plusieurs couleurs et tailles.`,
    longDescription: `Notre cardigan casual est concu pour offrir un confort optimal toute la journee. La matiere premium (60% coton, 35% polyester, 5% elasthanne) assure une excellente tenue et une grande durabilite. Le coton bio respecte votre peau et l'environnement.

Caracteristiques cles :
- Coupe ample et fluide
- Manches longues avec poignets cotes
- Boutonnage devant
- 2 poches plaquees fonctionnelles
- Coloris : Noir, Blanc, Rouge
- Lavable en machine a 30°C
- Fabrique selon les normes etiques

Ideal pour : Tenues casual chic, bureau, sorties weekend, saisons fraiches.`,
    specs: [
      { label: 'Marque', value: 'blogSite Cameroun' },
      { label: 'Reference', value: 'BS-CARD-001' },
      { label: 'Composition', value: '60% coton, 35% polyester, 5% elasthanne' },
      { label: 'Entretien', value: 'Lavage machine 30°C' },
      { label: 'Pays de fabrication', value: 'Cameroun' },
      { label: 'Garantie', value: '7 jours satisfait ou rembourse' },
      { label: 'Livraison', value: '24-48h Douala/Yaounde, 5j toutes regions' }
    ]
  };

  images = [
    'assets/images/product-detail-page/women-dress-1.jpg',
    'assets/images/product-detail-page/women-dress-2.jpg',
    'assets/images/product-detail-page/women-dress-3.jpg',
    'assets/images/product-detail-page/women-dress-4.jpg',
    'assets/images/product-detail-page/women-dress-5.jpg'
  ];

  sizes = ['XS', 'S', 'M', 'L', 'XL'];
  colors = [
    { name: 'Noir', hex: '#000000' },
    { name: 'Blanc', hex: '#ffffff' },
    { name: 'Rouge', hex: '#d32f2f' }
  ];

  reviews: Review[] = [
    { id: 1, user: 'Sandra K.', city: 'Douala', rating: 5, date: '15 avril 2026', text: 'Tres beau cardigan, la matiere est de qualite et la coupe parfaite. Livraison ultra rapide a Bonapriso !' },
    { id: 2, user: 'Marie N.', city: 'Yaounde', rating: 4, date: '8 avril 2026', text: 'Je suis satisfaite. Petite remarque : la couleur rouge est un peu plus claire que sur la photo.' },
    { id: 3, user: 'Aicha M.', city: 'Bafoussam', rating: 5, date: '2 avril 2026', text: 'Parfait ! Conforme aux photos, taille fidele. Je recommande blogSite Cameroun.' }
  ];

  relatedProducts = [
    { id: 2, name: 'Robe a manches longues', price: 18000, image: 'assets/images/product-images/product-image2.jpg', hoverImage: 'assets/images/product-images/product-image2-1.jpg', rating: 5 },
    { id: 5, name: 'Robe de soiree elegante', price: 35000, oldPrice: 45000, image: 'assets/images/product-images/product-image5.jpg', rating: 5 },
    { id: 8, name: 'Veste blazer Femme', price: 28000, image: 'assets/images/product-images/product-image3.jpg', hoverImage: 'assets/images/product-images/product-image3-1.jpg', rating: 4.5 },
    { id: 10, name: 'Jupe plissee mi-longue', price: 16500, image: 'assets/images/product-images/product-image5.jpg', rating: 4.5 }
  ];

  ratingDistribution = computed(() => {
    const counts = [0, 0, 0, 0, 0];
    this.reviews.forEach(r => counts[5 - Math.round(r.rating)]++);
    const total = this.reviews.length || 1;
    return counts.map((c, i) => ({ stars: 5 - i, count: c, percent: Math.round((c / total) * 100) }));
  });

  ngOnInit() {
    this.productId.set(this.route.snapshot.paramMap.get('id'));
    this.mainImage.set(this.images[0]);
    this.selectedColor.set(this.colors[0].hex);
  }

  setMainImage(img: string) { this.mainImage.set(img); }

  setSize(s: string) { this.selectedSize.set(s); }
  setColor(c: string) { this.selectedColor.set(c); }
  setTab(t: 'description' | 'specs' | 'reviews') { this.activeTab.set(t); }

  increment() { this.quantity.update(q => Math.min(q + 1, this.product.stockCount)); }
  decrement() { this.quantity.update(q => Math.max(1, q - 1)); }

  addToCart() {
    this.cartService.addToCart({
      id: this.product.id,
      name: this.product.name,
      price: this.product.price,
      quantity: this.quantity(),
      image: this.mainImage(),
      size: this.selectedSize() || undefined,
      color: this.selectedColor() || undefined
    });
  }

  buyNow() {
    this.addToCart();
    if (typeof window !== 'undefined') window.location.href = '/checkout';
  }

  toggleWishlist() {
    if (this.wishlistService.isInWishlist(this.product.id)) {
      this.wishlistService.removeFromWishlist(this.product.id);
    } else {
      this.wishlistService.addToWishlist({
        id: this.product.id, name: this.product.name,
        price: this.product.price, image: this.mainImage()
      });
    }
  }

  isInWishlist() { return this.wishlistService.isInWishlist(this.product.id); }

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
