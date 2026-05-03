function showToast(message, type = "add") {

  const container = document.getElementById("toastContainer");
  if (!container) return alert(message);

  // 🔥 امسح القديم (اختياري - يخلي الشكل clean)
  container.innerHTML = "";

  const toast = document.createElement("div");

  let cls = "toast_success";
  if (type === "remove") cls = "toast_remove";

  toast.className = "toast_msg " + cls;
  toast.textContent = message;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.animation = "toastOut 0.3s ease forwards";
    setTimeout(() => toast.remove(), 300);
  }, 2200);
}