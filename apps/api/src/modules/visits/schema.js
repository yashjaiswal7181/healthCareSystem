const { z } = require('zod');

const visitSchema = z.object({
  clinician_id: z.number().int().positive('Clinician ID must be a positive integer'),
  patient_id: z.number().int().positive('Patient ID must be a positive integer'),
  visited_at: z.string().min(1, 'Visit date is required'),
  notes: z.string().nullable().optional(),
});

module.exports = { visitSchema };
