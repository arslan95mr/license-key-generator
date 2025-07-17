const express = require('express');
const router = express.Router();

const licenseKey = require('./routes/licenseKey_r');

router.use('/license-keys', licenseKey);

module.exports = router;