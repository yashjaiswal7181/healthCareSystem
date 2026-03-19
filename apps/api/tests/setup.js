/**
 * Jest setup - load env vars before tests run.
 * Set DATABASE_URL in run.beLocal.sh or export it before running tests.
 */
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') });
