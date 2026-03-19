const Patient = require('../../models/Patient');

async function list() {
  return Patient.query().orderBy('created_at', 'desc');
}

async function create(data) {
  return Patient.query().insert(data).returning('*');
}

module.exports = { list, create };
