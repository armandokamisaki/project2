const express = require('express');
const router = express.Router();

const membersController = require('../controllers/members');
const validation = require('../middleware/validateMember');

router.get('/', membersController.getAll);

router.get('/:id', membersController.getSingle);

router.post('/', validation.saveMember, membersController.createMember);

router.put('/:id', validation.saveMember, membersController.updateMember);

router.delete('/:id', membersController.deleteMember);

module.exports = router;