const brevo = require("@getbrevo/brevo");

async function sendEmail(to, resetLink) {

  const apiInstance = new brevo.TransactionalEmailsApi();

  apiInstance.setApiKey(
    brevo.TransactionalEmailsApiApiKeys.apiKey,
    process.env.BREVO_API_KEY
  );

  try {

    await apiInstance.sendTransacEmail({

      sender: {
        email: process.env.EMAIL_FROM,
        name: "Rovix Home"
      },

      to: [{ email: to }],

      subject: "إعادة تعيين كلمة المرور",

      htmlContent: `
        <div style="font-family:Arial; direction:rtl">
          <h2>إعادة تعيين كلمة المرور</h2>

          <p>اضغط على الزر لتغيير كلمة المرور:</p>

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
        </div>
      `
    });

    console.log("✅ Email sent");

  } catch (err) {
    console.error("❌ Brevo error:", err.response?.body || err.message);
    throw err;
  }
}

module.exports = sendEmail;