import express from 'express';
import * as subscriptionCtrl from '../controllers/subscription';

const router = express.Router();

router.post('/subscription', subscriptionCtrl.subscribe);
router.get('/', (req, res, next) => res.render('home'));

export default router;