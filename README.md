
[![Netlify Status](https://api.netlify.com/api/v1/badges/136153df-8560-4bc0-b805-42e64fbb3723/deploy-status)](https://app.netlify.com/sites/jottivity2/deploys)
![Unit Tests](https://github.com/chiubaca/jottivity-v2/workflows/Unit%20Tests/badge.svg)

# Jottivity 🖊 

Jottivity rewrite.

## Build Setup 🛠️


### Install dependencies
`npm install`

### Serve with hot reload at localhost:8888
`npm run ndev`

Behind the scenes it is using Netlify Dev which will spin up serverless function APIs which run locally on your machine and also the Nuxt front-end, then proxy everything to port 8888.

## Unit Tests 🧪

### Netlify functions and Vue components
`npm run test`


### Firestore Rules
`npm run test:db`

> Note: Java runtime and firebase cli must be installed globablly

```bash
# on windows
npm install -g firebase-tools
winget install --id="Oracle.JavaRuntimeEnvironment" --exact 
```

```bash
# on mac...
🤷
```



