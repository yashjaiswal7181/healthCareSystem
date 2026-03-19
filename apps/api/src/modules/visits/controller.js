const visitService = require('./service');
const { visitSchema } = require('./schema');

async function list(req, res, next) {
  try {
    const filters = {
      clinicianId: req.query.clinicianId || undefined,
      patientId: req.query.patientId || undefined,
    };
    const visits = await visitService.list(filters);
    res.json(visits);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const parsed = visitSchema.parse(req.body);
    const visit = await visitService.create(parsed);
    res.status(201).json(visit);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, create };
