const Clinician = require('../../models/Clinician');

async function list() {
  return Clinician.query().orderBy('created_at', 'desc');
}

async function create(data) {
  return Clinician.query().insert(data).returning('*');
}

module.exports = { list, create };
