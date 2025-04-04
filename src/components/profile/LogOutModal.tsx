"use client";
import { error600, textDefault } from "@/theme/colors";
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
import { IconLogout } from "@tabler/icons-react";
import { signOut } from "next-auth/react";

type LogoutModal = {
  isOpen: boolean;
  onClose: () => void;
};

export const LogoutModal = (props: LogoutModal) => {
  const { isOpen, onClose } = props;

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={389} p={6}>
        <VStack gap={6} align="flex-start" w="full">
          <Stack p="10px" bg={"#FEF3F2"} borderRadius="full">
            <IconLogout color={error600} />
          </Stack>
          <Text variant="h8" color={textDefault}>
            Гарахдаа итгэлтэй байна уу
          </Text>
          <Text variant="caption" color={textDefault} mt={-4}>
            Та захиалгаа цуцлахдаа итгэлтэй байна уу?
          </Text>
          <HStack gap={6} w="full">
            <Button flex={1} variant="outline" onClick={onClose}>
              Буцах
            </Button>
            <Button
              flex={1}
              onClick={() => signOut({ redirect: true, callbackUrl: "/" })}
            >
              Гарах
            </Button>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
