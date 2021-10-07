# Boleskine – Front-end

## Important dependecies

- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-router](https://www.npmjs.com/package/react-router)
- [@apollo-client](https://www.npmjs.com/package/@apollo/client)
- [formik](https://www.npmjs.com/package/formik)
- [yup](https://www.npmjs.com/package/yup)
- [postcss](https://www.npmjs.com/package/postcss)
- [tailwindcss](https://www.npmjs.com/package/tailwindcss)

## Available Scripts

Everything from `create-react-app` framework plus the following:

- `npm storybook` – Runs local storybook environment
- `npm run postcss:watch` – Watches for file changes in `src/assets/` directories
- `npm run postcss:build:dev` – Builds development version of CSS
- `npm run postcss:build:prod` – Build production version of CSS
- `npm run build:opt` – Optimized production build with a single `.js` and `.css` file

## File structure

`src` is the main entry containing:

- `assets/` – CSS Assets and language translations
- `components/` – Main components used in the app
- `lib/` – Contains private and public react router routes, utility and helper functions and:
	- `data/` – Dummy data used in development
	- `graphql/` – GraphQL queries and mutations
	- `hooks/` – Custom react hooks
- `store/` – Redux store setup and slices
- `stories/` – Storybook stories
- `ui/` – UI Components
- `views/` – Application's 'pages'
