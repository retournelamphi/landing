import Subscription from '../models/subscription';
import {sendgridKey} from './../private/sendgrid';
const sendgrid = require('sendgrid')(sendgridKey);

/**
 *
 * @param res
 * @param err
 * @param msg
 */
const renderWithFlagMsg = (res, err = null, msg = null) => {
  res.render('home', { err, msg });
};

export function subscribe(req, res, next) {
    const subscription = new Subscription({
        email: req.body.email,
        ip: req.clientIp,
        subAt: new Date()
    });

    subscription.save((errMongo, doc) => {
        if(!errMongo){
            sendgrid.send(new sendgrid.Email({
                to: req.body.email,
                from: 'hi@retournelamphi.fr',
                subject: 'Merci',
                text: 'Merci pour cette subscription'
            }), (err, json) => {
                if (err) {
                    renderWithFlagMsg(res, "Notre serveur mail rencontre des problèmes, merci de réessayer plus tard.");
                    return console.error(err);
                } else {
                  renderWithFlagMsg(res, null, 'Email bien envoyé !');
                }
            });
        } else {
          let messageError;
          if(errMongo.code = 11000) {
            messageError = 'Ce mail est déjà utilisé';
          } else {
            messageError = 'Un problème est apparu'
          }

          renderWithFlagMsg(res, messageError);
        }
    });
}