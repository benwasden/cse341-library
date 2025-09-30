const express = require('express');
const router = express.Router();

const groupsController = require('../controllers/groups');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');



module.exports = router;