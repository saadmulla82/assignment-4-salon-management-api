const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { getAvailableServices, updateService, deleteService } = require('../controllers/serviceController');

router.get('/available', getAvailableServices);
router.put('/:id', authenticateToken, updateService);
router.delete('/:id', authenticateToken, deleteService);

module.exports = router;