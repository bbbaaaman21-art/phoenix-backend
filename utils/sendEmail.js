const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

async function sendEmail(to, resetLink) {

  try {

    await apiInstance.sendTransacEmail({

      sender: {
        name: "Rovix Home",
        email: process.env.EMAIL_FROM
      },

      to: [
        { email: to }
      ],

      subject: "إعادة تعيين كلمة المرور",

      htmlContent: `
        <div style="font-family:Arial; direction:rtl">
          <h2>إعادة تعيين كلمة المرور</h2>

          <p>اضغط على الزر التالي لتغيير كلمة المرور:</p>

          <a href="${resetLink}"
             style="
               display:inline-block;
               padding:12px 20px;
               background:#111;
               color:#fff;
               border-radius:8px;
               text-decoration:none;
             ">
             تغيير كلمة المرور
          </a>

          <p style="margin-top:15px">
            الرابط صالح لمدة 60 دقيقة
          </p>
        </div>
      `
    });

    console.log("📧 Email sent:", to);

  } catch (err) {

    console.error("❌ Brevo error:",
      err.response?.body || err.message
    );

    throw err;
  }
}

module.exports = sendEmail;