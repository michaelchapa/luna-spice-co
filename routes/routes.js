const express = require('express');
const router = express.Router();
const controllers = require('./../controllers/controllers');

// get request route handler.
// Calls our Controller saySomething
router.get('/say-something', controllers.saySomething);

// Calls our Controller somethingElse
router.get('/something-else', controllers.somethingElse);

module.exports = router;