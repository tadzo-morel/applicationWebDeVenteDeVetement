# blogSite Cameroun

Plateforme e-commerce mode adaptee au marche camerounais.

## Caracteristiques

- **Devise** : Franc CFA (XAF) avec TVA 19,25 %
- **Paiement** : MTN Mobile Money, Orange Money, paiement a la livraison
- **Livraison** : 10 regions du Cameroun, 18 villes pre-configurees
- **Validation** : numeros de telephone +237
- **Langues** : Francais et Anglais (i18n)
- **Conformite** : lois camerounaises 2010/012, 2010/013, 2024/017

## Stack technique

| Couche | Technologies |
|--------|-------------|
| Frontend | Angular 20, PrimeNG 20, ngx-translate |
| Backend | Spring Boot 3.2, Java 17, JWT, Flyway |
| Base de donnees | MySQL 8 |
| Conteneurisation | Docker 29 (Compose v2) |
| Web server | Nginx 1.27 |

## Demarrage rapide

```powershell
# Premier demarrage
copy .env.example .env
docker compose up -d --build

# Acceder au site
# http://localhost:4200
```

Compte admin par defaut : `admin@blogsite.cm` / `Admin@123`

Documentation complete : [docs/SETUP.md](docs/SETUP.md)

## Pages disponibles

- Accueil avec hero, nouveautes, offres avec compte a rebours, categories, temoignages
- Boutique avec filtres avances (prix, couleurs, tailles, categories)
- Detail produit avec galerie, options, avis clients
- Lookbook avec inspiration mode par occasion
- Blog avec articles, commentaires, categories
- Panier avec calcul TVA et livraison
- Checkout avec MTN MoMo / Orange Money / paiement a la livraison
- Mon compte avec profil, commandes, adresses, securite
- FAQ, Confidentialite, CGV (conformes loi camerounaise)
- Connexion / Inscription avec validateur +237

## Structure

```
blogsite-cm/
├── backend/           Spring Boot 3.2 (30+ classes Java)
├── frontend/          Angular 20 (50+ composants)
├── docs/              Documentation
├── docker-compose.yml Orchestration
└── .env.example       Variables d'environnement
```

## Licence

Projet prive. Tous droits reserves a BLOGSITE SARL, Douala, Cameroun.
