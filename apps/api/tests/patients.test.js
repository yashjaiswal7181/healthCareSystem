const request = require('supertest');

jest.mock('../src/modules/patients/service', () => ({
  list: jest.fn().mockResolvedValue([]),
  create: jest.fn().mockImplementation((data) =>
    Promise.resolve([
      {
        id: 1,
        first_name: data.first_name,
        last_name: data.last_name,
        date_of_birth: data.date_of_birth,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
  ),
}));

const app = require('../src/app');

describe('Patients API', () => {
  describe('GET /api/patients', () => {
    it('returns an array', async () => {
      const res = await request(app).get('/api/patients');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/patients', () => {
    it('creates a patient and returns 201', async () => {
      const res = await request(app)
        .post('/api/patients')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          date_of_birth: '1990-01-15',
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.first_name).toBe('John');
      expect(res.body.last_name).toBe('Doe');
      expect(res.body.date_of_birth).toBe('1990-01-15');
    });

    it('returns 400 for missing required fields', async () => {
      const res = await request(app)
        .post('/api/patients')
        .send({
          first_name: 'John',
          last_name: 'Doe',
        });
      expect(res.status).toBe(400);
    });

    it('returns 400 for empty date_of_birth', async () => {
      const res = await request(app)
        .post('/api/patients')
        .send({
          first_name: 'John',
          last_name: 'Doe',
          date_of_birth: '',
        });
      expect(res.status).toBe(400);
    });
  });
});
