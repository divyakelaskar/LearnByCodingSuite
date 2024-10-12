const express = require('express');
const cors = require('cors');
const recordRoutes = require('./routes/records');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/records', recordRoutes);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});
