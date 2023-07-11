const path = require('path');
const dotenv = require('dotenv');
const fs = require('fs');

const vars = [
  'NODE_ENV',
  'PORT',
  'NX_API_URL',
  'NX_APP_URL',
  'NX_DB_HOST',
  'NX_DB_NAME',
  'NX_DB_PASSWORD',
  'NX_DB_PORT',
  'NX_DB_USER',
  'NX_GOOGLE_CLIENT_ID',
  'NX_GOOGLE_CLIENT_KEY',
  'NX_SESSION_SECRET',
];

function getMissingEnvs(envs) {
  return vars.reduce(
    (prev, curr) =>
      !Object.keys(envs).includes(curr) ? [...prev, curr] : prev,
    []
  );
}

function getEnvironment() {
  const variables = dotenv.parse(
    fs.readFileSync(path.join(__dirname, '../.env'))
  );
  const missing = getMissingEnvs(variables);

  if (missing.length) {
    console.error('Missing environment variables', missing);
  }
}

getEnvironment();
