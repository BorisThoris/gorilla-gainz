# Gorilla Gainz

An independent fitness-store concept built from the original React project. Browse six locally illustrated products, filter the collection, inspect gear, build a persistent bag and complete a clearly marked practice checkout. No payments, deliveries or external account services are involved.

## Run

```powershell
npm install
npm start
npm run build
$env:CI='true'; npm test -- --runInBand
```

The production output is `build/`. Serve it with SPA history fallback at the domain root. Product detail URLs support direct loads and refreshes; the root-based asset paths target the existing Cloudflare Pages deployment.

The original React16/Create React App1 toolchain remains. `scripts/run-react.cjs` applies its OpenSSL compatibility flag on modern Node. `CI=true` makes its historical test runner exit instead of entering watch mode.

## Try the store

- Products: browse Strength, Mobility and Accessories, search, set a maximum price and sort numerically.
- Product pages: inspect a product and add a quantity to the bag. The bag persists locally, supports quantity changes/removal and computes current catalogue totals.
- Complete demo order: produces a receipt for that visit and clears the bag. No address, card, email or password is requested.
- Login / Profile: choose a local Shopper or Store editor session. Editor mode retains the original create/update/delete workflow, with editable drafts, image previews, validation, cancellation and removal confirmation. This is a demonstration role selector, not production authorization.
- Catalogue changes persist in `gorilla-gainz-products-v1`; the bag uses `gorilla-gainz-bag-v1`. Existing valid catalogue data is retained. Storage failures preserve the current draft and report a failure instead of pretending a save succeeded.

## Implementation and artwork

`src/store/Store.jsx` contains the current React Router storefront and class components. `src/store/bag.js` owns bag persistence; `src/services/productsService.js` retains the product API and validates writes. The original gorilla image, green photographic background, Media / Products navigation and sidebar catalogue are retained. The original training video is available from Media; it loads only when the visitor chooses Play. Historical route components remain in source.

`public/gear/` contains six original SVG product illustrations, reproducible with `node scripts/generate-gear-art.cjs`. They are illustrations of fictional catalogue items, not third-party product photographs. Catalogue browsing makes no external asset request. Playing the original training video explicitly loads YouTube.

Barlow Condensed and DM Sans are self-hosted under `public/fonts/`, with their SIL Open Font License files. Originals: https://github.com/google/fonts/tree/main/ofl/barlowcondensed and https://github.com/google/fonts/tree/main/ofl/dmsans.

## Verification

Production build and five product/bag regression tests pass. Actual desktop browser checks cover filtering, sorting, detail refresh, persistent quantities/totals, checkout receipt and editor create/edit/cancel/delete/reload. Mobile routes at390x844 are checked for overflow. Current screenshots and acceptance details are delivered in the repository refinement workspace.

This remains a local-data portfolio store. A real commerce backend, secure identity, inventory, payments and fulfilment are outside its demo scope.

