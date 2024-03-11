// server.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jwt = require('jsonwebtoken');

const app = express();
const port = 3001;

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'test',
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
  } else {
    console.log('Connected to MySQL');
  }
});

app.use(bodyParser.json());

app.post('/login', (req, res) => {
  const { email, passwd } = req.body;

  // Check credentials against the database
  db.query(
    'SELECT email, passwd, usertype FROM users WHERE email = ?',
    [email],
    (err, results) => {
      if (err) {
        console.error('Error querying the database:', err);
        res.status(500).json({ error: 'Internal Server Error' });
        return;
      }

      if (results.length === 0 || results[0].passwd !== passwd) {
        res.status(401).json({ error: 'Invalid credentials' });
        return;
      }

      // Valid credentials, generate JWT
      const token = jwt.sign({ email, usertype: results[0].usertype }, 'your_secret_key', {
        expiresIn: '1h',
      });

      res.json({ token });
    }
  );
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
