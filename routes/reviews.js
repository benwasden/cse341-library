const express = require('express');
const router = express.Router();

const reviewsController = require('../controllers/reviews');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/authenticate');



module.exports = router;