const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Patient extends Model {
  static get tableName() {
    return 'patients';
  }

  static get relationMappings() {
    const Visit = require('./Visit');

    return {
      visits: {
        relation: Model.HasManyRelation,
        modelClass: Visit,
        join: {
          from: 'patients.id',
          to: 'visits.patient_id',
        },
      },
    };
  }
}

module.exports = Patient;
