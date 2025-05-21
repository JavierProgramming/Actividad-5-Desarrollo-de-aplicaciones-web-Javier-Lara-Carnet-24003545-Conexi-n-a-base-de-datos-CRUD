var express = require('express');
var router = express.Router();

// Datos simulados de usuarios
const users = [
  { id: 1, name: 'Ana Gómez', email: 'ana.gomez@example.com' },
  { id: 2, name: 'Luis Fernández', email: 'luis.fernandez@example.com' },
  { id: 3, name: 'Sofía Martínez', email: 'sofia.martinez@example.com' }
];

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.json(users);
});

module.exports = router;
