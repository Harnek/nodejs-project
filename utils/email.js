'use strict';

const Nodemailer = require('nodemailer');
const Handlebars = require('handlebars');

const options = {
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: process.env.SMTP_SSL, // true for 465, false for other ports
    auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD
    }
};

const smtpTransport = Nodemailer.createTransport(options);

/**
 * Send an email
 * @param {String} from From
 * @param {String} to To
 * @param {String} subject Subject
 * @param {String} html HTML template
 * @param {String} replacements
 * @param {String} bcc
 * @return {Promise}
 */

exports.sendEmail = (from, to, subject, attachments, templateFile, replacements, bcc) => {
    const template = Handlebars.compile(templateFile);
    const htmlToSend = template(replacements);
    const mailOptions = {
        from,
        to,
        subject,
        html: htmlToSend,
        attachments,
        priority: 'high',
        bcc
    };

    return new Promise((resolve, reject) => {
        smtpTransport.sendMail(mailOptions, (error, result) => {
            if (error) {
                console.log('error', error);
                reject(error);
            }
            else {
                console.log('Message sent: %s', result.messageId);
            }

            resolve(result);
        });
    });
};