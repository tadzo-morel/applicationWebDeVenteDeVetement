import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'fcfa', standalone: true, pure: true })
export class FcfaPipe implements PipeTransform {
  transform(value: number | null | undefined, mode: 'normal' | 'short' = 'normal'): string {
    if (value === null || value === undefined || isNaN(Number(value))) {
      return '';
    }
    const n = Math.round(Number(value));

    if (mode === 'short') {
      if (n >= 1_000_000) {
        return `${(n / 1_000_000).toFixed(1).replace('.0', '')}M FCFA`;
      }
      if (n >= 1_000) {
        return `${(n / 1_000).toFixed(1).replace('.0', '')}k FCFA`;
      }
    }
    return `${n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')} FCFA`;
  }
}
