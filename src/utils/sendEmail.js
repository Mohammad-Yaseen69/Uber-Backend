import nodemailer from "nodemailer"

const sendEmail = async (subject, text, html = "", toEmail) => {
    try {
        const transport =  nodemailer.createTransport({
            host: process.env.HOST,
            port: process.env.EMAIL_PORT,
            service: 'gmail',
            secure: true,
            auth:{
                user: process.env.USER,
                pass: process.env.PASS
            }
        })

        await transport.sendMail({
            subject: subject,
            html: html,
            text: text,
            to: toEmail,
            from: process.env.USER,
        })
        console.log('email sent successfully')
    } catch (error) {
        console.log(`error while sending email \n error: ${error.message}`)
    }
}

export {sendEmail}