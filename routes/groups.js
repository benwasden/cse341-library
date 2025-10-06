const express = require('express');
const router = express.Router();

const groupController = require('../controllers/groups');
const validation = require('../middleware/validate');
const { isAuthenticated } = require("../middleware/authenticate");

router.get('/', groupController.getAll);

router.get('/:id', groupController.getSingle);

router.post('/', isAuthenticated, validation.saveBook, groupController.createGroup);

router.put('/:id', isAuthenticated, validation.saveBook, groupController.updateGroup);

router.delete('/:id', isAuthenticated, groupController.deleteGroup);

module.exports = router;