const express = require('express');
const router = express.Router();

router.use('/', require('./swagger'));
router.use('/members', require('./members'));
router.use('/familyTree', require('./familyTree'));

module.exports = router;