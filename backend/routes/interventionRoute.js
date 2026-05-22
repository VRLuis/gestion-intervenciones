const express = require('express');
const router = express.Router();
const interventionController = require('../controllers/interventionController');
const requireAuth = require('../middleware/authMiddleware');

router.get('/', requireAuth, interventionController.getAllInterventions);

router.post('/', requireAuth, interventionController.createIntervention);

router.get('/types', requireAuth, interventionController.getInterventionTypes);

module.exports = router;