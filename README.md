# React Fitness E-commerce Demo

Historical SoftUni React project originally built as **Gorilla Gainz**.

This is a React 16 single-page e-commerce demo for browsing fitness products, logging in, managing a profile, and using admin-only product management workflows. It is kept as a portfolio/archive project that shows early React, routing, session handling, REST API calls, conditional UI, form validation, and product CRUD work.

## What It Demonstrates

- React class-component application structure.
- React Router page routing.
- Conditional navigation based on logged-in state.
- Session storage based authentication state.
- Product catalogue and product detail pages.
- Admin-only product creation, update, and deletion.
- Profile image editing.
- YouTube media page integration.
- jQuery AJAX service layer for Kinvey-style REST endpoints.
- UI feedback through a custom notification helper.
- Styling with CSS, Bootstrap, React Bootstrap, and Ant Design components.
- GitHub Pages deployment configuration.

## Tech Stack

- React 16
- JavaScript
- React Router / React Router DOM
- React Bootstrap / Bootstrap
- Ant Design
- jQuery AJAX
- Kinvey-style REST API integration
- React YouTube
- GitHub Pages
- Create React App / `react-scripts@1.1.4`

## Main Routes

- `/` and `/home` - media/home page
- `/about` - about/comment-style page
- `/login` - login
- `/register` - registration
- `/catalogue` - product catalogue
- `/product-view/:id` - product detail and admin edit/delete
- `/user-profile` - profile view/update
- `/update` - update route placeholder

## Project Structure

```text
src/
  routes/       page-level routes
  components/   navbar, product cards, product creator, media helpers
  services/     auth, product, profile, remote API, notifications
  style/        app-specific CSS and image assets
```

## Running Locally

This project was built with Create React App 1 and old dependency versions. A modern Node version may not install or build it cleanly without using an older Node/npm environment.

```bash
npm install
npm start
```

Then open:

```text
http://localhost:3000
```

## Deployment

The project includes a GitHub Pages deployment script:

```bash
npm run deploy
```

The `homepage` field points to:

```text
https://BorisThoris.github.io/react-fitness-ecommerce-demo
```

## Security / Backend Note

The original student project used a Kinvey backend. Historical app keys/secrets have been removed from the source and replaced with placeholders. To run the backend-backed flows, provide your own Kinvey-compatible app key and secret in `src/services/remote.js`.

Because this is an archived portfolio project, the original hosted backend may no longer exist.

## Status

Archived portfolio project. The goal of this repository is to show early React application work, not to represent current production practices.

Known limitations:

- Old React/Create React App dependency stack.
- Backend configuration is intentionally removed.
- Some code and naming reflect its 2019 student-project origin.
- No modernization/refactor pass has been applied.
