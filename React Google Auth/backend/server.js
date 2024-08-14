require('dotenv').config(); // Load environment variables from .env file

const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { OAuth2Client } = require('google-auth-library');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors());

// Configure MySQL connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'indiscpx_taskdb_2',
});

db.connect(err => {
  if (err) {
    console.error('Database connection failed:', err);
    return;
  }
  console.log('Connected to the database');
});

// Use environment variable
const client = new OAuth2Client(process.env.NODE_APP_GOOGLE_CLIENT_ID);

// GET route for traditional login
app.get('/login', (req, res) => {
  const { email, pass, rememberMe } = req.query;

  const selectlogin = `SELECT * FROM Logincrd WHERE Email=? AND Password=?`;

  db.query(selectlogin, [email, pass], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error');
      return;
    }

    if (result.length === 0) {
      return res.status(401).send('Error: Invalid credentials');
    }

    if (rememberMe === 'true') {
      res.cookie('username', email, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
      res.cookie('password', pass, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
    } else {
      res.clearCookie('username');
      res.clearCookie('password');
    }
    res.send({ message: 'Success', result: result });
  });
});

// GET route for Google login
app.get('/google-login', async (req, res) => {
  const { token } = req.query;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.NODE_APP_GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email } = payload;

    // Check if user exists in database
    const selectlogin = `SELECT * FROM Logincrd WHERE Email=?`;

    db.query(selectlogin, [email], (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).send('Error');
        return;
      }

      if (result.length === 0) {
        // You may want to create a new user here if they don't exist
        return res.status(401).send('Error: User not found');
      }

      // Set cookies or other session logic
      res.cookie('username', email, { maxAge: 30 * 24 * 3600 * 1000, httpOnly: true });
      res.send({ message: 'Success', result: result });
    });
  } catch (error) {
    res.status(401).send('Error: Invalid Google token');
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
