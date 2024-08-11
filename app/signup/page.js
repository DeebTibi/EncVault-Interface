"use client";
import React, { useState } from "react";
import { useFormState } from "react-dom";
import styles from "./page.module.css";
import { Button, Input } from "@chakra-ui/react";
import { submitLogin, submitSignup } from "@/scripts/server_actions";

export default function SignupPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userKey, setUserKey] = useState("");

  async function handleSignup() {
    const token = await submitSignup(userName, password, userKey);
    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
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
