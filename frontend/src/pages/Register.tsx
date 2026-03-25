import { useState } from "react";
import { register } from "../api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: "",
    password: "",
    confirm: "",
  });

  const handleRegister = async () => {
    if (form.password !== form.confirm) {
      alert("Mật khẩu không khớp");
      return;
    }

    const res = await register({
      username: form.username,
      password: form.password,
    });

    if (res) {
      alert("Đăng ký thành công");
      navigate("/");
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-title">Đăng ký</div>

      <div className="form-group">
        <label>Số điện thoại *</label>
        <div className="input-box">
          <input
            placeholder="0900000000"
            value={form.username}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // chỉ cho số
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
            placeholder="Tối thiểu 8 ký tự"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />
          <span onClick={() => setShow(!show)}>👁️</span>
        </div>
      </div>

      <div className="form-group">
        <label>Nhập lại mật khẩu *</label>
        <div className="input-box">
          <input
            type="password"
            placeholder="Nhập lại mật khẩu"
            value={form.confirm}
            onChange={(e) =>
              setForm({ ...form, confirm: e.target.value })
            }
          />
        </div>
      </div>

      <button className="btn-primary" onClick={handleRegister}>
        Đăng ký
      </button>

      <div className="link">
        <Link to="/">Đăng nhập</Link>
      </div>
    </div>
  );
}