exports.up = (knex) => {
  return knex.schema.createTable('visits', (table) => {
    table.increments('id').primary();
    table
      .integer('clinician_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('clinicians')
      .onDelete('CASCADE');
    table
      .integer('patient_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('patients')
      .onDelete('CASCADE');
    table.timestamp('visited_at').notNullable();
    table.text('notes').nullable();
    table.timestamps(true, true);

    table.index('clinician_id');
    table.index('patient_id');
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('visits');
};
