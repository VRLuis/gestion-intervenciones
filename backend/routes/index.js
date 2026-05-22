const express = require('express');
const router = express.Router();

const authRoute = require('./authRoute');
const interventionRoute = require('./interventionRoute');

router.use('/auth', authRoute)
router.use('/intervention', interventionRoute)

module.exports = router;