const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');
// routes for home
router.get('/', homeController.home);
router.get('/forgot-password', homeController.forgotPassword);
router.post('/generate-password', homeController.generatePassword);
// setting router for users
router.use('/users', require('./users'));

module.exports = router;