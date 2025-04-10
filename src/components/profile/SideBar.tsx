"use client";
import { grey50, primary, textDefault } from "@/theme/colors";
import { Stack, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { LogoutModal } from "./LogOutModal";

export const SideBar = () => {
  const searchParams = useSearchParams();
  const sidebar = searchParams?.get("tag");
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const profiles = [
    {
      name: "Хэрэглэгчийн тохиргоо",
    },
    {
      name: "Хүргэлтийн хаяг",
    },
    {
      name: "Захиалгууд",
    },
    {
      name: "Back Order",
    },
  ];

  return (
    <VStack w="full" p={6} borderRadius={16} bg={grey50}>
      {profiles.map((item) => (
        <Stack
          h="38px"
          key={item.name}
          p="8px 16px"
          align="flex-start"
          bg={item.name === sidebar ? primary : "transparent"}
          w="full"
          onClick={() => {
            const newUrl = `${window.location.pathname}?tag=${item.name}`;
            router.replace(newUrl, { scroll: false });
          }}
          cursor="pointer"
          borderRadius={8}
        >
          <Text
            variant="buttonsm"
            color={item.name === sidebar ? "white" : textDefault}
          >
            {item.name}
          </Text>
        </Stack>
      ))}

      <Stack
        p="8px 16px"
        align="flex-start"
        w="full"
        onClick={onOpen}
        cursor="pointer"
        borderRadius={8}
        mt="38px"
      >
        <Text variant="buttonsm" color={textDefault}>
          Системээс гарах
        </Text>
      </Stack>
      <LogoutModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
