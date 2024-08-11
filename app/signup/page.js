"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import styles from "./page.module.css";
import { Button, Input, useToast } from "@chakra-ui/react";
import { submitLogin, submitSignup } from "@/scripts/server_actions";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userKey, setUserKey] = useState("");
  const router = useRouter();
  const toast = useToast();

  async function showToast(title, message, isSuccess) {
    toast({
      title,
      description: message,
      status: isSuccess ? "success" : "error",
      duration: 5000,
      isClosable: true,
    });
  }

  async function handleSignup() {
    const token = await submitSignup(userName, password, userKey);
    if (!token) {
      showToast("Signup Failed", "User already exists", false);
      return;
    }
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    router.replace("/dashboard");
  }

  return (
    <div className={styles.parent_container}>
      <div className={styles.login_container}>
        <h1 style={{ fontSize: 30, color: "white", fontWeight: 800 }}>
          Sign up
        </h1>
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
        <Input
          placeholder="Encryption Key"
          size={"lg"}
          type="password"
          textColor="rgba(255,255,255,0.8)"
          onChange={(e) => setUserKey(e.target.value)}
          value={userKey}
        />
        <div style={{}}>
          <Button onClick={handleSignup}>Sign up</Button>
        </div>
      </div>
    </div>
  );
}
