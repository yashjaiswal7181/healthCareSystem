const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Clinician extends Model {
  static get tableName() {
    return 'clinicians';
  }

  static get relationMappings() {
    const Visit = require('./Visit');

    return {
      visits: {
        relation: Model.HasManyRelation,
        modelClass: Visit,
        join: {
          from: 'clinicians.id',
          to: 'visits.clinician_id',
        },
      },
    };
  }
}

module.exports = Clinician;
