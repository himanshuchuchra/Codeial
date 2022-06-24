// Import Section
const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users_controller');
const passport = require('passport');

// Route Section
router.get('/sign-up', usersController.signUp);
router.get('/sign-in', usersController.signIn);
router.get('/profile', usersController.profile);
router.post('/create', usersController.create);
router.post('/create-session', passport.authenticate('local', {
    failureRedirect: 'users/sign-in'
}) ,usersController.createSession);

module.exports = router;