// Advisory Routes for API Endpoints
const express = require('express');
const AdvisoryController = require('../controllers/AdvisoryController');
const { createLogger } = require('../utils/helpers');

const router = express.Router();
const advisoryController = new AdvisoryController();
const logger = createLogger('AdvisoryRoutes');

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create new advisory
router.post('/', asyncHandler(async (req, res) => {
  const result = await advisoryController.createAdvisory(req.body);
  res.status(201).json(result);
}));

// Get advisory by ID
router.get('/:advisoryId', asyncHandler(async (req, res) => {
  const result = await advisoryController.getAdvisoryById(req.params.advisoryId);
  res.json(result);
}));

// Update advisory status
router.put('/:advisoryId/status', asyncHandler(async (req, res) => {
  const { status, ...additionalData } = req.body;
  const result = await advisoryController.updateAdvisoryStatus(
    req.params.advisoryId, 
    status, 
    additionalData
  );
  res.json(result);
}));

// Add feedback to advisory
router.post('/:advisoryId/feedback', asyncHandler(async (req, res) => {
  const { feedback, notes = '' } = req.body;
  const result = await advisoryController.addAdvisoryFeedback(
    req.params.advisoryId, 
    feedback, 
    notes
  );
  res.json(result);
}));

// Get advisories for a user
router.get('/user/:userId', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, ...filters } = req.query;
  const result = await advisoryController.getUserAdvisories(
    req.params.userId, 
    parseInt(page), 
    parseInt(limit), 
    filters
  );
  res.json(result);
}));

// Get active advisories for a user
router.get('/user/:userId/active', asyncHandler(async (req, res) => {
  const result = await advisoryController.getActiveAdvisories(req.params.userId);
  res.json(result);
}));

// Get urgent advisories for a user
router.get('/user/:userId/urgent', asyncHandler(async (req, res) => {
  const result = await advisoryController.getUrgentAdvisories(req.params.userId);
  res.json(result);
}));

// Generate personalized advisories
router.post('/user/:userId/generate', asyncHandler(async (req, res) => {
  const userContext = req.body;
  const result = await advisoryController.generatePersonalizedAdvisories(
    req.params.userId, 
    userContext
  );
  res.status(201).json(result);
}));

// Get user advisory statistics
router.get('/user/:userId/stats', asyncHandler(async (req, res) => {
  const { days = 30 } = req.query;
  const result = await advisoryController.getUserAdvisoryStats(req.params.userId, parseInt(days));
  res.json(result);
}));

// Get advisory recommendations
router.get('/user/:userId/recommendations', asyncHandler(async (req, res) => {
  const result = await advisoryController.getAdvisoryRecommendations(req.params.userId);
  res.json(result);
}));

// Create advisory from template
router.post('/templates/:templateType', asyncHandler(async (req, res) => {
  const result = await advisoryController.createAdvisoryFromTemplate(
    req.params.templateType, 
    req.body
  );
  res.status(201).json(result);
}));

// Get advisory action plan
router.get('/:advisoryId/action-plan', asyncHandler(async (req, res) => {
  const result = await advisoryController.getAdvisoryActionPlan(req.params.advisoryId);
  res.json(result);
}));

// Export advisories for offline use
router.get('/user/:userId/offline-export', asyncHandler(async (req, res) => {
  const result = await advisoryController.exportAdvisoriesForOffline(req.params.userId);
  res.json(result);
}));

// Bulk update advisory status
router.put('/bulk/status', asyncHandler(async (req, res) => {
  const { advisoryIds, status, ...additionalData } = req.body;
  const result = await advisoryController.bulkUpdateAdvisoryStatus(
    advisoryIds, 
    status, 
    additionalData
  );
  res.json(result);
}));

// Clean up expired advisories
router.delete('/cleanup/expired', asyncHandler(async (req, res) => {
  const result = await advisoryController.cleanupExpiredAdvisories();
  res.json(result);
}));

// Get advisory effectiveness metrics
router.get('/admin/effectiveness', asyncHandler(async (req, res) => {
  const { days = 90 } = req.query;
  const result = await advisoryController.getAdvisoryEffectiveness(parseInt(days));
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
