window.API = "https://rovixhome.com/api";

const originalFetch = window.fetch;

window.fetch = async (url, options = {}) => {

  // ✅ سيب Firebase requests زي ما هي
  if (
    typeof url === "string" &&
    (
      url.includes("firebase") ||
      url.includes("googleapis.com") ||
      url.includes("gstatic.com")
    )
  ) {
    return originalFetch(url, options);
  }

  const token = localStorage.getItem("token");

  const isFormData = options.body instanceof FormData;

  options.headers = {
    ...(options.headers || {}),

    ...(!isFormData && options.body
      ? { "Content-Type": "application/json" }
      : {}),

    ...(token
      ? { Authorization: `Bearer ${token}` }
      : {})
  };

  const res = await originalFetch(url, options);

  if (res.status === 401) {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setTimeout(() => {
      window.location.href = "auth.html";
    }, 100);

    return res;
  }

  return res;
};