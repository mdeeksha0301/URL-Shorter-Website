const express = require('express');
const router = express.Router();
const {handleUser, handleUserLogin} = require('../controller/user')

router.post('/', handleUser);
router.post('/login', handleUserLogin);

module.exports = router;