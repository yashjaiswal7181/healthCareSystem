const { Model } = require('objection');
const knex = require('../db/knex');

Model.knex(knex);

class Visit extends Model {
  static get tableName() {
    return 'visits';
  }

  static get relationMappings() {
    const Clinician = require('./Clinician');
    const Patient = require('./Patient');

    return {
      clinician: {
        relation: Model.BelongsToOneRelation,
        modelClass: Clinician,
        join: {
          from: 'visits.clinician_id',
          to: 'clinicians.id',
        },
      },
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: 'visits.patient_id',
          to: 'patients.id',
        },
      },
    };
  }
}

module.exports = Visit;
