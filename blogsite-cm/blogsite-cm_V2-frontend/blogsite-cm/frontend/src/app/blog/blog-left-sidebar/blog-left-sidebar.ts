import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: number;
}

@Component({
  selector: 'app-blog-left-sidebar',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer],
  templateUrl: './blog-left-sidebar.html',
  styleUrl: './blog-left-sidebar.css'
})
export class BlogLeftSidebar {
  searchQuery = signal('');
  selectedCategory = signal<string>('');

  posts: BlogPost[] = [
    {
      id: 1,
      slug: 'tendances-mode-cameroun-2026',
      title: 'Les tendances mode Cameroun 2026',
      excerpt: 'Decouvrez les tendances vestimentaires qui marqueront 2026 au Cameroun : couleurs, coupes et accessoires incontournables.',
      image: 'assets/images/blog/post-img1.jpg',
      category: 'Tendances',
      author: 'Camille Mvondo',
      date: '5 mai 2026',
      readTime: 5
    },
    {
      id: 2,
      slug: 'guide-livraison-mtn-momo',
      title: 'Comment payer avec MTN Mobile Money',
      excerpt: 'Tutoriel complet pour effectuer vos achats sur blogSite Cameroun en utilisant MTN MoMo en toute securite.',
      image: 'assets/images/blog/post-img2.jpg',
      category: 'Tutoriels',
      author: 'Equipe blogSite',
      date: '28 avril 2026',
      readTime: 3
    },
    {
      id: 3,
      slug: 'mode-saison-pluies-douala',
      title: 'Bien s\'habiller pendant la saison des pluies',
      excerpt: 'La saison des pluies approche a Douala et Yaounde. Voici notre selection de tenues stylees et adaptees.',
      image: 'assets/images/blog/post-img3.jpg',
      category: 'Conseils',
      author: 'Sophie Nkomo',
      date: '20 avril 2026',
      readTime: 4
    },
    {
      id: 4,
      slug: 'tenues-mariage-traditionnel',
      title: 'Tenues pour mariage traditionnel camerounais',
      excerpt: 'Le kabba et autres tenues traditionnelles : comment les moderniser sans perdre leur essence.',
      image: 'assets/images/blog/post-img1.jpg',
      category: 'Culture',
      author: 'Aminatou Bello',
      date: '15 avril 2026',
      readTime: 6
    },
    {
      id: 5,
      slug: 'mode-bureau-yaounde',
      title: 'Style bureau a Yaounde : guide complet',
      excerpt: 'Restez professionnelle tout en exprimant votre personnalite : nos conseils pour le dress code bureau.',
      image: 'assets/images/blog/post-img2.jpg',
      category: 'Conseils',
      author: 'Jean-Paul Etoo',
      date: '10 avril 2026',
      readTime: 5
    },
    {
      id: 6,
      slug: 'tenues-plage-kribi',
      title: 'Selection mode plage : Kribi et Limbe',
      excerpt: 'Vacances a la cote ? Decouvrez nos meilleures tenues plage et accessoires pour briller au soleil.',
      image: 'assets/images/blog/post-img3.jpg',
      category: 'Tendances',
      author: 'Camille Mvondo',
      date: '2 avril 2026',
      readTime: 4
    }
  ];

  categories = [
    { value: '', label: 'Toutes les categories', count: this.posts.length },
    { value: 'Tendances', label: 'Tendances' },
    { value: 'Conseils', label: 'Conseils' },
    { value: 'Tutoriels', label: 'Tutoriels' },
    { value: 'Culture', label: 'Culture' }
  ];

  filteredPosts = computed(() => {
    let result = [...this.posts];
    const q = this.searchQuery().toLowerCase().trim();
    if (q) {
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    if (this.selectedCategory()) {
      result = result.filter(p => p.category === this.selectedCategory());
    }
    return result;
  });

  recentPosts = computed(() => this.posts.slice(0, 3));

  setCategory(cat: string) { this.selectedCategory.set(cat); }
}
