# Top Secret REST API

A Node.js REST API designed to process data from multiple sources (aka: satellites) and crack a secret message and the location this message came from by applying 2D triangulation.

## Installation

Clone the repo:

```bash
git clone https://github.com/ramiroandreshg/topsecret.git
cd topsecret
```

Install the dependencies:

```bash
npm install
```

Set the environment variables:

```bash
cp .env.test .env

# open .env and modify the environment variables (if needed)
```
## Commands

Running locally:

```bash
npm run dev
```

Running in production mode:

```bash
npm start
```

Testing:

```bash
# run all tests
npm test
```

Linting:

```bash
# run ESLint
npm run lint

# fix ESLint errors
npm run lint:fix

# run prettier
npm run prettier

# fix prettier errors
npm run prettier:fix
```

## Environment Variables

The environment variables can be found and modified in the `.env` file.  
Possible env vars are:

```bash
# Port number
PORT=3000

# NEW Relic Integration
# Boolean to enable/disable sending perfomance metrics to New Relic platform (most useful to disable it in dev environment)
NEWRELIC_ENABLED=true
# A valid New Relic licence key
NEWRELIC_LICENSE=<valid-newrelic-licence-key>

# Loggly Integration
# Boolean to enable/disable sending logs to loggly platform (most useful to disable it in dev environment)
LOGGLY_ENABLED=true
# A valid loggly customer token
LOGGLY_TOKEN=<valid-loggly-customer-token>
```

## Project Structure

```
src\
 |--config\           # Environment variables and config/logs management
 |--docs\             # OAS - Swagger files
 |--middlewares\      # Custom express middlewares
 |--routes\           # Routes - global definitions
 |--topsecret\        # topsecret service and business logic
  |--algorithms\      # GetMessage and GetLocation implementation
  |--controllers.js   # Route controllers (controller layer)
  |--repository.js    # Repository (data layer)
  |--routes.js        # Routes - internal topsecret routes definitios
  |--service.js       # Business Logic (service layer)
  |--validations.js   # Request data validation schemas
 |--utils\            # Utility classes and functions
 |--app.js            # Express app definition
 |--index.js          # App entry point
 
tests\
 |--integration\      # Integration tests
 |--unit\             # Unit tests
```

## API Documentation

To view the list of available APIs and their specifications, run the server in development mode (`npm run dev`) and go to `http://localhost:3000/docs` in your browser.

### API Endpoints

List of available routes:

**multi satellite routes**:  
`POST /topsecret` - Process data from multiple satellites and returns the secret message and location  
Body example:
```json
{
  "satellites": [
    {
      "name": "kenobi",
      "distance": 538.516481,
      "message": ["this", "", "", "secret", ""]
    },
    {
      "name": "skywalker",
      "distance": 141.421356,
      "message": ["", "is", "", "", "message"]
    },
    {
      "name": "sato",
      "distance": 509.901951,
      "message": ["this", "", "a", "", ""]
    }
  ]
}
```
**single satellite (split) routes**:  
`POST /topsecret_split/:satelliteName` - Process data from a single satellite  
Body example:
```json
{
  "distance": 538.516481,
  "message": ["", "this", "", "", "secret", ""]
}
```
`GET /topsecret_split` - Get processed data from multiple calls to single satellite data endpoints  
Response example:
```json
{
  "position": {
    "x": 0,
    "y": 0
  },
  "message": "This is a secret message"
}
```
