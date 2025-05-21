const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // añade tu contraseña si tienes una configurada
  database: 'todolist_db' // asegúrate de usar el nombre correcto de tu base de datos
});

// Conexión a la base de datos al iniciar
connection.connect((err) => {
  if (err) {
    console.error('Error al conectar a la base de datos:', err.stack);
    return;
  }
  console.log('Conectado a la base de datos con ID', connection.threadId);
});

// GET /getGoals - Obtener todas las metas
router.get('/getGoals', (req, res) => {
  const query = 'SELECT * FROM goals';
  connection.query(query, (err, results) => {
    if (err) return res.status(500).json({ error: 'Error al obtener metas', details: err });
    res.status(200).json(results);
  });
});

// POST /addGoal - Agregar una nueva meta
router.post('/addGoal', (req, res) => {
  const { name, description, dueDate } = req.body;

  if (!name || !description || !dueDate) {
    return res.status(400).json({ error: 'Faltan datos requeridos' });
  }

  const query = 'INSERT INTO goals (name, description, dueDate) VALUES (?, ?, ?)';
  connection.query(query, [name, description, dueDate], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al agregar meta', details: err });
    res.status(201).json({ message: 'Meta agregada', insertId: result.insertId });
  });
});

// DELETE /removeGoal/:id - Eliminar una meta por ID
router.delete('/removeGoal/:id', (req, res) => {
  const { id } = req.params;

  const query = 'DELETE FROM goals WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) return res.status(500).json({ error: 'Error al eliminar meta', details: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: 'Meta no encontrada' });
    res.status(200).json({ message: 'Meta eliminada' });
  });
});

module.exports = router;
