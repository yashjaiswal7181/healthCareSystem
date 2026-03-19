const request = require('supertest');

jest.mock('../src/modules/clinicians/service', () => ({
  list: jest.fn().mockResolvedValue([]),
  create: jest.fn().mockImplementation((data) =>
    Promise.resolve([
      {
        id: 1,
        first_name: data.first_name,
        last_name: data.last_name,
        specialty: data.specialty,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ])
  ),
}));

const app = require('../src/app');

describe('Clinicians API', () => {
  describe('GET /api/clinicians', () => {
    it('returns an array', async () => {
      const res = await request(app).get('/api/clinicians');
      expect(res.status).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);
    });
  });

  describe('POST /api/clinicians', () => {
    it('creates a clinician and returns 201', async () => {
      const res = await request(app)
        .post('/api/clinicians')
        .send({
          first_name: 'Test',
          last_name: 'Doctor',
          specialty: 'General',
        });
      expect(res.status).toBe(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.first_name).toBe('Test');
      expect(res.body.last_name).toBe('Doctor');
      expect(res.body.specialty).toBe('General');
    });

    it('returns 400 for missing required fields', async () => {
      const res = await request(app)
        .post('/api/clinicians')
        .send({
          first_name: 'Test',
          last_name: 'Doctor',
        });
      expect(res.status).toBe(400);
    });

    it('returns 400 for empty strings', async () => {
      const res = await request(app)
        .post('/api/clinicians')
        .send({
          first_name: '',
          last_name: 'Doctor',
          specialty: 'General',
        });
      expect(res.status).toBe(400);
    });
  });
});
