const API = "http://localhost:3000";

export const register = async (data: any) => {
  const res = await fetch(`${API}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const login = async (data: any) => {
  const res = await fetch("http://localhost:3000/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await res.json();
  console.log("API trả về:", result); // 👈 thêm dòng này
  return result;
};

export const getProfile = async () => {
  const token = localStorage.getItem("token");

  const res = await fetch(`${API}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.json();
};