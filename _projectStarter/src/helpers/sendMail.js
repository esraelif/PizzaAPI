"use strict"

const nodemailer = require("nodemailer")

module.exports = function (to, subject, message) {
    // nodemailer.createTestAccount().then(data => console.log(data))
    // {
    //     user: 'zhv6x3yhyggs4gkc@ethereal.email',
    //         pass: '5eBSDrHPUAFdEyvxxq',
    //             smtp: { host: 'smtp.ethereal.email', port: 587, secure: false },
    //     imap: { host: 'imap.ethereal.email', port: 993, secure: true },
    //     pop3: { host: 'pop3.ethereal.email', port: 995, secure: true },
    //     web: 'https://ethereal.email',
    //         mxEnabled: false
    // }


    //!Connect nodemailer
    // const transporter = nodemailer.createTransport({
    //     host: "smtp.ethereal.email",
    //     port: 587,
    //     secure: false, // Use `true` for port 465, `false` for all other ports
    //     auth: {
    //         user: "zhv6x3yhyggs4gkc@ethereal.email",
    //         pass: "5eBSDrHPUAFdEyvxxq",
    //     },
    // });

    //*Sendmail
    // transporter.sendMail({
    //     from: '"Email1 👻" <zhv6x3yhyggs4gkc@ethereal.email>', // sender address
    //     to: "bar@example.com, baz@example.com,esraelifyeter@hotmail.com", // list of receivers
    //     subject: "Hello ✔", // Subject line
    //     text: "Hello world?", // plain text body
    //     html: "<b>Hello world?</b>", // html body
    // }, (error, success) => {
    //     error ? console.log(error) : console.log(success)
    // }
    // );

    //! Google(Gmail)
    const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    // transporter.sendMail({
    //     from: "elifesratunca@gmail.com",
    //     to: "elifesratunca@gmail.com,swifty.business.lol@gmail.com",
    //     subject: "Hello",
    //     text: "Hello Kaan",
    //     html: "<b>Hi!</b>"
    // }, (error, success) => console.log(success, error))

    //*YandexMail(yandex)
    // const transporter = nodemailer.createTransport({
    //     service: "gmail",
    //     auth: {
    //         user: "elifesratunca@gmail.com",
    //         pass: "mailşifresini yazmalısın",
    //     },
    // });
    transporter.sendMail({
        from: "elifesratunca@gmail.com",
        to: to,
        subject: subject,
        text: message,
        html: message
    }, (error, success) => console.log(success, error))
}