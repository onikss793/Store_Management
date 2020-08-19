### Current URL

https://w8yl588g86.execute-api.ap-northeast-2.amazonaws.com/production

### Branch Policy

Deploy: production

Default: master

Develop: develop

### How to Start in Local

_make sure you have docker and started it_

1. yarn install
2. yarn serve:local

### Tests

1. lint: yarn test:lint
2. jest: yarn test:jest
3. integration: yarn test

### Deploy

- Only on `production` branch
- No hard push to `production`
- Auto deploy on `production`

