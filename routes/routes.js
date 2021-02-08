const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

// get request route handler.
// Calls our Controller
router.post('/charge', controllers.charge);

module.exports = router;