const express = require('express');

const router = express.Router();
const homeController = require('../controllers/home_controller');

console.log('router loaded');

router.get('/', homeController.home);
router.get('/forgot-password', homeController.forgotPassword);
router.post('/generate-password', homeController.generatePassword);

router.use('/users', require('./users'));

module.exports = router;