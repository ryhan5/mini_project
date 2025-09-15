// User Routes for API Endpoints
const express = require('express');
const UserController = require('../controllers/UserController');
const { createLogger } = require('../utils/helpers');

const router = express.Router();
const userController = new UserController();
const logger = createLogger('UserRoutes');

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create new user
router.post('/', asyncHandler(async (req, res) => {
  const result = await userController.createUser(req.body);
  res.status(201).json(result);
}));

// Get all users with pagination and filters
router.get('/', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, ...filters } = req.query;
  const result = await userController.getUsers(parseInt(page), parseInt(limit), filters);
  res.json(result);
}));

// Get user by ID
router.get('/:userId', asyncHandler(async (req, res) => {
  const result = await userController.getUserById(req.params.userId);
  res.json(result);
}));

// Update user
router.put('/:userId', asyncHandler(async (req, res) => {
  const result = await userController.updateUser(req.params.userId, req.body);
  res.json(result);
}));

// Delete user
router.delete('/:userId', asyncHandler(async (req, res) => {
  const result = await userController.deleteUser(req.params.userId);
  res.json(result);
}));

// Authenticate user
router.post('/auth', asyncHandler(async (req, res) => {
  const { identifier, method = 'email' } = req.body;
  const result = await userController.authenticateUser(identifier, method);
  res.json(result);
}));

// Get user statistics
router.get('/admin/stats', asyncHandler(async (req, res) => {
  const result = await userController.getUserStats();
  res.json(result);
}));

// Update user subscription
router.put('/:userId/subscription', asyncHandler(async (req, res) => {
  const result = await userController.updateSubscription(req.params.userId, req.body);
  res.json(result);
}));

// Get users by location
router.get('/location/:state', asyncHandler(async (req, res) => {
  const { district } = req.query;
  const result = await userController.getUsersByLocation(req.params.state, district);
  res.json(result);
}));

// Export users
router.get('/admin/export', asyncHandler(async (req, res) => {
  const { format = 'json' } = req.query;
  const result = await userController.exportUsers(format);
  
  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=users.csv');
    res.send(result.data);
  } else {
    res.json(result);
  }
}));

// Bulk update users
router.put('/bulk/update', asyncHandler(async (req, res) => {
  const { userIds, updates } = req.body;
  const result = await userController.bulkUpdateUsers(userIds, updates);
  res.json(result);
}));

// Error handling middleware
router.use((error, req, res, next) => {
  logger.error('Route error:', error);
  
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  const code = error.code || 'INTERNAL_ERROR';
  
  res.status(statusCode).json({
    success: false,
    error: {
      message,
      code,
      ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
    }
  });
});

module.exports = router;
