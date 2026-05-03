// ===== INIT =====
document.addEventListener("DOMContentLoaded", async function () {

  requireAuth();

  const params = new URLSearchParams(window.location.search);
  const orderId = params.get("id");
  const token = localStorage.getItem("token");

  const box = document.getElementById("orderBox");

  if (!orderId) {
    box.innerText = "رقم الطلب غير موجود";
    return;
  }

  try {
    const res = await fetch(`${API}/orders/${orderId}`, {
      headers: {
        Authorization: "Bearer " + token
      }
    });

    const order = await res.json();

    if (!res.ok) {
      box.innerText = order.message || "خطأ في تحميل الطلب";
      return;
    }

    box.innerHTML = `
      <p><strong>رقم الطلب:</strong> ${order._id}</p>
      <p><strong>المبلغ:</strong> ${order.total} جنيه</p>
      <p><strong>الحالة:</strong> ${order.status}</p>
      <p><strong>تاريخ الطلب:</strong> ${new Date(order.createdAt).toLocaleString()}</p>
    `;

  } catch (err) {
    console.error(err);
    box.innerText = "حدث خطأ أثناء تحميل الطلب";
  }

});