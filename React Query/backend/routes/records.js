const express = require('express');
const db = require('../db');
const router = express.Router();

// Get all records
router.get('/', (req, res) => {
  db.query('SELECT * FROM records', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

// Create a record
router.post('/', (req, res) => {
  const { name } = req.body;
  db.query('INSERT INTO records (name) VALUES (?)', [name], (err, results) => {
    if (err) throw err;
    res.json({ id: results.insertId, name });
  });
});

// Edit a record
router.put('/:id', (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  db.query('UPDATE records SET name = ? WHERE id = ?', [name, id], (err) => {
    if (err) throw err;
    res.json({ id, name });
  });
});

// Delete a record
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM records WHERE id = ?', [id], (err) => {
    if (err) throw err;
    res.json({ message: 'Record deleted' });
  });
});

module.exports = router;
