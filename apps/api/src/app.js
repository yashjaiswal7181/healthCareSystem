const express = require('express');

const cliniciansRoutes = require('./modules/clinicians/routes');
const patientsRoutes = require('./modules/patients/routes');
const visitsRoutes = require('./modules/visits/routes');
const errorHandler = require('./middleware/errorHandler');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/clinicians', cliniciansRoutes);
app.use('/api/patients', patientsRoutes);
app.use('/api/visits', visitsRoutes);

app.use(errorHandler);

module.exports = app;
