const patientService = require('./service');
const { patientSchema } = require('./schema');

async function list(req, res, next) {
  try {
    const patients = await patientService.list();
    res.json(patients);
  } catch (err) {
    next(err);
  }
}

async function create(req, res, next) {
  try {
    const parsed = patientSchema.parse(req.body);
    const patient = await patientService.create(parsed);
    res.status(201).json(patient[0]);
  } catch (err) {
    next(err);
  }
}

module.exports = { list, create };
