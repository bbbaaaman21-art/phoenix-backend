function openModal({ title="تأكيد", message="", onConfirm=null }) {

  const modal = document.getElementById("appModal");
  const titleEl = document.getElementById("modalTitle");
  const msgEl = document.getElementById("modalMessage");
  const confirmBtn = document.getElementById("modalConfirm");
  const cancelBtn = document.getElementById("modalCancel");

  titleEl.textContent = title;
  msgEl.textContent = message;

  modal.classList.remove("hidden");

  // 🔥 reset events
  confirmBtn.onclick = null;
  cancelBtn.onclick = null;

  // cancel
  cancelBtn.onclick = () => modal.classList.add("hidden");

  // confirm
  confirmBtn.onclick = () => {
    modal.classList.add("hidden");
    if (typeof onConfirm === "function") onConfirm();
  };
}