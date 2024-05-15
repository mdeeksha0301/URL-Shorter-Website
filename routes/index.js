const express = require('express');
const router = express.Router();
const {handleNewUrl, handleUrl, handleAnalyticsUrl} = require('../controller/index');

router.post('/', handleNewUrl);
router.get('/:shortid', handleUrl);
router.get('/analytics/:shortid', handleAnalyticsUrl)


module.exports = router;