"use client";
import React, { useEffect, useState } from "react";
import { useFormState } from "react-dom";
import styles from "./page.module.css";
import { Button, Input } from "@chakra-ui/react";
import { submitLogin, verifyToken } from "@/scripts/server_actions";
import { useRouter } from "next/navigation";
import { useToast } from "@chakra-ui/react";

export default function LoginPage() {
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const toast = useToast();

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
    if (!token) {
      showToast("Login Failed", "Invalid username or password", false);
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    router.replace("/dashboard");
  }

  async function showToast(title, message, isSuccess) {
    toast({
      title,
      description: message,
      status: isSuccess ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
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
