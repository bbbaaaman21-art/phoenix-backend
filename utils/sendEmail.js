async function sendEmail(to, resetLink) {

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "api-key": process.env.BREVO_API_KEY
    },
    body: JSON.stringify({
      sender: {
        name: "Rovix Home",
        email: process.env.EMAIL_FROM
      },
      to: [{ email: to }],
      subject: "إعادة تعيين كلمة المرور",
      htmlContent: `
        <div style="font-family:Arial; direction:rtl">
          <h2>إعادة تعيين كلمة المرور</h2>
          <p>اضغط على الزر لتغيير كلمة المرور:</p>
          <a href="${resetLink}"
             style="display:inline-block;padding:12px 20px;background:#111;color:#fff;border-radius:8px;text-decoration:none;">
             تغيير كلمة المرور
          </a>
        </div>
      `
    })
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    console.error("❌ Brevo API error:", data);
    throw new Error(data.message || "Email send failed");
  }

  console.log("✅ Email sent");
}

module.exports = sendEmail;