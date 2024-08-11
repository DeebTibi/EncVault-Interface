"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import styles from "./page.module.css";
import { Button, Input } from "@chakra-ui/react";
import { submitLogin, verifyToken } from "@/scripts/server_actions";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token) {
      verifyToken(userName, token).then((res) => {
        if (res) {
          router.replace("/dashboard");
        }
      });
    }
  }, []);

  async function handleLogin() {
    const token = await submitLogin(userName, password);
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    router.replace("/dashboard");
  }

  return (
    <div className={styles.parent_container}>
      <div className={styles.login_container}>
        <h1 style={{ fontSize: 30, color: "white", fontWeight: 800 }}>Login</h1>
        <Input
          placeholder="Username"
          size={"lg"}
          textColor="rgba(255,255,255,0.8)"
          onChange={(e) => setUserName(e.target.value)}
          value={userName}
        />
        <Input
          placeholder="Password"
          size={"lg"}
          type="password"
          textColor="rgba(255,255,255,0.8)"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div style={{}}>
          <Button onClick={handleLogin}>Login</Button>
        </div>
      </div>
    </div>
  );
}
