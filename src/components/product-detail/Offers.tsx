"use client";
import { grey200, grey700, success, textDefault } from "@/theme/colors";
import {
  Button,
  HStack,
  Image,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { IconChevronRight, IconShoppingCart } from "@tabler/icons-react";
import { Branches } from "./Branches";
import { useSession } from "next-auth/react";
import { LoginModal } from "../login";
const banks = [
  {
    svg: "/banks/khanbank.svg",
    name: "Khan Bank",
    desc: "Хэрэглээний лизинг 2.0%",
  },
  {
    svg: "/banks/golomt.svg",
    name: "Golomt Bank",
    desc: "Хэрэглээний лизинг 2.0%",
  },
  {
    svg: "/banks/trade.svg",
    name: "Trade & Development",
    desc: "Хэрэглээний лизинг 2.0%",
  },
  {
    svg: "/banks/storepay.svg",
    name: "StorePay",
    desc: "Хэрэглээний лизинг 2.0%",
  },
  {
    svg: "/banks/pocket.svg",
    name: "Pocket",
    desc: "Хэрэглээний лизинг 2.0%",
  },
];
export const Offers = (props: { inventories: any; product: any }) => {
  const { inventories, product } = props;
  const { data: session } = useSession();
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <VStack gap={6} w={"28%"}>
      <VStack
        w="full"
        borderRadius={26}
        border={`1px solid ${grey200}`}
        boxShadow="0px 2px 8px -4px rgba(16, 24, 40, 0.05)"
        p={4}
        gap={4}
        align="flex-start"
        pos="relative"
      >
        <Text variant="h8">Саналууд</Text>
        <VStack gap="10px" w="full" filter={session ? "none" : "blur(15px)"}>
          {inventories?.map((inventory: any, index: number) => (
            <VStack key={index} gap="10px" w="full">
              <Branches branch={inventory} product={product} />
              {index < inventories?.length - 1 && (
                <HStack gap={1} w="full">
                  {Array(24)
                    .fill("")
                    .map((_, index) => (
                      <Stack height="1px" flex={1} bg={grey200} key={index} />
                    ))}
                </HStack>
              )}
            </VStack>
          ))}
        </VStack>
        <Button w="full" display={session ? "none" : "flex"} onClick={onOpen}>
          Нэвтрэх
        </Button>
        <Text
          pos="absolute"
          top="35%"
          textAlign="center"
          variant="subtitle2"
          maxW={228}
          left={"15%"}
        >
          Та нэвтрэх эсвэл бүртгүүлсний дараа үнийн санал харах боломжтой
        </Text>
      </VStack>
      <VStack
        w="full"
        borderRadius={26}
        border={`1px solid ${grey200}`}
        boxShadow="0px 2px 8px -4px rgba(16, 24, 40, 0.05)"
        p={4}
        gap={4}
        align="flex-start"
      >
        <Text variant="h8">Зээлээр авах төрлүүд</Text>
        <VStack gap={2} w="full">
          {banks.map((item, index) => (
            <HStack
              key={index}
              w="full"
              p="8px 10px"
              gap={2}
              justify="space-between"
              border={`1px solid ${grey200}`}
              borderRadius={16}
              cursor="pointer"
            >
              <HStack>
                <Image src={item.svg} width={8} height={8} />
                <VStack gap={0} align="flex-start">
                  <Text variant="subtitle3" color={textDefault}>
                    {item.name}
                  </Text>
                  <Text variant="caption" color={textDefault}>
                    {item.desc}
                  </Text>
                </VStack>
              </HStack>
              <IconChevronRight />
            </HStack>
          ))}
        </VStack>
      </VStack>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
};
