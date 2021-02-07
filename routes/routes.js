const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

// get request route handler.
// Calls our Controller
router.get('/charge', controllers.charge);
router.post('/chargestripe', controllers.chargestripe);

module.exports = router;