const brevo = require("@getbrevo/brevo");

const apiInstance = new brevo.TransactionalEmailsApi();

apiInstance.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  process.env.BREVO_API_KEY
);

async function sendEmail(to, resetLink) {

  await apiInstance.sendTransacEmail({
    sender: {
      name: "Rovix Home",
      email: process.env.EMAIL_FROM
    },

    to: [{ email: to }],

    subject: "Reset Password",

    htmlContent: `<a href="${resetLink}">Reset</a>`
  });

  console.log("✅ Email sent");
}

module.exports = sendEmail;