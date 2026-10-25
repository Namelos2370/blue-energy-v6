# Blue Energy

Boutique streetwear « Designed in Cameroon » — Next.js 16 (App Router), React 19, Tailwind 4.

## Lancer le projet

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # build de production
```

## Structure

- `app/` : layout, page d'accueil (`page.tsx`) et styles globaux
- `components/` : `ProductModal`, `CheckoutForm` (commande via WhatsApp), `AdminDashboard`, `ChatBot`
- `data/store.ts` : types (`Product`, `CartItem`, `PromoCode`, `Category`) et catalogue initial
- `public/` : logo et images produits

## Fonctionnement

- Commande envoyée par message WhatsApp (pas de paiement en ligne).
- Stock, panier et codes promo sauvegardés dans le `localStorage` du navigateur (pas de backend).
- Administration : bouton « Admin » dans le pied de page.
