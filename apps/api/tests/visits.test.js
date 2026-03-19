const request = require('supertest');

let mockClinicianId = 1;
let mockPatientId = 2;

jest.mock('../src/modules/clinicians/service', () => ({
  list: jest.fn().mockResolvedValue([]),
  create: jest.fn().mockImplementation((data) => {
    const id = mockClinicianId++;
    return Promise.resolve([
      {
        id,
        first_name: data.first_name,
        last_name: data.last_name,
        specialty: data.specialty,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }),
}));

jest.mock('../src/modules/patients/service', () => ({
  list: jest.fn().mockResolvedValue([]),
  create: jest.fn().mockImplementation((data) => {
    const id = mockPatientId++;
    return Promise.resolve([
      {
        id,
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]);
  }),
}));

jest.mock('../src/modules/visits/service', () => ({
  list: jest.fn().mockResolvedValue([]),
  create: jest.fn().mockImplementation((data) =>
    Promise.resolve({
      id: 1,
      clinician_id: data.clinician_id,
      patient_id: data.patient_id,
      visited_at: data.visited_at,
      notes: data.notes || null,
      clinician: {
        id: data.clinician_id,
        first_name: 'Visit',
        last_name: 'Clinician',
      },
      patient: {
        id: data.patient_id,
        first_name: 'Visit',
        last_name: 'Patient',
      },
    })
  ),
}));

const app = require('../src/app');

describe('Visits API', () => {
  let clinicianId;
  let patientId;

  beforeAll(async () => {
    const clinicianRes = await request(app).post('/api/clinicians').send({
      first_name: 'Visit',
      last_name: 'TestClinician',
      specialty: 'Testing',
    });
    clinicianId = clinicianRes.body.id;

    const patientRes = await request(app).post('/api/patients').send({
      first_name: 'Visit',
      last_name: 'TestPatient',
      date_of_birth: '1985-05-20',
    });
    patientId = patientRes.body.id;
  });

  describe('GET /api/visits', () => {
    it('returns an array', async () => {
      const res = await request(app).get('/api/visits');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('accepts clinicianId filter', async () => {
      const res = await request(app).get(
        `/api/visits?clinicianId=${clinicianId}`
      );
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });

    it('accepts patientId filter', async () => {
      const res = await request(app).get(`/api/visits?patientId=${patientId}`);
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/visits', () => {
    it('creates a visit and returns 201 with clinician and patient', async () => {
      const visitedAt = new Date().toISOString().slice(0, 19);
      const res = await request(app)
        .post('/api/visits')
        .send({
          clinician_id: clinicianId,
          patient_id: patientId,
          visited_at: visitedAt,
          notes: 'Test visit notes',
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.clinician_id).toBe(clinicianId);
      expect(res.body.patient_id).toBe(patientId);
      expect(res.body).toHaveProperty('clinician');
      expect(res.body).toHaveProperty('patient');
      expect(res.body.notes).toBe('Test visit notes');
    });

    it('returns 400 for invalid clinician_id', async () => {
      const res = await request(app)
        .post('/api/visits')
        .send({
          clinician_id: 0,
          patient_id: patientId,
          visited_at: new Date().toISOString().slice(0, 19),
        });
      expect(res.status).toBe(400);
    });

    it('returns 400 for missing visited_at', async () => {
      const res = await request(app)
        .post('/api/visits')
        .send({
          clinician_id: clinicianId,
          patient_id: patientId,
        });
      expect(res.status).toBe(400);
    });
  });
});
