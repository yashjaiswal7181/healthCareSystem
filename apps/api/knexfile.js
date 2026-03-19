module.exports = {
  development: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL || 'postgresql://localhost:5432/woundtech_dev',
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
    pool: { min: 1, max: 5 },
  },
  production: {
    client: 'postgresql',
    connection: process.env.DATABASE_URL,
    migrations: {
      directory: './migrations',
      tableName: 'knex_migrations',
    },
    pool: { min: 2, max: 10 },
  },
};
