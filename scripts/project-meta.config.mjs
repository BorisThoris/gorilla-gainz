// Curated identity and actual local store captures.
import path from 'node:path';
const portfolioRoot = process.env.PORTFOLIO_ROOT ?? String.raw`C:\Users\Gaming PC\Desktop\Repos\portfolio`;
export default {
  "slug": "gorilla-gainz",
  "classification": "web-app",
  "curated": {
    "title": "Gorilla Gainz",
    "subtitle": "Fitness gear, with the original Gorilla Gainz character",
    "description": "A React fitness store with its original gorilla imagery, green backdrop and sidebar catalogue. Browse and filter six illustrated products, inspect details, keep a shopping bag and try a clearly marked demo checkout. A local editor session supports product creation, updates and removal with persistent drafts and catalogue data.",
    "tags": [
      "React",
      "Ecommerce",
      "React Router",
      "Local data"
    ],
    "accent": "#2f6f4e",
    "deploymentUrl": "https://gorilla-gainz-git.pages.dev/",
    "localUrl": "http://127.0.0.1:4514/",
    "buildCommand": "npm run build",
    "buildOutput": "build",
    "runCommand": "node scripts/serve-demo.cjs build 4514",
    "devPort": 4514,
    "showcaseTier": "showcase",
    "showcaseOrder": 9
  },
  "capture": {
    "route": "/catalogue",
    "readySelector": ".gear-card",
    "waitAfterReadyMs": 700
  },
  "scores": {
    "priorityScore": 82,
    "demoabilityScore": 66,
    "depthScore": 58,
    "polishScore": 58,
    "uniquenessScore": 54,
    "maintenanceScore": 52
  },
  "analysisNotes": "Original visual identity and product-management flow preserved, with durable bag, demo checkout, responsive catalogue filters and local illustration assets. Verified complete browser workflow and accessible page structure.",
  "social": {
    "htmlFile": "public/index.html",
    "pageTitle": "Gorilla Gainz",
    "staticDir": "public",
    "imageName": "og-image.jpg",
    "imageUrlPath": "/og-image.jpg"
  },
  "icons": {
    "background": "#1c1917",
    "themeColor": "#1c1917",
    "shortName": "Gorilla Gainz"
  },
  "media": {
    "sourceDir": path.join(portfolioRoot, "public", "project-shots", "gorilla-gainz", "latest"),
    "publicPathPrefix": "/project-shots/gorilla-gainz/latest",
    "primaryProfile": "card"
  },
  "trailers": {
    "items": [
      {
        "id": "tour",
        "title": "Gorilla Gainz: catalogue, product and demo bag",
        "kind": "capture",
        "inputs": [
          "src",
          "public/index.html"
        ],
        "source": "local",
        "music": "project-media/music/tour.m4a",
        "posterAt": 0.5,
        "recipe": {
          "route": "/catalogue",
          "viewport": {
            "width": 1280,
            "height": 720
          },
          "durationMs": 18000,
          "setup": {
            "readySelector": ".gear-card",
            "waitAfterReadyMs": 800
          },
          "timeline": [
            {
              "type": "click",
              "target": {
                "role": "button",
                "name": "Strength",
                "exact": true
              }
            },
            {
              "type": "wait",
              "ms": 1600
            },
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "View Foundation Barbell",
                "exact": true
              }
            },
            {
              "type": "wait",
              "ms": 2100
            },
            {
              "type": "click",
              "target": {
                "role": "button",
                "name": "Add to bag +",
                "exact": true
              }
            },
            {
              "type": "wait",
              "ms": 700
            },
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "Shopping bag, 1 items",
                "exact": true
              }
            },
            {
              "type": "wait",
              "ms": 2300
            },
            {
              "type": "click",
              "target": {
                "role": "button",
                "name": "Complete demo order",
                "exact": true
              }
            },
            {
              "type": "wait",
              "ms": 2300
            }
          ]
        }
      }
    ]
  }
};
