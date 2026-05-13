import { Component, Input } from '@angular/core';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-whatsapp-fab',
  standalone: true,
  template: `
    <a class="wa-fab" [href]="link" target="_blank" rel="noopener noreferrer"
       aria-label="Discuter sur WhatsApp">
      <svg viewBox="0 0 32 32" width="28" height="28" aria-hidden="true">
        <path fill="#fff" d="M16 .25C7.31.25.25 7.31.25 16c0 2.76.72 5.46 2.1 7.83L.25 31.75l8.07-2.1A15.74 15.74 0 0 0 16 31.75C24.69 31.75 31.75 24.69 31.75 16S24.69.25 16 .25Zm0 28.5c-2.39 0-4.74-.65-6.79-1.88l-.49-.29-4.78 1.25 1.27-4.66-.32-.5A12.7 12.7 0 0 1 3.25 16c0-7.03 5.72-12.75 12.75-12.75S28.75 8.97 28.75 16 23.03 28.75 16 28.75Zm7.04-9.55c-.39-.2-2.31-1.14-2.66-1.27-.36-.13-.62-.19-.88.19-.26.39-1.01 1.27-1.24 1.53-.23.26-.46.29-.85.1-.39-.19-1.65-.61-3.15-1.94-1.16-1.04-1.95-2.32-2.18-2.71-.23-.39-.02-.6.17-.79.17-.17.39-.46.58-.68.19-.23.26-.39.39-.65.13-.26.06-.49-.03-.68-.1-.19-.88-2.13-1.21-2.91-.32-.77-.65-.66-.88-.67-.23-.01-.49-.01-.75-.01-.26 0-.68.1-1.04.49s-1.37 1.34-1.37 3.27 1.4 3.79 1.6 4.05c.19.26 2.76 4.21 6.69 5.91 3.93 1.7 3.93 1.13 4.64 1.06.71-.07 2.31-.94 2.64-1.85.32-.91.32-1.69.23-1.85-.1-.16-.36-.26-.75-.46Z"/>
      </svg>
    </a>
  `,
  styles: [`
    :host { position: fixed; bottom: 24px; right: 24px; z-index: 1000; }
    .wa-fab {
      display: flex; align-items: center; justify-content: center;
      width: 56px; height: 56px;
      background: #25D366; border-radius: 50%;
      box-shadow: 0 4px 12px rgba(0,0,0,.25);
      transition: transform .2s;
      text-decoration: none;
    }
    .wa-fab:hover { transform: scale(1.08); }
  `]
})
export class WhatsappFab {
  @Input() phone: string = environment.whatsappBusinessNumber;
  @Input() message: string = 'Bonjour, je vous contacte depuis blogSite Cameroun.';

  get link(): string {
    return `https://wa.me/${this.phone}?text=${encodeURIComponent(this.message)}`;
  }
}
