const sgMail = require('@sendgrid/mail');
sgMail.setApiKey('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');


async function sendRegisterMail(userEmail) {
    const msg = {
        to: userEmail,
        from: 'mon.amour.wedding.agency@gmail.com',
        subject: 'Вітаємо',
        text: `Вітаємо із реєстрацією у Mon Amour!`,
    };
    sgMail.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    });
}

async function sendMailToMonAmour(body) {
    const { email, phone, username, questiontype, message } = body;
    const msg = {
        to: 'mon.amour.wedding.agency@gmail.com',
        from: 'mon.amour.wedding.agency@gmail.com',
        subject: 'Повідомлення від клієнта із сайту',
        text: `Електронна пошта: ${email}\nНомер телефону: ${phone}\nІм'я: ${username}\nТип запитання: ${questiontype}\nТекст повідомлення: ${message}`,
    };
    sgMail.send(msg).then(() => {
        console.log('Message sent')
    }).catch((error) => {
        console.log(error.response.body)
        // console.log(error.response.body.errors[0].message)
    });
}

module.exports = { sendRegisterMail, sendMailToMonAmour };



