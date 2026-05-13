import { Component } from '@angular/core';
import { BlogLeftSidebar } from '../blog-left-sidebar/blog-left-sidebar';

/**
 * Variante de BlogLeftSidebar.
 * Reutilise integralement le composant principal pour assurer la coherence.
 */
@Component({
  selector: 'app-blog-right-sidebar',
  standalone: true,
  imports: [BlogLeftSidebar],
  template: '<app-blog-left-sidebar></app-blog-left-sidebar>'
})
export class BlogRightSidebar {}
