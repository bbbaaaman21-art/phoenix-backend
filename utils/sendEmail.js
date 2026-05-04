const nodemailer = require("nodemailer");

async function sendEmail(to, resetLink) {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "bbbaaaman21@gmail.com",
        pass: "zzrf ahnl itwv esqi"
      }
    });

    await transporter.sendMail({
      from: '"Rovix Home" <YOUR_GMAIL@gmail.com>',
      to,
      subject: "إعادة تعيين كلمة المرور",
      html: `
        <div style="font-family: Arial; direction: rtl">
          <h2>إعادة تعيين كلمة المرور</h2>
          <p>اضغط على الرابط التالي لتغيير كلمة المرور:</p>
          <a href="${resetLink}" target="_blank">${resetLink}</a>
          <p>الرابط صالح لمدة 15 دقيقة.</p>
        </div>
      `
    });

    console.log("📧 Email sent to:", to);

  } catch (err) {
    console.error("❌ Email error:", err);
  }
}

module.exports = sendEmail;
