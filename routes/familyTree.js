const express = require('express');
const router = express.Router();

const familyTreeController = require('../controllers/familyTree');
const validation = require('../middleware/validateFamilyTree');

router.get('/', familyTreeController.getAll);

router.get('/:id', familyTreeController.getSingle);

router.post('/', validation.saveFamilyTree, familyTreeController.createFamilyTree);

router.put('/:id', validation.saveFamilyTree, familyTreeController.updateFamilyTree);

router.delete('/:id', familyTreeController.deleteFamilyTree);

module.exports = router;