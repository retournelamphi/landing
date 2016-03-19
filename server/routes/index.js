import express from 'express';
import * as subscriptionCtrl from '../controllers/subscription';

const router = express.Router();

router.post('/subscription', subscriptionCtrl.subscribe);
router.get('/count', subscriptionCtrl.count);
router.get('/', (req, res, next) => res.render('index.html'));
router.get('*', (req, res) => res.redirect('/'));

export default router;