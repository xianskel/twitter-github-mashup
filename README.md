# Command line tool which displays results from both API's

## Configure

- There is an .env-example file included within the project
- This needs to be renamed to .env and valid Twitter Api Credentials should be placed here
- This .env file will be ignored by git

```
CONSUMER_KEY=
CONSUMER_SECRET=
ACCESS_TOKEN_KEY=
ACCESS_TOKEN_SECRET=
```

## Run

To run the project use:

```
npm start
```

or

```
yarn start
```

## Test

Tests can be run with:

```
npm test
```

or

```
yarn test
```

## Assumptions

- Only 5 tweets are to be returned per GitHub project to keep the list short
- Node v12.16.0 was used when developing as this is the most recent version with LTS
- There's no requirment to transpile to an older versions of Node
