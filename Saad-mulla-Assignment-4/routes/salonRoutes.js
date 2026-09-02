const express = require('express');
const router = express.Router();
const authenticateToken = require('../middleware/authMiddleware');
const { getAllSalons, getTopSalons, getSalonsByCity, getSalonById, createSalon, updateSalon, deleteSalon, getSalonServices, addServiceToSalon } = require('../controllers/salonController');

router.get('/top', getTopSalons);
router.get('/city/:city', getSalonsByCity);
router.get('/', getAllSalons);
router.get('/:id', getSalonById);
router.post('/', authenticateToken, createSalon);
router.put('/:id', authenticateToken, updateSalon);
router.delete('/:id', authenticateToken, deleteSalon);
router.get('/:id/services', getSalonServices);
router.post('/:id/services', authenticateToken, addServiceToSalon);

module.exports = router;