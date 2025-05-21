require('dotenv').config();
const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Crear conexión usando variables del .env
const connection = mysql.createConnection({
  host     : process.env.MYSQL_HOST,
  user     : process.env.MYSQL_USER,
  password : process.env.MYSQL_PASSWORD,
  database : process.env.MYSQL_DATABASE
});

connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a MySQL: ' + err.stack);
    return;
  }
  console.log('Conectado a MySQL como ID ' + connection.threadId);
});

// Obtener todas las metas
router.get('/getGoals', (req, res) => {
  const query = 'SELECT * FROM goals';
  connection.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener metas' });
    }
    res.status(200).json(results);
  });
});

// Eliminar una meta por ID
router.delete('/removeGoal/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM goals WHERE id = ?';

  connection.query(query, [id], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al eliminar la meta' });
    }
    res.status(200).json(results);
  });
});

// Agregar una nueva meta
router.post('/addGoal', (req, res) => {
  const { name, description, dueDate } = req.body;

  if (!name || !description || !dueDate) {
    return res.status(400).json({ error: 'Faltan campos requeridos' });
  }

  const query = 'INSERT INTO goals (name, description, dueDate) VALUES (?, ?, ?)';
  connection.query(query, [name, description, dueDate], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: 'Error al agregar la meta' });
    }
    res.status(200).json(results);
  });
});

module.exports = router;
