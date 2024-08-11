import React from "react";
import styles from "./page.module.css";
import { Inter } from "next/font/google";
import NextLink from "next/link";
import { Button, Link } from "@chakra-ui/react";
// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  return (
    <div className={styles.root_container}>
      <div className={styles.upper_container}>
        <div className={styles.left_container}>
          <div className={styles.item_container}>
            <div className={styles.text_container}>
              <h1
                className={`${inter.className}`}
                style={{ fontWeight: "600", fontSize: 50 }}
              >
                Welcome to
              </h1>
              <h1
                className={`${inter.className} ${styles.hero_text}`}
                style={{ fontWeight: "800", fontSize: 50 }}
              >
                EncVault.
              </h1>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: 10,
                width: "100%",
                height: "fit-content",
              }}
            >
              <NextLink href="/dashboard">
                <Button
                  colorScheme={"blue"}
                  variant={"outline"}
                  className={`${inter.className}`}
                  fontWeight={"800"}
                  size={"lg"}
                >
                  Get Started
                </Button>
              </NextLink>
              <NextLink href="/signup">
                <Button
                  colorScheme={"blue"}
                  variant={"outline"}
                  className={`${inter.className}`}
                  fontWeight={"800"}
                  size={"lg"}
                >
                  Register
                </Button>
              </NextLink>
            </div>
          </div>
        </div>
        <div className={styles.right_container}>
          <div className={styles.image_container}>
            <img src="/undraw_secure_files_re_6vdh.png" />
          </div>
        </div>
      </div>
    </div>
  );
}
