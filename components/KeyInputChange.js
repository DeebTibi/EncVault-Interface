"use client";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from "@chakra-ui/react";
import { IconButton } from "@chakra-ui/react";
import { EditIcon } from "@chakra-ui/icons";
import { serverChangeUserKey } from "@/scripts/server_actions";

export default function KeyInput({
  isOpen,
  onClose,
  oldKey,
  setOldKey,
  userId,
}) {
  const [key, setKey] = useState("");

  async function handleChangeKey() {
    const res = await serverChangeUserKey(userId, oldKey, key);
    if (!res.success) {
      window.alert("Failed to change key");
    }
    setOldKey(key);
    onClose();
  }

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        closeOnOverlayClick={false}
        closeOnEsc={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your encryption key</ModalHeader>
          <ModalBody>
            <h1 style={{ paddingLeft: 3 }}>
              To change your key, enter your new 16 byte private key in
              hexadecimal format.
            </h1>
            <div style={{ height: 10 }}></div>
            <Input
              value={key}
              type="password"
              onChange={(e) => setKey(e.target.value)}
              placeholder="Type your new key..."
            />
          </ModalBody>

          <ModalFooter>
            <IconButton icon={<EditIcon />} onClick={handleChangeKey} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
