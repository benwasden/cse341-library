const express = require('express');
const router = express.Router();

const nonFictionController = require('../controllers/nonfiction');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', nonFictionController.getAll);

router.get('/:id', nonFictionController.getSingle);

router.get('/genre/:genre', nonFictionController.getByGenre);

router.post('/', isAuthenticated, validation.saveBook, nonFictionController.createBook);

router.put('/:id', isAuthenticated, validation.saveBook, nonFictionController.updateBook);

router.delete('/:id', isAuthenticated, nonFictionController.deleteBook);

module.exports = router;