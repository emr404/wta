# What's the Accent?
Accent guessing game
## About
This is a fun game that generates random quotes from a [DummyJSON API](https://dummyjson.com/quotes/random) alongside a random accent where users will read the quote in the accent generated and their opponents will try and guess the accent the quote is read in.

The app was created using React.js which enabled efficient usage of Hooks and Context api for state management while styling the app using Sass.

## Tools Used
- React.js
- Sass
- DummyJSON quotes API [Link](https://dummyjson.com/docs/quotes)

## Where can you play?

You can check it out here=> [What's the accent](https://wta.netlify.app)

# Getting Started

Install Node.js 22 LTS or newer (npm is included), then run these commands from the project folder:

```sh
npm ci
npm start
```

Open http://localhost:3000 (or the address printed in the terminal if that port is busy). Press Ctrl+C to stop the server. Stop any running development server before running `npm ci` again, since it replaces `node_modules`.

The app uses React 19.3.1. Quote generation requires an internet connection to DummyJSON.

To run the tests once:

```sh
npm test -- --watchAll=false
```

To create a production build in `build/`:

```sh
npm run build
```

Use npm and the committed `package-lock.json` to keep dependency versions consistent.
