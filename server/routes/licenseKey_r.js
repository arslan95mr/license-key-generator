const express = require('express');
const controller = require('../controllers/licenseKey_c');
const { createOne, download, deleteOne, getList } = controller;
const router = express.Router();

router.post('/create', createOne);
router.get('/', getList);
router.get('/download/:filename', download);
router.delete('/delete/:filename', deleteOne);

module.exports = router;