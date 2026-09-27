// Metadata inputs for this repository - unique to react-fitness-ecommerce-demo.
//
// Everything here is curated by hand: identity, commands, the screenshot recipe
// (capture), the recorded trailer (trailers.items, kind: capture) and where the
// card, icons and trailers are published. scripts/generate-project-meta.mjs
// derives the rest into project.meta.json; scripts/project-media.test.mjs
// checks that everything here was actually produced.
//   npm run meta:refresh   trailers -> shots -> social -> icons -> meta
//   npm run test:media     the media contract

import path from 'node:path';

const portfolioRoot = process.env.PORTFOLIO_ROOT ?? String.raw`C:\Users\Gaming PC\Desktop\Repos\portfolio`;

export default {
  "slug": "gorilla-gainz",
  "classification": "web-app",
  "curated": {
    "title": "Gorilla Gainz",
    "subtitle": "A fitness store front with an admin back office",
    "description": "A React e-commerce demo for fitness gear: browse the catalogue and product pages, log in to manage a profile, and use the admin-only screens to add, update and remove products. An early React Router project preserved with demo-safe placeholders for its backend.",
    "tags": [
      "React",
      "Ecommerce",
      "React Router",
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
  "capture": {
    "route": "/",
    "waitAfterReadyMs": 2000
  },
  "scores": {
    "priorityScore": 82,
    "demoabilityScore": 66,
    "depthScore": 58,
    "polishScore": 58,
    "uniquenessScore": 54,
    "maintenanceScore": 52
  },
  "analysisNotes": "Archived ecommerce demo with product browsing; kept in the quieter section because it is older and less differentiated.",
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
        "title": "Gorilla Gainz: the store front",
        "kind": "capture",
        "inputs": [
          "src",
          "public/index.html"
        ],
        "source": "deployment",
        "music": "project-media/music/tour.m4a",
        "posterAt": 0.5,
        "recipe": {
          "route": "/",
          "viewport": {
            "width": 1280,
            "height": 720
          },
          "durationMs": 20000,
          "setup": {
            "actions": [
              {
                "type": "waitFor",
                "target": {
                  "role": "link",
                  "name": "Media"
                },
                "state": "visible",
                "label": "wait for the nav"
              }
            ],
            "waitAfterReadyMs": 1500
          },
          "timeline": [
            {
              "type": "scroll",
              "deltaY": 500,
              "steps": 3
            },
            {
              "type": "wait",
              "ms": 1500
            },
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "Media"
              },
              "label": "media",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 3500
            },
            {
              "type": "scroll",
              "deltaY": 500,
              "steps": 3
            },
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "Login"
              },
              "label": "login",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 3000
            },
            {
              "type": "click",
              "target": {
                "role": "link",
                "name": "Register"
              },
              "label": "register",
              "optional": true
            },
            {
              "type": "wait",
              "ms": 3000
            }
          ]
        }
      }
    ]
  }
};
