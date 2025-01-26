const express = require('express');
const router = express.Router();
const authRoutes = require('./authRoutes');
const gadgetRoutes = require('./gadgetRoutes');

// Health check endpoint
router.get('/', (req, res) => {
  res.json({
    message: 'IMF Gadget API - Operational',
    documentation: '/api-docs',
    status: 'Nominal'
  });
});

// Authentication routes
router.use('/auth', authRoutes);

// Gadget routes (protected)

router.use(gadgetRoutes);

module.exports = router;