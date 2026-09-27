# e-plantShopping — Paradise Nursery

A React and Redux Toolkit shopping application for the IBM Developing Front-End Apps with React final project.

**Live application:** https://jwillz7667.github.io/e-plantShopping/

## Features

- Welcome page with a background image, company introduction, and Get Started button.
- Eighteen plants arranged into three collections of six unique plants.
- Redux cart with add, remove, and quantity updates; quantities and dollar totals stay synchronized throughout navigation.
- Product buttons turn gray and become disabled after adding an item. Removing the item allows it to be added again.
- Cart with thumbnails, names, unit prices, subtotals, total plant count, and total cost.
- Decreasing a quantity to zero removes the item; quantities are limited to 99 per plant.
- Continue Shopping and Home navigation preserve the current cart.
- Checkout displays the required Coming Soon message. This educational demo does not process orders or payments.
- Responsive layouts, keyboard-accessible controls, focus handling, and screen-reader announcements.

## Run locally

Use Node.js 24.16 or newer in the Node 24 LTS release line.

```sh
npm ci
npm run dev
```

Open the local address printed by Vite, including `/e-plantShopping/`.

```sh
npm test
npm run lint
npm run build
npm run preview
```

## Deployment

The Vite base path is `/e-plantShopping/`. `npm run build && npm run deploy` publishes the production `dist` directory to the `gh-pages` branch. Configure GitHub Pages to serve that branch from its root.

## Implementation

`App.jsx` controls the welcome page. `ProductList.jsx` renders the catalog and shared navigation. `CartItem.jsx` renders the cart. `CartSlice.jsx` holds Redux actions, validates quantities, resolves canonical catalog prices, and computes totals using integer cents. `store.js` supplies the global store through React Redux's Provider.

The cart lasts for the current page session. It is intentionally not persisted after a browser reload. Prices and inventory are demonstration data.

## Attribution

Adapted from the IBM Skills Network [e-plantShopping starter](https://github.com/ibm-developer-skills-network/e-plantShopping). Original license retained in `LICENSE`.

The botanical illustrations and greenhouse background in `public/images` are original vector artwork created for this project. They are stylized illustrations, not photographs, and require no external image service.
