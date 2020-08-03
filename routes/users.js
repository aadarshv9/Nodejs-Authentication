const express = require('express');
const router = express.Router();
const passport = require('passport');
const usersController = require('../controllers/users_controller');

// use passport as a middleware to authenticate
router.post('/create-session', passport.authenticate(
    'local',
    {failureRedirect: '/'},
), passport.setAuthenticatedUser, usersController.createSession);
// routes for users
router.post('/create', usersController.create);
router.get('/sign-out', usersController.destroySession);
router.get('/profile/:id', passport.checkAuthentication, usersController.profile);
router.get('/home/:id', passport.checkAuthentication, usersController.home);
router.get('/reset-page/:id', passport.checkAuthentication, usersController.reset);
router.post('/reset-password/:id', passport.checkAuthentication, usersController.resetPassword);
// route for google sign-in/sign-up page
router.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
//route for google auth response
router.get('/auth/google/callback', passport.authenticate('google', {failureRedirect: '/'}), passport.setAuthenticatedUser, usersController.createSession);

module.exports = router;