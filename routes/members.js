const express = require('express');
const router = express.Router();

const membersController = require('../controllers/members');
const validation = require('../middleware/validateMember');

const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', membersController.getAll);

router.get('/:id', membersController.getSingle);

router.post('/', isAuthenticated, validation.saveMember, membersController.createMember);

router.put('/:id', isAuthenticated, validation.saveMember, membersController.updateMember);

router.delete('/:id', isAuthenticated, membersController.deleteMember);

module.exports = router;