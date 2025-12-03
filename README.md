# Mika Dessert Website

A React + Vite experience for Mika Dessert's cake atelier, featuring routed pages for the home story, menu, atelier background, and concierge contact.

## Available scripts

```bash
npm install   # install dependencies
npm run dev   # start Vite dev server on http://localhost:5173
npm run build # create production build in dist/
npm run preview # preview the production build
```

## Project structure

```
public/          # static assets (logo, favicon)
src/
  components/    # shared UI pieces
  pages/         # routed views (Home, Menu, About, Contact)
  data/          # products + shop metadata
  styles/        # global styles
```

## Tech stack

- React 18 with React Router 6
- Vite for dev server + build
- CSS modules via a single global sheet for boutique art direction

## Customization tips

- Update `src/data/products.js` to modify product cards, quotes, or contact info.
- Drop new assets inside `public/assets` and reference them with `/assets/<file>` paths.
- Adjust the palette or layout tokens in `src/styles/global.css`.
