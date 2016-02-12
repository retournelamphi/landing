import Subscription from '../models/subscription';
import {sendgridKey} from './../private/sendgrid';
import {
    MSG_ERROR_MAIL,
    MAIL_BODY,
    MAIL_SUBJECT,
    MAIL_SERVER_ADRESS,
    MSG_ERROR_MONGO_EMAIL_DUPLICATE,
    MSG_ERROR_MONGO_ERROR, MSG_SUCCESS
} from './../constants/subscription'

const sendgrid = require('sendgrid')(sendgridKey);


const renderWithFlagMsg = (res, next, err = null, msg = null) => {
    res.render('home', {err, msg});
    next();
};

const sendMail = (email) => {
    return new Promise((resolve, reject) => {
        sendgrid.send(new sendgrid.Email({
            to: email,
            from: MAIL_SERVER_ADRESS,
            subject: MAIL_SUBJECT,
            text: MAIL_BODY
        }), (err, json) => {
            if (err) {
                reject(MSG_ERROR_MAIL)
            } else {
                resolve(json)
            }
        });
    });
};


export function subscribe(req, res, next) {
    const email = req.body.email;

    const subscription = new Subscription({
        email: email,
        ip: req.clientIp,
        date: new Date()
    });

    subscription.save().then(λ => {
        sendMail(email).then(λ => {
            renderWithFlagMsg(res, next, null, MSG_SUCCESS);
        }).catch(λ => {
            renderWithFlagMsg(res, next, MSG_ERROR_MAIL);
        })
    }).catch((e) => {
        if (e.code = 11000) {
            renderWithFlagMsg(res, next, MSG_ERROR_MONGO_EMAIL_DUPLICATE);
        } else {
            renderWithFlagMsg(res, next, MSG_ERROR_MONGO_ERROR);
        }
    });
}