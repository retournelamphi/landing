import express from 'express';
import * as subscriptionCtrl from '../controllers/subscription';

const router = express.Router();

router.post('/subscription', subscriptionCtrl.subscribe);
router.get('/', (req, res, next) => res.render('home'));
router.get('*', (req, res) => res.redirect('/'));

export default router;