const nodemailer = require("nodemailer");
class MailService {
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT,
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }
  async sendActivationMail(to, link) {
    try {
      await this.transporter.sendMail({
        from: process.env.SMTP_USER,
        to,
        subject: `Активация аккаутна на ${process.env.API_URL}`,
        text: "",
        html: `
            <div>
            <h1>Для активации аккаунта нажмите на ссылку</h1>
            <a href="${link}">${link}</a>
            </div>
            `,
      });
    } catch (err) {
      throw new Error(`ошибка отправки ссылки активации`);
    }
  }
}

module.exports = new MailService();
