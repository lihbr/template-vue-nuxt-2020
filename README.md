# template-vue-nuxt

A Nuxt.js starter pack to build app with Vue.js

<!-- Place badges here -->

[Live here](https://example.com)

## About

This website is made with [Vue.js](https://vuejs.org/) under [Nuxt.js](https://nuxtjs.org), for detailed explanation on how things work please refer to related documentations.

## Setup

### Prerequisites

In order to improve `.sass` file compilation this projet relies on `fibers`. While you should not have any problem with it on Mac or Linux OS you need on Windows to have few more dependencies:

```bash
$ npm install -g node-gyp@latest
$ npm install -g --production windows-build-tools
```

<!-- Uncomment is using Netlify functions -->
<!-- As this project also makes use of [Netlify functions](https://docs.netlify.com/functions/overview), to run them locally you'll need the Netlify's cli:

```bash
$ npm install -g netlify-cli
``` -->

<!-- Uncomment if usage requires an internet connection -->
<!-- Finally the develop or build process of this project also require an internet connection in order to fetch content from CMS, offline usage is not possible. -->

### Install

After having the project cloned just install node dependencies:

```bash
# install dependencies with yarn
$ yarn install
# or with npm
$ npm install
```

During the process you can also create a `.env` file by copying `.env.example` and fill it with needed environment variables.

### Development

To run the project without Netlify functions simply run:

```bash
# launch nuxt development server with yarn
$ yarn dev
# or with npm
$ npm run dev
```

Nuxt development server will be running at `localhost:3000`

<!-- TODO: update when functions are used -->

### Build

To build the project simply run:

```bash
# generate static project with yarn
$ yarn generate
# or with npm
$ npm run generate
```

You'll end up with the built site available at `./dist`

## Inspiration

- [Link to inpirating stuff](https://rickastley.lihbr.fr)

## Todo

- [x] Done item
- [ ] Todo item
