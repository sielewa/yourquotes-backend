const express = require('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();

router
    .route('/')
    .get()
    .post(postControllers.Register);

module.exports = router;