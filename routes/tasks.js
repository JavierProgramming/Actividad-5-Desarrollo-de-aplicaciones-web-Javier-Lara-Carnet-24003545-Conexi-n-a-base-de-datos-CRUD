var express = require('express');
var router = express.Router();
var mysql = require('mysql');

var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  database : 'mysql'  // Cambia al nombre de tu base de datos real
});

connection.connect(function(err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});

// Aquí un arreglo local solo como ejemplo, para tener datos iniciales (opcional)
let tasks = [
  {
    id: '1',
    name: 'Aprobar exámenes',
    description: 'Estudiar todos los temas para los exámenes finales',
    dueDate: '2024-06-15'
  },
  {
    id: '2',
    name: 'Preparar presentación',
    description: 'Crear diapositivas para la presentación del proyecto',
    dueDate: '2024-05-30'
  }
];

/* GET all tasks */
router.get('/getTasks', function(req, res, next) {
  let query = 'SELECT * FROM tasks';
  connection.query(query, function (err, results) {
    if (err) {
      console.log(err);
      res.status(500).json(err);
    } else {
      res.json(results);
    }
  });
});

/* DELETE task by id */
router.delete('/removeTask/:id', function(req, res, next) {
  if (req.params && req.params.id) {
    let id = req.params.id;
    let query = 'DELETE FROM tasks WHERE id = ?';
    connection.query(query, [id], function(err, results) {
      if (err) {
        console.log(err);
        res.status(500).json(err);
      } else {
        res.json(results);
      }
    });
  } else {
    res.status(400).json({});
  }
});

/* POST add new task */
router.post('/addTask', function(req, res, next) {
  if (req.body && req.body.name && req.body.description && req.body.dueDate) {
    let query = 'INSERT INTO tasks (name, description, dueDate) VALUES (?, ?, ?)';
    connection.query(query, [req.body.name, req.body.description, req.body.dueDate], function(err, results) {
      if (err) {
        res.status(400).json(err);
      } else {
        res.status(200).json(results);
      }
    });
  } else {
    res.status(400).json({ error: 'Faltan datos en el cuerpo de la petición' });
  }
});

module.exports = router;
