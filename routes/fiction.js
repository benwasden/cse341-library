const express = require('express');
const router = express.Router();

const fictionController = require('../controllers/fiction');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', fictionController.getAll);

router.get('/:id', fictionController.getSingle);

router.post('/', isAuthenticated, validation.saveBook, fictionController.createBook);

router.put('/:id', isAuthenticated, validation.saveBook, fictionController.updateBook);

router.delete('/:id', isAuthenticated, fictionController.deleteBook);

module.exports = router;