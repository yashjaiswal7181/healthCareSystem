const knex = require('knex');
const config = require('../config');

const knexInstance = knex({
  client: 'postgresql',
  connection: config.databaseUrl,
  pool: { min: 1, max: 5 },
});

module.exports = knexInstance;
