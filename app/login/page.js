"use client";
import React, { useState } from "react";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import { initFirebase } from "@/app/firebase";
import { useRouter } from "next/navigation";

const containerStyle = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "50vh",
};

const inputStyle = {
  padding: "0.5em",
  margin: "0.5em",
  border: "1px solid #ccc",
  borderRadius: "4px",
  fontSize: "1em",
};

const buttonStyle = {
  marginTop: "1em",
  padding: "0.5em 1em",
  border: "none",
  borderRadius: "4px",
  backgroundColor: "#007bff",
  color: "#fff",
  cursor: "pointer",
  fontSize: "1em",
};

const Login = () => {
  initFirebase();
  const router = useRouter();
  const auth = getAuth();
  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/gif");
    } catch (error) {
      console.error("Error signing in:", error.message);
    }
  };

  if (loading) {
    return <div>Loading......</div>;
  }

  return (
    <div style={containerStyle}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={inputStyle}
      />
      <br />
      <button onClick={handleLogin} style={buttonStyle}>
        Login
      </button>
    </div>
  );
};

export default Login;
