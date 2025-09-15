// Activity Routes for API Endpoints
const express = require('express');
const ActivityController = require('../controllers/ActivityController');
const { createLogger } = require('../utils/helpers');

const router = express.Router();
const activityController = new ActivityController();
const logger = createLogger('ActivityRoutes');

// Middleware for error handling
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Create new activity
router.post('/', asyncHandler(async (req, res) => {
  const result = await activityController.createActivity(req.body);
  res.status(201).json(result);
}));

// Get activity by ID
router.get('/:activityId', asyncHandler(async (req, res) => {
  const result = await activityController.getActivityById(req.params.activityId);
  res.json(result);
}));

// Update activity
router.put('/:activityId', asyncHandler(async (req, res) => {
  const result = await activityController.updateActivity(req.params.activityId, req.body);
  res.json(result);
}));

// Delete activity
router.delete('/:activityId', asyncHandler(async (req, res) => {
  const result = await activityController.deleteActivity(req.params.activityId);
  res.json(result);
}));

// Get activities for a user
router.get('/user/:userId', asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, ...filters } = req.query;
  const result = await activityController.getUserActivities(
    req.params.userId, 
    parseInt(page), 
    parseInt(limit), 
    filters
  );
  res.json(result);
}));

// Get user activity statistics
router.get('/user/:userId/stats', asyncHandler(async (req, res) => {
  const { days = 30 } = req.query;
  const result = await activityController.getUserActivityStats(req.params.userId, parseInt(days));
  res.json(result);
}));

// Get upcoming activities
router.get('/user/:userId/upcoming', asyncHandler(async (req, res) => {
  const { days = 7 } = req.query;
  const result = await activityController.getUpcomingActivities(req.params.userId, parseInt(days));
  res.json(result);
}));

// Get overdue activities
router.get('/user/:userId/overdue', asyncHandler(async (req, res) => {
  const result = await activityController.getOverdueActivities(req.params.userId);
  res.json(result);
}));

// Add issue to activity
router.post('/:activityId/issues', asyncHandler(async (req, res) => {
  const result = await activityController.addActivityIssue(req.params.activityId, req.body);
  res.json(result);
}));

// Resolve activity issue
router.put('/:activityId/issues/:issueId/resolve', asyncHandler(async (req, res) => {
  const { resolution } = req.body;
  const result = await activityController.resolveActivityIssue(
    req.params.activityId, 
    req.params.issueId, 
    resolution
  );
  res.json(result);
}));

// Add attachment to activity
router.post('/:activityId/attachments', asyncHandler(async (req, res) => {
  const result = await activityController.addActivityAttachment(req.params.activityId, req.body);
  res.json(result);
}));

// Get activity templates
router.get('/templates/all', asyncHandler(async (req, res) => {
  const result = await activityController.getActivityTemplates();
  res.json(result);
}));

// Create activity from template
router.post('/templates/:templateType', asyncHandler(async (req, res) => {
  const result = await activityController.createActivityFromTemplate(
    req.params.templateType, 
    req.body
  );
  res.status(201).json(result);
}));

// Get crop-wise activity summary
router.get('/user/:userId/crops/:crop/summary', asyncHandler(async (req, res) => {
  const result = await activityController.getCropActivitySummary(
    req.params.userId, 
    req.params.crop
  );
  res.json(result);
}));

// Export activities
router.get('/user/:userId/export', asyncHandler(async (req, res) => {
  const { format = 'json', ...filters } = req.query;
  const result = await activityController.exportActivities(
    req.params.userId, 
    format, 
    filters
  );
  
  if (format === 'csv') {
    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=activities.csv');
    res.send(result.data);
  } else {
    res.json(result);
  }
}));

// Bulk update activities
router.put('/bulk/update', asyncHandler(async (req, res) => {
  const { activityIds, updates } = req.body;
  const result = await activityController.bulkUpdateActivities(activityIds, updates);
  res.json(result);
}));

// Get activity insights
router.get('/user/:userId/insights', asyncHandler(async (req, res) => {
  const { days = 90 } = req.query;
  const result = await activityController.getActivityInsights(req.params.userId, parseInt(days));
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
