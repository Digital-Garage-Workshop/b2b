"use client";
import { textDefault } from "@/theme/colors";
import {
  Button,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

type LogoutModal = {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  desc: string;
  icon: any;
  iconBg: string;
  buttonStr: string;
  buttonAction: () => void;
  buttonLoader?: boolean;
};

export const ConsultModal = (props: LogoutModal) => {
  const {
    isOpen,
    onClose,
    title,
    desc,
    icon,
    iconBg,
    buttonStr,
    buttonAction,
    buttonLoader,
  } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={389} p={6}>
        <VStack gap={6} align="center" w="full">
          <Stack p="10px" bg={iconBg} borderRadius="full">
            {icon}
          </Stack>
          <Text variant="h8" color={textDefault}>
            {title}
          </Text>
          <Text
            variant="caption"
            color={textDefault}
            mt={-4}
            textAlign="center"
          >
            {desc}
          </Text>
          <HStack gap={6} w="full">
            <Button flex={1} variant="outline" onClick={onClose}>
              Буцах
            </Button>
            <Button
              flex={1}
              onClick={() => buttonAction()}
              isLoading={buttonLoader}
            >
              {buttonStr}
            </Button>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
