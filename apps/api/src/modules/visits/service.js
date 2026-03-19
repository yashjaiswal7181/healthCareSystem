const Visit = require('../../models/Visit');

async function list(filters = {}) {
  let query = Visit.query()
    .withGraphFetched('[clinician, patient]')
    .orderBy('visited_at', 'desc');

  if (filters.clinicianId) {
    query = query.where('clinician_id', filters.clinicianId);
  }
  if (filters.patientId) {
    query = query.where('patient_id', filters.patientId);
  }

  return query;
}

async function create(data) {
  const visit = await Visit.query().insert(data);
  return Visit.query()
    .findById(visit.id)
    .withGraphFetched('[clinician, patient]')
    .first();
}

module.exports = { list, create };
