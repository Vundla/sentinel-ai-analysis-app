const express = require('express');
const reportController = require('../controllers/reportController');
const router = express.Router();
// Health check endpoint
router.get('/test', (req, res) => {
	res.json({ message: 'Report API is working!' });
});

// Define the routes and link them to the controller methods
router.get('/', reportController.getAllReports);
router.post('/', reportController.createReport);
router.post('/ai/suggest', reportController.getAiSuggestion); // Note the order matters
router.post('/:id/analyze', reportController.analyzeReport);
router.delete('/:id', reportController.deleteReport);

module.exports = router;
