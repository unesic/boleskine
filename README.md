# Boleskine
### Digital replacement for your [Moleskine](https://www.moleskine.com/)

Made in MERN stack using [React TS Boilerplate](https://github.com/unesic/react-ts-boilerplate/) starter project.

## Features

- [x] Social media SSO and local auth
- [x] Daily expense tracking and note taking
- [x] Analytics overview

## Stack
### Front-end

- [React + TypeScript](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Formik](https://formik.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

#### Important dependecies

- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-router](https://www.npmjs.com/package/react-router)
- [@apollo-client](https://www.npmjs.com/package/@apollo/client)
- [formik](https://www.npmjs.com/package/formik)
- [yup](https://www.npmjs.com/package/yup)
- [postcss](https://www.npmjs.com/package/postcss)
- [tailwindcss](https://www.npmjs.com/package/tailwindcss)

#### Available Scripts

Everything from `create-react-app` framework plus the following:

- `npm storybook` – Runs local storybook environment
- `npm run postcss:watch` – Watches for file changes in `src/assets/` directories
- `npm run postcss:build:dev` – Builds development version of CSS
- `npm run postcss:build:prod` – Build production version of CSS
- `npm run build:opt` – Optimized production build with a single `.js` and `.css` file

#### File structure

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

### Back-end

- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

#### Important dependecies

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [apollo-server](https://www.npmjs.com/package/apollo-server)
- [graphQL](https://www.npmjs.com/package/graphql)
- [passport](https://www.npmjs.com/package/passport)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

#### Available Scripts

- `npm run start` – Starts server
- `npm run dev` – Starts dev server for local development

#### File structure

- `assets/` – Hosted static assets such as fonts and images
- `src/` - Main directory containing:
	- `auth/` - OAuth strategies for SSO
	- `graphql/` - Type definitions and resolvers
	- `models/` - Mongoose models
	- `util/` - Utility functions
