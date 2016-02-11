import express from 'express';
const router = express.Router();

router.get('/', function(req, res, next) {
    res.render('home');
});

export default router;