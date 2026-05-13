import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

interface Comment {
  id: number;
  author: string;
  city: string;
  date: string;
  text: string;
  avatar: string;
}

@Component({
  selector: 'app-blog-single-post',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer],
  templateUrl: './blog-single-post.html',
  styleUrl: './blog-single-post.css'
})
export class BlogSinglePost implements OnInit {
  private route = inject(ActivatedRoute);

  slug = signal<string | null>(null);

  post = {
    title: 'Les tendances mode Cameroun 2026',
    image: 'assets/images/blog/post-img1.jpg',
    category: 'Tendances',
    author: 'Camille Mvondo',
    authorBio: 'Styliste et redactrice mode basee a Douala. Passionnee par la mode africaine moderne.',
    date: '5 mai 2026',
    readTime: 5,
    content: `Le secteur de la mode au Cameroun connait une revolution silencieuse en 2026. Entre traditions revisitees, influences mondiales et savoir-faire local, voici les tendances incontournables qui marqueront l'annee.

1. LE RETOUR DES IMPRIMES TRADITIONNELS

Les tissus traditionnels camerounais reviennent en force, mais avec une approche resolument moderne. Le ndop, le toghu et autres motifs ancestraux sont desormais integres dans des coupes contemporaines : robes droites, vestes bombers, chemisiers fluides.

Cette tendance, portee par des createurs locaux comme Imane Ayissi ou Kibonen Nfi, redonne ses lettres de noblesse au patrimoine textile camerounais tout en l'adaptant aux modes de vie urbains.

2. LE CASUAL CHIC AU BUREAU

Le strict tailleur cede la place a un style bureau plus decontracte. Les femmes camerounaises plebiscitent les ensembles fluides, les blazers oversized portes sur des t-shirts neutres, et les pantalons larges en lin ou en coton.

Pour les hommes, la chemise sans col gagne du terrain face a la cravate, surtout dans les startups de Douala et Yaounde.

3. LES COULEURS DE LA SAISON

Trois palettes dominent en 2026 :
- Les terracotta et ocres, en hommage aux paysages du Nord
- Les verts profonds qui evoquent la foret equatoriale
- Les blancs casses et beiges pour la fraicheur tropicale

4. L'ACCESSOIRISATION RESPONSABLE

Les bijoux artisanaux locaux (perles, cuivre, bronze) detroiment progressivement les bijoux de fast-fashion. Les sacs en raphia, en cuir vegetal ou en wax connaissent un vrai regain d'interet.

Les marques locales comme Kreyann ou Ayissi Le Duc proposent des collections capsule a prix abordables.

5. LE CONFORT AVANT TOUT

Apres plusieurs annees marquees par les tendances athleisure mondiales, le Cameroun adopte sa propre version du confort chic : matieres naturelles, coupes amples, et tons chaleureux.

Les sneakers blanches restent reines, mais les sandales en cuir locales gagnent du terrain pour les sorties decontractees.

EN CONCLUSION

La mode au Cameroun en 2026 se veut affirmee, autoctone et accessible. Plus que jamais, elle reflete une fierte identitaire renouvelee, sans renoncer aux influences contemporaines. Restez stylees, et surtout, restez vous-meme !`,
    tags: ['Mode 2026', 'Cameroun', 'Tendances', 'Africain', 'Casual']
  };

  comments: Comment[] = [
    { id: 1, author: 'Sandra K.', city: 'Douala', date: '6 mai 2026', text: 'Super article ! Je suis tout a fait d\'accord avec le retour des imprimes traditionnels. J\'ai justement achete une robe en ndop sur blogSite la semaine derniere.', avatar: 'assets/images/product-detail-page/women-dress-1.jpg' },
    { id: 2, author: 'Marie N.', city: 'Yaounde', date: '6 mai 2026', text: 'Merci pour ces conseils. La palette terracotta me parle beaucoup, je vais explorer ca pour ma garde-robe d\'ete.', avatar: 'assets/images/product-detail-page/women-dress-2.jpg' },
    { id: 3, author: 'Aicha M.', city: 'Bafoussam', date: '7 mai 2026', text: 'Bravo Camille ! Vos articles sont toujours tres bien documentes. Hate de lire le prochain.', avatar: 'assets/images/product-detail-page/women-dress-3.jpg' }
  ];

  relatedPosts = [
    { id: 3, slug: 'mode-saison-pluies-douala', title: 'Bien s\'habiller pendant la saison des pluies', image: 'assets/images/blog/post-img3.jpg', date: '20 avril 2026' },
    { id: 5, slug: 'mode-bureau-yaounde', title: 'Style bureau a Yaounde', image: 'assets/images/blog/post-img2.jpg', date: '10 avril 2026' },
    { id: 4, slug: 'tenues-mariage-traditionnel', title: 'Tenues pour mariage traditionnel', image: 'assets/images/blog/post-img1.jpg', date: '15 avril 2026' }
  ];

  newComment = signal('');
  commenterName = signal('');

  ngOnInit() {
    this.slug.set(this.route.snapshot.paramMap.get('slug'));
  }

  submitComment(e: Event) {
    e.preventDefault();
    if (this.newComment() && this.commenterName()) {
      alert('Votre commentaire a ete soumis et sera modere avant publication.');
      this.newComment.set('');
      this.commenterName.set('');
    }
  }
}
