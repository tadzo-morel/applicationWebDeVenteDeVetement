// Utilitaires partages
export class Utils {

  // Debounce function pour limiter les appels
  static debounce(func: Function, wait: number) {
    let timeout: any;
    return function executedFunction(...args: any[]) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }

  // Formatage de prix en FCFA (Franc CFA - XAF)
  static formatPrice(price: number): string {
    if (price == null || isNaN(Number(price))) {
      return '';
    }
    const n = Math.round(Number(price));
    return `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
  }

  // Formatage court : 25000 -> "25k FCFA"
  static formatPriceShort(price: number): string {
    const n = Math.round(Number(price));
    if (n >= 1_000_000) {
      return `${(n / 1_000_000).toFixed(1).replace('.0', '')}M FCFA`;
    }
    if (n >= 1_000) {
      return `${(n / 1_000).toFixed(1).replace('.0', '')}k FCFA`;
    }
    return `${n} FCFA`;
  }

  // Generation d'etoiles pour les notes
  static generateRating(rating: number): string {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const emptyStars = 5 - Math.ceil(rating);

    let stars = '';
    for (let i = 0; i < fullStars; i++) stars += '★';
    if (halfStar) stars += '½';
    for (let i = 0; i < emptyStars; i++) stars += '☆';

    return stars;
  }
}
