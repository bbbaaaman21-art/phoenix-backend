// ===== FORGOT PASSWORD =====
window.sendReset = async function () {

  const email = document.getElementById("forgotEmail").value;
  const msg = document.getElementById("msg");

  if (!email) {
    msg.innerText = "من فضلك أدخل البريد الإلكتروني";
    return;
  }

  try {
    const res = await fetch(`${API}/auth/forgot-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    const data = await res.json();
    msg.innerText = data.message;

  } catch (err) {
    console.error(err);
    msg.innerText = "حصل خطأ، حاول مرة أخرى";
  }
};


// ===== RESET PASSWORD =====
(function () {

  const msgEl = document.getElementById("msg");
  if (!msgEl) return;

  const params = new URLSearchParams(window.location.search);
  const token = params.get("token");

  if (!token) {
    return;
  }

  window.resetPassword = async function () {

    const password = document.getElementById("newPassword").value;

    if (!password) {
      msgEl.innerText = "من فضلك أدخل كلمة المرور";
      return;
    }

    try {
      const res = await fetch(`${API}/auth/reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ token, password })
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      const data = await res.json();
      msgEl.innerText = data.message;

      setTimeout(() => {
window.location.replace("auth.html");
      }, 2000);

    } catch (err) {
      console.error(err);
      msgEl.innerText = "حصل خطأ، حاول مرة أخرى";
    }
  };

})();