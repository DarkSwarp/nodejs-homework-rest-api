const nodemailer = require("nodemailer");
const META_PASSWORD = process.env.META_PASSWORD;

const sendEmail = (email, verificationToken) => {
    const config = {
        host: "smtp.meta.ua",
        port: 465,
        secure: true,
        auth: {
            user: "mihkleban@meta.ua",
            pass: META_PASSWORD,
        },
    };

    const transporter = nodemailer.createTransport(config);
    const emailOptions = {
        from: "mihkleban@meta.ua",
        to: `${email}`,
        subject: "Verification",
        text: `Your verification link: http://localhost:3000/api/users/verify/${verificationToken}`,
    };

    transporter
        .sendMail(emailOptions)
        .then((info) => console.log(info))
        .catch((err) => console.log(err));
};

module.exports = {
    sendEmail,
};