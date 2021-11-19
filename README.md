<h1 align="center">Boleskine</h1>
<p align="center">Note taking and expense tracking application with a handy overview on weekly and monthly income and expense totals accompanied by an analytics graph that provides a more thorough insight.</p>
<p align="center">Made with MERN stack using <a href="https://github.com/unesic/react-ts-boilerplate/" target="_blank">React TS Boilerplate</a> as starter project.</p>

<p align="center">
	<a href="https://github.com/unesic/boleskine/blob/master/CODE_OF_CONDUCT.md" target="_blank" title="Contributor Covenant">
		<img src="https://img.shields.io/badge/Contributor%20Covenant-2.1-4baaaa.svg" alt="Contributor Covenant" />
	</a>
	<a href="https://github.com/unesic/boleskine/blob/master/LICENSE" target="_blank" title="LICENSE">
		<img src="https://img.shields.io/badge/license-MIT-green" alt="LICENSE" />
	</a>
</p>

## Features

- [x] Social media SSO and local auth
- [x] Daily expense tracking and note taking
- [x] Analytics overview

## Front-end

Root directory: `client`

- [React + TypeScript](https://reactjs.org/)
- [Redux](https://redux.js.org/)
- [React Router](https://reactrouter.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Formik](https://formik.org/)
- [Apollo Client](https://www.apollographql.com/docs/react/)

### Important dependecies

- [react-redux](https://www.npmjs.com/package/react-redux)
- [react-router](https://www.npmjs.com/package/react-router)
- [@apollo-client](https://www.npmjs.com/package/@apollo/client)
- [formik](https://www.npmjs.com/package/formik)
- [yup](https://www.npmjs.com/package/yup)
- [postcss](https://www.npmjs.com/package/postcss)
- [tailwindcss](https://www.npmjs.com/package/tailwindcss)

### Available Scripts

Everything from `create-react-app` framework plus the following:

- `npm run postcss:build:prod` – Build production version of CSS
- `npm run postcss:build:dev` – Builds development version of CSS
- `npm run postcss:watch` – Watches for file changes in `src/assets/` directories
- `npm run storybook` – Runs local storybook environment

### File structure

`src` is the main entry containing:

- `assets/` – CSS Assets and language translations
- `components/` – Main components used in the app
- `lib/` – Custom routes, utility and helper functions, custom hooks, GraphQL queries, types...
- `store/` – Redux store setup and slices
- `stories/` – Storybook stories
- `ui/` – UI Components
- `views/` – Application's 'pages'

## Back-end

Root directory: `server`

- [Express](https://expressjs.com/)
- [GraphQL](https://graphql.org/)
- [Apollo Server](https://www.apollographql.com/docs/apollo-server/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)

### Important dependecies

- [express](https://www.npmjs.com/package/express)
- [mongoose](https://www.npmjs.com/package/mongoose)
- [apollo-server](https://www.npmjs.com/package/apollo-server)
- [graphQL](https://www.npmjs.com/package/graphql)
- [passport](https://www.npmjs.com/package/passport)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

### Available Scripts

- `npm run start` – Starts server
- `npm run dev` – Starts dev server for local development

### File structure

- `assets/` – Hosted static assets such as fonts and images
- `src/` - Main directory containing:
	- `auth/` - OAuth strategies for SSO
	- `graphql/` - Type definitions and resolvers
	- `models/` - Mongoose models
	- `util/` - Utility functions

## Issues

Please file an issue by going to the [issues tab](https://github.com/unesic/boleskine/issues) or on one the following:

- [Here](https://github.com/unesic/boleskine/issues/new?assignees=unesic&labels=bug&template=bug-report.md&title=%5BBUG%5D+) – for bugs, missing documentation, or unexpected behavior.
- [Here](https://github.com/unesic/boleskine/issues/new?assignees=unesic&labels=enhancement&template=feature_request.md&title=%5BFEATURE%5D) – for all feature requests.

## License

MIT License

Copyright (c) 2021 Uroš Nešić [https://unesic.io](https://unesic.io) ([info@unesic.io](mailto:info@unesic.io))

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.