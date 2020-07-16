
[![Netlify Status](https://api.netlify.com/api/v1/badges/136153df-8560-4bc0-b805-42e64fbb3723/deploy-status)](https://app.netlify.com/sites/jottivity/deploys)
![Unit Tests](https://github.com/chiubaca/jottivity-v2/workflows/Unit%20Tests/badge.svg)

# Jottivity ✒️ 

Jottivity rewrite.

## Build Setup 🛠️


### Install dependencies
`npm install`

### Serve with hot reload at `localhost:8888`
`npm run ndev`

Behind the scenes it is using Netlify Dev which will spin up serverless function APIs which run locally on your machine and also the Nuxt front-end, then proxy everything to port 8888.

## Unit Tests 🧪

### Netlify functions and Vue components
`npm run test`


### Firestore Rules

Due to loads of problems trying to integrate Firestore rules unit testing with `@firebase/testing` into this project. It's easier to split unit testing for Firestore rules into a seperate repo which can be found here - https://github.com/chiubaca/jottivity-firebase-rules.

