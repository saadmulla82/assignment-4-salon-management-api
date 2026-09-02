const express = require('express');
const cors = require('cors');
require('dotenv').config();

const logger = require('./middleware/loggerMiddleware');
const authRoutes = require('./routes/authRoutes');
const salonRoutes = require('./routes/salonRoutes');
const serviceRoutes = require('./routes/serviceRoutes');

const app = express();

app.use(cors());
app.use(express.json());
app.use(logger);

app.get('/', (req, res) => {
  res.status(200).json({ message: 'Welcome to Salon APIs' });
});

app.use('/', authRoutes);
app.use('/salons', salonRoutes);
app.use('/services', serviceRoutes);

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

const port = process.env.PORT || 3000;
app.listen(port, '0.0.0.0', () => {
  console.log('Server running on port ' + port);
});