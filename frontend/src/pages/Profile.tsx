import { useEffect, useState } from "react";
import { getProfile } from "../api";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    getProfile().then((res) => {
      if (res.statusCode === 401) {
        navigate("/");
      } else {
        setUser(res);
      }
    });
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="container">
      <h2>Profile</h2>

      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}

      <button onClick={logout}>Logout</button>
    </div>
  );
}