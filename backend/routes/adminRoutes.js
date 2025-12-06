const express = require('express');
const { getAdminStats, getAllUsers } = require('../controllers/adminController');
const { verifyToken, authorizeRoles } = require('../middleware/authMiddleware');
const router = express.Router();
router.get('/stats', verifyToken, authorizeRoles('admin'), getAdminStats);
router.get('/users', verifyToken, authorizeRoles('admin'), getAllUsers);
router.put('/users/:id/role', verifyToken, authorizeRoles('admin'), require('../controllers/adminController').updateUserRole);
router.delete('/users/:id', verifyToken, authorizeRoles('admin'), require('../controllers/adminController').deleteUser);
module.exports = router;
