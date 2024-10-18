"use client";
import { useState } from "react";

export default function login() {
  const { username, setUsername } = useState("");
  const { password, setPassword } = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // TODO: Request for JWT

    const token = "";
    localStorage.setItem("jwt", token);
    // router.push("/");
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{ display: "flex", flexDirection: "column", width: "300px" }}
      >
        <h1>Login</h1>
        <input
          type="email"
          placeholder="Email"
          value={username}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px" }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ marginBottom: "10px", padding: "10px" }}
        />
        <button type="submit" style={{ padding: "10px" }}>
          Login
        </button>
      </form>
    </div>
  );
}
