import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    title: 'blogSite Cameroun - Mode en ligne',
    loadComponent: () => import('./home/home').then(m => m.Home),
    pathMatch: 'full'
  },
  // Boutique
  {
    path: 'shop',
    title: 'Boutique',
    loadComponent: () => import('./shop/shop-left-sidebar/shop-left-sidebar').then(m => m.ShopLeftSidebar)
  },
  {
    path: 'shop/grid-4',
    title: 'Boutique - Grille 4',
    loadComponent: () => import('./shop/shop-grid-4/shop-grid-4').then(m => m.ShopGrid4)
  },
  // Produit
  {
    path: 'product/:id',
    title: 'Detail produit',
    loadComponent: () => import('./product/product-detail/product-detail').then(m => m.ProductDetail)
  },
  // Pages
  {
    path: 'about',
    title: 'A propos',
    loadComponent: () => import('./pages/about-us/about-us').then(m => m.AboutUs)
  },
  {
    path: 'contact',
    title: 'Contact',
    loadComponent: () => import('./pages/contact-us/contact-us').then(m => m.ContactUs)
  },
  {
    path: 'faq',
    title: 'FAQ',
    loadComponent: () => import('./pages/faq/faq').then(m => m.Faq)
  },
  {
    path: 'privacy-policy',
    title: 'Politique de confidentialite',
    loadComponent: () => import('./pages/privacy-policy/privacy-policy').then(m => m.PrivacyPolicy)
  },
  {
    path: 'terms-conditions',
    title: 'Conditions generales',
    loadComponent: () => import('./pages/terms-conditions/terms-conditions').then(m => m.TermsConditions)
  },
  // Blog
  {
    path: 'blog',
    title: 'Blog',
    loadComponent: () => import('./blog/blog-left-sidebar/blog-left-sidebar').then(m => m.BlogLeftSidebar)
  },
  {
    path: 'blog/:slug',
    title: 'Article',
    loadComponent: () => import('./blog/blog-single-post/blog-single-post').then(m => m.BlogSinglePost)
  },
  // Lookbook
  {
    path: 'lookbook',
    title: 'Lookbook',
    loadComponent: () => import('./lookbook/lookbook-columns3/lookbook-columns3').then(m => m.LookbookColumns3)
  },
  // Panier / Commande
  {
    path: 'cart',
    title: 'Panier',
    loadComponent: () => import('./cart/cart/cart').then(m => m.Cart)
  },
  {
    path: 'checkout',
    title: 'Paiement',
    loadComponent: () => import('./checkout/checkout/checkout').then(m => m.Checkout)
  },
  {
    path: 'checkout-success',
    title: 'Commande confirmee',
    loadComponent: () => import('./checkout/checkout-success/checkout-success').then(m => m.CheckoutSuccess)
  },
  // Auth
  {
    path: 'login',
    title: 'Connexion',
    loadComponent: () => import('./pages/login/login').then(m => m.Login)
  },
  {
    path: 'register',
    title: 'Inscription',
    loadComponent: () => import('./pages/register/register').then(m => m.Register)
  },
  // Compte (protected)
  {
    path: 'my-account',
    title: 'Mon compte',
    canActivate: [authGuard],
    loadComponent: () => import('./pages/my-account/my-account').then(m => m.MyAccount)
  },
  // 404
  { path: '**', redirectTo: '' }
];
