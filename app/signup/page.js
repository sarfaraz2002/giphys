"use client";
import React, { useState } from "react";
import { initFirebase } from "@/app/firebase";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
const styles = {
  container: {
    textAlign: "center",
    marginTop: "50px", // Adjust as needed
  },
  input: {
    padding: "0.5em",
    margin: "0.5em",
    border: "1px solid #ccc",
    borderRadius: "4px",
    fontSize: "1em",
  },
  button: {
    padding: "0.5em 1em",
    border: "none",
    borderRadius: "4px",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1em",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

const Signup = () => {
  const app = initFirebase();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const router = useRouter();

  const Register = async () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
        router.push("login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div style={styles.container}>
      <h1>Sign UP</h1>
      <input
        type="text"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
        style={styles.input}
      />
      <br />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
        style={styles.input}
      />
      <br />
      <button
        style={{
          ...styles.button,
          ...(styles.buttonHover && styles.buttonHover),
        }}
        onClick={Register}
      >
        Signup
      </button>
    </div>
  );
};

export default Signup;
