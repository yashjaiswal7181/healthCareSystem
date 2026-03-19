const clinicianService = require('./service');
const { clinicianSchema } = require('./schema');

async function list(req, res, next) {
  try {
    const clinicians = await clinicianService.list();
    res.json(clinicians);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const parsed = clinicianSchema.parse(req.body);
    const clinician = await clinicianService.create(parsed);
    res.status(201).json(clinician[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, create };
