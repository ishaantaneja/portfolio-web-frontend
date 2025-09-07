// src/pages/Register.jsx
import React, { useState } from "react";

import axios from "axios";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(null);
  const [error, setError] = useState(null);

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:5000/api/auth/register", { email, password });
      setSuccess(true);
      setError(null);
      // optional: auto-login after registration
      // const { data } = await login({ email, password });
      // localStorage.setItem("token", data.token);
      // window.location.href = "/skills";
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "Registration failed");
      setSuccess(false);
    }
  };

  return (
    <section>
      <h2>Admin Register</h2>
      <form onSubmit={onSubmit}>
        <input type="email" placeholder="Email" value={email}
          onChange={(e) => setEmail(e.target.value)} required />
        <input type="password" placeholder="Password" value={password}
          onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">Register</button>
      </form>
      {success && <p>Registered successfully</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </section>
  );
}
