"use client";
import React, { useEffect, useState, useCallback } from "react";
import KeyInput from "@/components/KeyInput";
import KeyInputChange from "@/components/KeyInputChange";
import { IconButton, useDisclosure } from "@chakra-ui/react";
import { revokeURL, verifyToken } from "@/scripts/server_actions";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { useDropzone } from "react-dropzone";
import { AttachmentIcon, EditIcon } from "@chakra-ui/icons";
import {
  serverUploadFile,
  serverGetFiles,
  serverDownloadFile,
} from "@/scripts/server_actions";
import { useToast } from "@chakra-ui/react";

export default function Dashboard() {
  const [key, setKey] = useState("");
  const [userName, setUserName] = useState("");
  const [userToken, setUserToken] = useState("");
  const [files, setFiles] = useState([]);
  const router = useRouter();
  const toast = useToast();
  const { onClose, onOpen, isOpen } = useDisclosure();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      const file = acceptedFiles[acceptedFiles.length - 1];
      const formData = new FormData();
      formData.append("file", file, file.name);
      const res = await serverUploadFile(userName, userToken, key, formData);
      await fetchFiles();
    },
    [userName, userToken, key]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    if (token && userName) {
      setUserName(userName);
      setUserToken(token);
      verifyToken(userName, token).then((res) => {
        if (!res) {
          localStorage.removeItem("token");
          localStorage.removeItem("userName");
          router.replace("/login");
        }
      });
    } else {
      router.replace("/login");
    }
  }, []);

  async function fetchFiles() {
    const res = await serverGetFiles(userName, userToken);
    if (!res.success) {
      if (res.error) {
        showToast(
          "Server Error",
          "Failed to fetch your files because of a server error",
          false
        );
        return;
      }
      showToast(
        "Failed to fetch files",
        "This is likely because the wrong configurations were sent. Please log back in again",
        false
      );
      console.log("Something wrong happened");
      return;
    }
    if (!res.files) {
      console.log("No files found");
      return;
    }
    const fileNames = res.files.split("\n");
    if (fileNames.length > 0) {
      fileNames.pop();
      console.log(fileNames);
      setFiles((prev) => fileNames);
    }
  }

  function base64ToArrayBuffer(base64) {
    var binaryString = atob(base64);
    var bytes = new Uint8Array(binaryString.length);
    for (var i = 0; i < binaryString.length; i++) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes.buffer;
  }

  async function downloadFile(filename) {
    const res = await serverDownloadFile(filename, userName, userToken, key);
    if (!res.success) {
      showToast(
        "Failed to download file",
        "This is likely because you inputted the wrong key",
        false
      );
      return;
    }
    const blob = new Blob([base64ToArrayBuffer(res.data)], {
      type: "application/octet-stream",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    showToast("File downloaded", "Your file has been downloaded", true);
  }

  function handleKeyChangeClick() {
    onOpen();
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
    <div
      style={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        padding: 20,
      }}
    >
      <IconButton
        icon={<EditIcon />}
        boxSize={16}
        style={{ position: "absolute", top: 10, right: 10 }}
        onClick={handleKeyChangeClick}
      />
      <KeyInputChange
        isOpen={isOpen}
        onClose={onClose}
        setOldKey={setKey}
        oldKey={key}
        userId={userName}
      ></KeyInputChange>

      <KeyInput setKey={setKey} closeCallback={fetchFiles}></KeyInput>
      <h1 className={styles.dashboard_text}>Dashboard</h1>
      <div className={styles.seperator}></div>
      <div className={styles.content}>
        <div className={styles.file_upload} {...getRootProps()}>
          <input {...getInputProps()} />
          <AttachmentIcon boxSize={20} color={"#0370ff"} />
          <h1 style={{ color: "black", fontSize: 20, fontWeight: 800 }}>
            Drag and drop your file here
          </h1>
        </div>
        <div className={styles.file_list}>
          {files.map((file, i) => (
            <div
              key={i}
              style={{
                width: "fit-content",
                height: 40,
                backgroundColor: "#0370ff",
                borderRadius: 10,
                padding: 10,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
              onClick={async () => {
                await downloadFile(file);
              }}
            >
              <h1 style={{ fontSize: 20, color: "white", fontWeight: 700 }}>
                {file}
              </h1>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

//e042d95f67f7790e6242b66c5bf6360a
//8bc5fcbaf794ea8d9c3fa709df15b9af
