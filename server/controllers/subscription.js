import Subscription from '../models/subscription';


export function subscribe(req, res, next){
    const subscription = new Subscription({
        email: req.body.email,
        ip: req.clientIp,
        subAt: new Date()
    });

    subscription.save();
}