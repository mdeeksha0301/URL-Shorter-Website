const express = require('express');
const router = express.Router();
const {handleHome, handleSignup, handlelogin} = require('../controller/staticController')

router.get('/', handleHome);
router.get('/signup', handleSignup);
router.get('/login', handlelogin);


module.exports = router;