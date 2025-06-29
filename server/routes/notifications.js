const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  getNotifications,
  markAllAsRead,
  createNotification
} = require('../controllers/notificationController');

// All routes require authentication
router.use(auth);

// GET /api/notifications - Get all notifications
router.get('/', getNotifications);

// POST /api/notifications/mark-all-read - Mark all as read
router.post('/mark-all-read', markAllAsRead);

// POST /api/notifications - Create a notification (for testing/demo)
router.post('/', createNotification);

module.exports = router; 