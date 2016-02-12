import Subscription from '../models/subscription';
import {sendgridKey} from './../private/sendgrid';
const sendgrid = require('sendgrid')(sendgridKey);

export function subscribe(req, res, next) {
    const subscription = new Subscription({
        email: req.body.email,
        ip: req.clientIp,
        subAt: new Date()
    });

    subscription.save((err, doc) => {
        if(!err){
            sendgrid.send(new sendgrid.Email({
                to: req.body.email,
                from: 'hi@retournelamphi.fr',
                subject: 'Merci',
                text: 'Merci pour cette subscription'
            }), (err, json) => {
                if (err) {
                    return console.error(err);
                }
            });
        }
    });
}