const SibApiV3Sdk = require("@getbrevo/brevo");

const client = SibApiV3Sdk.ApiClient.instance;

const apiKey = client.authentications["api-key"];
apiKey.apiKey = process.env.BREVO_API_KEY;

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

async function sendEmail(to, resetLink) {

  try {

    const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

    sendSmtpEmail.sender = {
      email: process.env.EMAIL_FROM,
      name: "Rovix Home"
    };

    sendSmtpEmail.to = [{ email: to }];

    sendSmtpEmail.subject = "إعادة تعيين كلمة المرور";

    sendSmtpEmail.htmlContent = `
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
    `;

    await apiInstance.sendTransacEmail(sendSmtpEmail);

    console.log("✅ Email sent");

  } catch (err) {

    console.error("❌ Brevo error:", err.response?.body || err.message);

    throw err;
  }
}

module.exports = sendEmail;