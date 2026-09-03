// Metadata inputs for this repository - unique to react-fitness-ecommerce-demo.
//
// Everything here is curated by hand. Derived facts (stack, metrics, git,
// screenshots) are computed by scripts/generate-project-meta.mjs, which writes
// project.meta.json. Run it with:
//   npm run meta          regenerate project.meta.json
//   npm run meta:check    fail if project.meta.json is stale

import path from 'node:path';

// Screenshots are captured by the portfolio (npm run capture there). Point
// PORTFOLIO_ROOT elsewhere, or drop images in ./project-media, to override.
const portfolioRoot = process.env.PORTFOLIO_ROOT ?? String.raw`C:\Users\Gaming PC\Desktop\Repos\portfolio`;

export default {
  slug: "gorilla-gainz",
  classification: "web-app",

  curated: {
    "title": "Gorilla Gainz",
    "subtitle": "Fitness ecommerce archive",
    "description": "An archived React ecommerce demo with product browsing and backend calls replaced by demo-safe placeholders.",
    "tags": [
      "React",
      "Ecommerce",
      "Archive"
    ],
    "accent": "#facc15",
    "deploymentUrl": "https://gorilla-gainz-git.pages.dev/",
    "localUrl": "http://127.0.0.1:4113/",
    "buildCommand": "npm run build",
    "buildOutput": "build",
    "serveBasePath": "/react-fitness-ecommerce-demo",
    "runCommand": "npm start",
    "devPort": 4113,
    "showcaseTier": "showcase",
    "showcaseOrder": 9
  },

  // How the portfolio screenshot pipeline photographs this project.
  capture: {
    "route": "/"
  },

  scores: {
    "priorityScore": 82,
    "demoabilityScore": 66,
    "depthScore": 58,
    "polishScore": 58,
    "uniquenessScore": 54,
    "maintenanceScore": 52
  },

  analysisNotes:
    "Archived ecommerce demo with product browsing; kept in the quieter section because it is older and less differentiated.",

  // Where the link-preview card lives: the page head that carries the Open
  // Graph tags, and the static directory the image is published from.
  social: {
    "htmlFile": "public/index.html",
    "staticDir": "public",
    "imageName": "og-image.jpg",
    "imageUrlPath": "/og-image.jpg"
  },

  media: {
    sourceDir: path.join(portfolioRoot, "public", "project-shots", "gorilla-gainz", "latest"),
    publicPathPrefix: "/project-shots/gorilla-gainz/latest",
    primaryProfile: "card"
  }
};
