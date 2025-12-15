// backend/api/rate/rate.routes.js
const express = require('express');
const { requireAdmin, requireAuth } = require('../../middlewares/auth.middleware');
const router = express.Router();

// זהו פשוט ראוטר Placeholder כדי שהשרת יעלה.
// בהמשך נכניס לכאן את הפונקציות מה-Controller.

// דוגמה: קבלת כל התעריפים הפעילים
router.get('/', (req, res) => {
    res.send('Rate API is working (List Rates)');
});

// דוגמה: יצירת תעריף חדש (רק אדמין)
// router.post('/', requireAuth, requireAdmin, controller.addRate); 

module.exports = router;