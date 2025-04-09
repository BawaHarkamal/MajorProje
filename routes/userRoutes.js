// routes/userRoutes.js
const express = require('express');
const { signup } = require('../controllers/signup');
const { signin } = require('../controllers/signin'); 
const router = express.Router();

// Signup route
router.post('/signup', signup);

// Signin route
router.post('/signin', signin);
module.exports = router;
