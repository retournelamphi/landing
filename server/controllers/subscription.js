import Subscription from '../models/subscription';
import {sendgridKey} from './../private/sendgrid';
const sendgrid = require('sendgrid')(sendgridKey);

const MSG_ERROR_MAIL = 'Notre serveur mail rencontre des problèmes, merci de réessayer plus tard.';
const MSG_ERROR_MONGO_EMAIL_DUPLICATE = 'Ce mail est déjà utilisé.';
const MSG_ERROR_MONGO_ERROR = 'Un problème est survenu !';
const MSG_SUCCESS = 'Merci pour votre contribution !';

const renderWithFlagMsg = (res, next, err = null, msg = null) => {
    res.render('home', {err, msg});
    next();
};

export function subscribe(req, res, next) {
    const email = req.body.email;

    const subscription = new Subscription({
        email: email,
        ip: req.clientIp,
        date: new Date()
    });

    subscription.save((errMongo, doc) => {
        console.log(errMongo);
        if (!errMongo) {
            sendgrid.send(new sendgrid.Email({
                to: email,
                from: 'hi@retournelamphi.fr',
                subject: 'Merci',
                text: 'Merci pour cette subscription'
            }), (err, json) => {
                if (err) {
                    renderWithFlagMsg(res, next, MSG_ERROR_MAIL);
                } else {
                    renderWithFlagMsg(res, next, null, MSG_SUCCESS);
                }
            });
        } else {
            if (errMongo.code = 11000) {
                renderWithFlagMsg(res, next, MSG_ERROR_MONGO_EMAIL_DUPLICATE);
            } else {
                renderWithFlagMsg(res, next, MSG_ERROR_MONGO_ERROR);
            }
        }
    });
}