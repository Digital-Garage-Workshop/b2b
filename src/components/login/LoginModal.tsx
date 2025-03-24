"use client";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { LoginForm } from "./LoginForm";
import { OtpModal } from "./OtpModal";
import { PasswordModal } from "./PasswordModal";

type CarModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LoginModal = (props: CarModalProps) => {
  const { isOpen, onClose } = props;
  const [phoneNumber, setPhone] = useState("");
  const [expire, setExpire] = useState("");
  const [modal, setModal] = useState<"login" | "otp" | "pass" | "forgotPass">(
    "login"
  );
  const [otp, setOtp] = useState<"signup" | "forgotPass">("signup");

  useEffect(() => {
    setModal("login");
  }, [isOpen]);
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => {
        onClose();
        setModal("login");
      }}
      scrollBehavior="outside"
      allowPinchZoom={true}
      autoFocus={false}
      isCentered
    >
      <ModalOverlay />

      <ModalContent
        mx={4}
        p="24px"
        maxW={"500px"}
        overflow={"auto"}
        mb={20}
        mt={10}
        border={8}
      >
        <ModalCloseButton />
        <LoginForm
          onClose={onClose}
          setModal={setModal}
          modal={modal}
          setPhone={setPhone}
          setExpire={setExpire}
          setOtp={setOtp}
        />
        <OtpModal
          onClose={onClose}
          setModal={setModal}
          modal={modal}
          phonenumber={phoneNumber}
          expire={expire}
          otp={otp}
        />
        <PasswordModal
          onClose={onClose}
          setModal={setModal}
          modal={modal}
          phonenumber={phoneNumber}
          otp={otp}
          //   expire={expire}
        />
      </ModalContent>
    </Modal>
  );
};
