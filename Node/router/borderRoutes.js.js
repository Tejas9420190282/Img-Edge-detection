
const express = require('express');
const { saveBorders, getBorders, deleteBorders } = require('../Controller/borderController.js');

const router = express.Router();

router.post('/', saveBorders);
router.get('/:imageUrl', getBorders);
router.delete('/:imageUrl', deleteBorders);

module.exports = router;