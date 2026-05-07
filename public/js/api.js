window.API = "https://rovixhome.com/api";
const originalFetch = window.fetch;

window.fetch = async (url, options = {}) => {

  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  options.headers = {
    ...(options.headers || {}),
    // 🔥 ضيف Content-Type بس لو فيه body ومش FormData
    ...(!isFormData && options.body ? { "Content-Type": "application/json" } : {}),
    ...(token ? { Authorization: `Bearer ${token}` } : {})
  };

  const res = await originalFetch(url, options);

  if (res.status === 401) {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "auth.html";
    return;
  }

  return res;
};