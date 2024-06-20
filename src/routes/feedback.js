const express = require('express');
const sendFeedback = require('../controller/feedback');

const router = express.Router();

router.post('/send', sendFeedback);

module.exports = router;
