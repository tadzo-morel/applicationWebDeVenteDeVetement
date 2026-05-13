import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

interface LookItem {
  id: number;
  title: string;
  category: 'casual' | 'soiree' | 'business' | 'plage' | 'traditionnel';
  image: string;
  description: string;
  location: string;
  productIds: number[];
}

@Component({
  selector: 'app-lookbook-columns3',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer],
  templateUrl: './lookbook-columns3.html',
  styleUrl: './lookbook-columns3.css'
})
export class LookbookColumns3 {
  selectedCategory = signal<string>('');

  categories = [
    { value: '', label: 'Tous les looks' },
    { value: 'casual', label: 'Casual' },
    { value: 'soiree', label: 'Soiree' },
    { value: 'business', label: 'Business' },
    { value: 'plage', label: 'Plage' },
    { value: 'traditionnel', label: 'Traditionnel' }
  ];

  looks: LookItem[] = [
    { id: 1, title: 'Style Bureau Yaounde', category: 'business', image: 'assets/images/product-detail-page/women-dress-1.jpg', description: 'Look professionnel adapte au climat camerounais', location: 'Yaounde', productIds: [1, 8] },
    { id: 2, title: 'Soiree Bonapriso', category: 'soiree', image: 'assets/images/product-detail-page/women-dress-2.jpg', description: 'Robe elegante pour vos sorties chic', location: 'Douala', productIds: [5] },
    { id: 3, title: 'Weekend Detente', category: 'casual', image: 'assets/images/product-detail-page/women-dress-3.jpg', description: 'Look casual confortable et tendance', location: 'Akwa', productIds: [1, 9] },
    { id: 4, title: 'Plage Kribi', category: 'plage', image: 'assets/images/product-detail-page/women-dress-4.jpg', description: 'Selection plage et bord de mer', location: 'Kribi', productIds: [2] },
    { id: 5, title: 'Mariage Traditionnel', category: 'traditionnel', image: 'assets/images/product-detail-page/women-dress-5.jpg', description: 'Tenue elegante pour mariage camerounais', location: 'Bafoussam', productIds: [4, 7] },
    { id: 6, title: 'Brunch Akwa', category: 'casual', image: 'assets/images/product-images/product-image1.jpg', description: 'Tenue parfaite pour vos brunchs dominicaux', location: 'Douala', productIds: [10, 12] },
    { id: 7, title: 'Apero Bali', category: 'soiree', image: 'assets/images/product-images/product-image2.jpg', description: 'Look chic pour vos apero entre amis', location: 'Bonanjo', productIds: [5, 7] },
    { id: 8, title: 'Reunion Affaires Douala', category: 'business', image: 'assets/images/product-images/product-image3.jpg', description: 'Costume professionnel masculin', location: 'Bonanjo', productIds: [4, 11] },
    { id: 9, title: 'Vacances Limbe', category: 'plage', image: 'assets/images/product-images/product-image4.jpg', description: 'Tenues plage cote Atlantique', location: 'Limbe', productIds: [2, 6] }
  ];

  filteredLooks = computed(() => {
    const cat = this.selectedCategory();
    if (!cat) return this.looks;
    return this.looks.filter(l => l.category === cat);
  });

  setCategory(c: string) { this.selectedCategory.set(c); }
}
