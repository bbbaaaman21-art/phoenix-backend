

/* ================== REGISTER ================== */
async function register() {
  const firstName = document.getElementById("regFirstName").value;
  const lastName = document.getElementById("regLastName").value;
  const email = document.getElementById("regEmail").value;
  const password = document.getElementById("regPassword").value;
  const msg = document.getElementById("msg");

  if (!email || !password) {
    msg.innerText = "من فضلك أكمل البيانات";
    return;
  }

  try {
    const res = await fetch(`${API}/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        firstName,
        lastName,
        email,
        password
      })
    });

    const data = await res.json();

    if (!data.success) {
      msg.innerText = data.message;
      return;
    }

    msg.innerText = "تم إنشاء الحساب ✔️ سجل دخول الآن";

  } catch (err) {
    msg.innerText = "حصل خطأ – حاول مرة أخرى";
  }
}


/* ================== LOGIN ================== */
async function login() {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;
  const msg = document.getElementById("msg");

  if (!email || !password) {
    msg.innerText = "من فضلك أدخل البريد وكلمة المرور";
    return;
  }

  try {
    const res = await fetch(`${API}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    if (!data.success) {
      msg.innerText = data.message;
      return;
    }

    // 🔥 حفظ البيانات
    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    const redirect =
      localStorage.getItem("redirectAfterLogin") || "account.html";

    localStorage.removeItem("redirectAfterLogin");

    window.location.href = redirect;

  } catch (err) {
    msg.innerText = "حصل خطأ – حاول مرة أخرى";
  }
}

/* ================== LOGOUT ================== */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location.href = "auth.html";
}

/* ================== AUTH GUARD ================== */
function requireAuth() {
  const token = localStorage.getItem("token");

  if (!token) {
    localStorage.setItem(
      "redirectAfterLogin",
      window.location.href
    );

    window.location.href = "auth.html";
    return false;
  }

  return true;
}

/* ================== TOGGLE PASSWORD ================== */
function togglePassword(inputId, el) {
  const input = document.getElementById(inputId);

  if (input.type === "password") {
    input.type = "text";
    el.classList.remove("fa-eye-slash");
    el.classList.add("fa-eye");
  } else {
    input.type = "password";
    el.classList.remove("fa-eye");
    el.classList.add("fa-eye-slash");
  }
}
// 🔥 TOGGLE LOGIN / REGISTER
window.toggleAuth = function(type) {

  const loginBox = document.getElementById("loginBox");
  const registerBox = document.getElementById("registerBox");
  const loginArrow = document.getElementById("loginArrow");
  const registerArrow = document.getElementById("registerArrow");

  if (type === "login") {
    loginBox.classList.toggle("open");
    registerBox.classList.remove("open");
    loginArrow.classList.toggle("rotate");
    registerArrow.classList.remove("rotate");
  } else {
    registerBox.classList.toggle("open");
    loginBox.classList.remove("open");
    registerArrow.classList.toggle("rotate");
    loginArrow.classList.remove("rotate");
  }
};

// 🔥 FORGOT PASSWORD
window.openForgot = function() {
  window.location.href = "forgot.html";
};