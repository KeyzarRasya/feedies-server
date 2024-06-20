const express = require('express')
const {signup, login, genearetApi, createConnection, disconnectConnection} = require("../controller/business")
const {isLoggedIn} = require('../middleware/auth');
const { disconnect } = require('mongoose');

const router = express.Router();

router.post('/signup', signup);
router.post('/login', login);
router.post('/generate/api',isLoggedIn, genearetApi);
router.post('/connect', createConnection);
router.post('/disconnect', disconnectConnection)

module.exports = router;