# 🥞 WD Beta App

[![Netlify Status](https://api.netlify.com/api/v1/badges/7bebf1a3-be7b-4165-afd1-446256acd5e3/deploy-status)](https://app.netlify.com/sites/pancake-prod/deploys)

This project was originally based on a clone of the Pancake application. This is a React App, based on React 17 at a minimum.

## Pancake App Documentation

- Basic documentation of the app structure, as well as [contributing guidelines](./CONTRIBUTING.md) of this project
- [Info](doc/Info.md)
- [Cypress tests](doc/Cypress.md)

## WD Documentation

- The "Start Bar" menu, and components, are contained in `src/views/Roadmap/index.tsx`. 
- The "Roadmap" component corresponds to the main landing page of the site. 
- "Rewards Dashboard" is currently live, and accessible from version 1.0 of the site. The functionality should work for any future tokens or projects.
- The repository leverages Typescript heavily, but you can also develop in Javascript at the same time if you prefer.
- Most of the components are written as React functional components, but classes should be used if managing state is too complex. (For instance, initializing the `useState` hook with `useState(true)` is one thing, `useState(data.map(() => {...}))` probably means that a class would be more readable).
