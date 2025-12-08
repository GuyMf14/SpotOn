// backend/api/session/session.routes.js
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Parking Sessions API is running');
});

module.exports = router;