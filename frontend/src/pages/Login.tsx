import { useState } from "react";
import { login } from "../api";
import { Link } from "react-router-dom";

export default function Login() {
  const [show, setShow] = useState(false);

  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleLogin = async () => {
    try {
      console.log("CLICK LOGIN", form);

      const res = await login(form);

      console.log("RESPONSE:", res);

      if (res?.access_token) {
        localStorage.setItem("token", res.access_token);
        alert("Đăng nhập thành công");

        window.location.href =
          "https://dvthao204-it.github.io/tinhluong-code.github.io/";
      } else {
        alert("Sai tài khoản hoặc mật khẩu");
      }
    } catch (err) {
      console.error(err);
      alert("Lỗi kết nối backend!");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-title">Đăng nhập</div>

      <div className="form-group">
        <label>Số điện thoại *</label>
        <div className="input-box">
          <input
  placeholder="0900000000"
  value={form.username}
  onKeyPress={(e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  }}
  onChange={(e) => {
    const value = e.target.value.replace(/\D/g, ""); // lọc lại
    setForm({ ...form, username: value });
  }}
/>
        </div>
      </div>

      <div className="form-group">
        <label>Mật khẩu *</label>
        <div className="input-box">
          <input
            type={show ? "text" : "password"}
            placeholder="********"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <span onClick={() => setShow(!show)}>👁️</span>
        </div>
      </div>

      <button className="btn-primary" onClick={handleLogin}>
        Đăng nhập
      </button>

      <div className="link">Quên mật khẩu</div>

      <div className="link">
        <Link to="/register">Đăng ký</Link>
      </div>
    </div>
  );
}