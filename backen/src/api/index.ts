import axios from "axios";

const API = "http://localhost:3000";

export const login = async (data) => {
  const res = await axios.post(`${API}/auth/login`, data);
  return res.data;
};
