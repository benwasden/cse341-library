const express = require('express');
const router = express.Router();

const comicController = require('../controllers/comics');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', comicController.getAll);

router.get('/:id', comicController.getSingle);

router.get('/genre/:genre', comicController.getByGenre);

router.post('/', isAuthenticated, validation.saveComic, comicController.createBook);

router.put('/:id', isAuthenticated, validation.saveComic, comicController.updateBook);

router.delete('/:id', isAuthenticated, comicController.deleteBook);

module.exports = router;