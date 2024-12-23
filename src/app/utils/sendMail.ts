import nodemailer from 'nodemailer'
const sendMail = async (to: string, html: string) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: process.env.NODE_DEV === 'production', // true for port 465, false for other ports
        auth: {
            user: "shofiqul.sujon2201@gmail.com",
            pass: "yulh zslr hbtg sncc",
        },
    });

    await transporter.sendMail({
        from: '<shofiqul.sujon2201@gmail.com>', // sender address
        to,
        subject: "Reset your password within ten mins!", // Subject line
        text: "Reset your password within ten mins!", // plain text body
        html
    });
}
export default sendMail