const { z } = require('zod');

const clinicianSchema = z.object({
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  specialty: z.string().min(1, 'Specialty is required'),
});

module.exports = { clinicianSchema };
