const app = require('./app');
const config = require('./config');

const PORT = config.port || 3001;

app.listen(PORT, () => {
  console.log(`API server running on http://localhost:${PORT}`);
});
