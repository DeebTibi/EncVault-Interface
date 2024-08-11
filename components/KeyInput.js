"use client";
import React, { useEffect } from "react";
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
import { useDisclosure } from "@chakra-ui/react";

export default function KeyInput({ key, setKey, closeCallback }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  function handleModalClosed() {
    closeCallback();
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
              for your security, encryption keys are stored in memory per
              session basis
            </h1>
            <div style={{ height: 10 }}></div>
            <Input
              value={key}
              type="password"
              onChange={(e) => setKey(e.target.value)}
              placeholder="Type your key..."
            />
          </ModalBody>

          <ModalFooter>
            <IconButton icon={<EditIcon />} onClick={handleModalClosed} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
