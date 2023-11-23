const express = require('express');
const router = express.Router();

const familyTreeController = require('../controllers/familyTree');
const validation = require('../middleware/validateFamilyTree');

const {isAuthenticated} = require('../middleware/authenticate');

router.get('/', familyTreeController.getAll);

router.get('/:id', familyTreeController.getSingle);

router.post('/', isAuthenticated, validation.saveFamilyTree, familyTreeController.createFamilyTree);

router.put('/:id', isAuthenticated, validation.saveFamilyTree, familyTreeController.updateFamilyTree);

router.delete('/:id', isAuthenticated, familyTreeController.deleteFamilyTree);

module.exports = router;