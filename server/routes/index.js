import express from 'express';
import * as subscriptionCtrl from '../controllers/subscription';

const router = express.Router();

router.post('/subscription', subscriptionCtrl.subscribe);
router.get('/', (req, res, next) =>       res.render('index', {
    title: 'Retourne L\'amphi'
}));
router.get('*', (req, res) => res.redirect('/'));

export default router;