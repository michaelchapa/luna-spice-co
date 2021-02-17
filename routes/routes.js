const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

router.post('/charge', controllers.charge);

module.exports = router;