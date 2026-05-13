import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Header } from '../../layout/header/header';
import { Footer } from '../../layout/footer/footer';

interface FaqItem {
  q: string;
  a: string;
}

interface FaqCategory {
  title: string;
  icon: string;
  items: FaqItem[];
}

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [CommonModule, RouterLink, Header, Footer],
  templateUrl: './faq.html',
  styleUrl: './faq.css'
})
export class Faq {
  searchQuery = signal('');
  openItem = signal<string | null>(null);

  categories: FaqCategory[] = [
    {
      title: 'Commandes & Livraison',
      icon: 'an-truck',
      items: [
        { q: 'Quels sont les delais de livraison au Cameroun ?', a: 'A Douala et Yaounde, nous livrons en 24-48h ouvrees. Pour les autres regions (Bafoussam, Garoua, Maroua, Bertoua, Ngaoundere, Bamenda, Buea, Ebolowa), comptez 3 a 5 jours ouvres. Vous recevez un SMS de confirmation a chaque etape.' },
        { q: 'Quels sont les frais de livraison ?', a: 'La livraison est offerte des 50 000 FCFA d\'achat. En dessous : 1 500 FCFA pour Douala/Yaounde, 2 500 FCFA pour les autres villes principales, 4 000 FCFA pour les zones rurales.' },
        { q: 'Puis-je suivre ma commande ?', a: 'Oui, des l\'expedition vous recevez un SMS et un email avec un numero de suivi. Vous pouvez aussi consulter le statut en temps reel dans votre espace "Mes commandes".' },
        { q: 'Livrez-vous en dehors du Cameroun ?', a: 'Pour le moment, nous livrons exclusivement au Cameroun. Une expansion vers le Tchad, le Gabon et la RCA est prevue pour fin 2026.' }
      ]
    },
    {
      title: 'Paiement',
      icon: 'an-credit-card',
      items: [
        { q: 'Quels modes de paiement acceptez-vous ?', a: 'Nous acceptons MTN Mobile Money, Orange Money, et le paiement a la livraison (espece uniquement, disponible a Douala et Yaounde).' },
        { q: 'Le paiement par MTN MoMo est-il securise ?', a: 'Oui. Notre integration utilise l\'API officielle MTN qui chiffre toutes les transactions. Vous recevez un SMS de confirmation MoMo et nous ne stockons jamais votre code secret.' },
        { q: 'Puis-je payer en plusieurs fois ?', a: 'Le paiement en plusieurs fois est disponible pour les commandes superieures a 100 000 FCFA. Contactez-nous via WhatsApp pour plus d\'informations.' },
        { q: 'Comment recuperer une facture ?', a: 'Apres chaque commande livree, une facture en PDF est disponible dans votre espace "Mes commandes". Vous pouvez aussi la recevoir par email sur demande.' }
      ]
    },
    {
      title: 'Retours & Remboursements',
      icon: 'an-redo',
      items: [
        { q: 'Quelle est votre politique de retour ?', a: 'Vous disposez de 7 jours apres reception pour retourner un article non porte, dans son emballage d\'origine. Le remboursement est effectue sous 5 jours ouvres apres reception du retour.' },
        { q: 'Comment faire un retour ?', a: 'Connectez-vous a votre compte, allez dans "Mes commandes", cliquez sur "Demander un retour" sur la commande concernee. Notre equipe vous contactera pour organiser le ramassage gratuit.' },
        { q: 'Quels articles ne sont pas retournables ?', a: 'Les sous-vetements, maillots de bain, bijoux personnalises et produits en promotion finale ne peuvent pas etre retournes pour des raisons d\'hygiene et commerciales.' },
        { q: 'Comment serai-je rembourse ?', a: 'Le remboursement se fait sur le mode de paiement initial : credit MTN MoMo, Orange Money, ou virement bancaire pour les paiements a la livraison.' }
      ]
    },
    {
      title: 'Mon compte',
      icon: 'an-user',
      items: [
        { q: 'Comment creer un compte ?', a: 'Cliquez sur l\'icone Compte en haut a droite, puis sur "Inscription". Vous avez besoin d\'un numero de telephone camerounais valide (+237) et d\'un mot de passe d\'au moins 8 caracteres.' },
        { q: 'J\'ai oublie mon mot de passe', a: 'Sur la page de connexion, cliquez sur "Mot de passe oublie". Vous recevrez un SMS avec un code pour reinitialiser votre mot de passe.' },
        { q: 'Comment supprimer mon compte ?', a: 'Conformement a la loi camerounaise n° 2024/017, vous pouvez supprimer votre compte a tout moment depuis "Mon compte > Securite > Supprimer mon compte". La suppression est definitive sous 30 jours.' }
      ]
    },
    {
      title: 'Tailles & Produits',
      icon: 'an-tag',
      items: [
        { q: 'Comment choisir la bonne taille ?', a: 'Chaque page produit affiche un guide des tailles detaille. Mesurez-vous avec un metre souple et comparez aux dimensions indiquees. En cas de doute, contactez-nous via WhatsApp avant de commander.' },
        { q: 'Les produits sont-ils authentiques ?', a: 'Tous nos produits sont neufs et authentiques, fabriques par nos partenaires locaux ou importes via les canaux officiels. Une facture certifiee accompagne chaque commande.' },
        { q: 'Y a-t-il des differences entre photos et produits reels ?', a: 'Les photos sont prises dans nos studios avec un eclairage neutre. Les couleurs peuvent legerement varier selon les ecrans. Les dimensions sont systematiquement controlees.' }
      ]
    }
  ];

  toggleItem(id: string) {
    this.openItem.set(this.openItem() === id ? null : id);
  }

  filterItem(item: FaqItem): boolean {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return true;
    return item.q.toLowerCase().includes(q) || item.a.toLowerCase().includes(q);
  }
}
