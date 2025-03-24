"use client";
import { grey500, grey600 } from "@/theme/colors";
import {
  Button,
  Highlight,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { IconArrowRight, IconSearch } from "@tabler/icons-react";
import Link from "next/link";
import { LoginModal } from "../login";

export const MainSearch = () => {
  const {
    onClose: loginOnClose,
    onOpen: loginOnOpen,
    isOpen: loginIsOpen,
  } = useDisclosure();
  return (
    <VStack w="full" align={"center"} py={20} pos="relative" h={393}>
      <Stack backgroundImage={"/decoration.svg"} h={201} w={201} mt={-12} />
      <VStack gap={6} pos={"absolute"}>
        <Text fontSize={48} fontWeight={700}>
          <Highlight query="Digital Garage" styles={{ color: "#F75B00" }}>
            Grow your business with Digital Garage
          </Highlight>
        </Text>
        <Text color={grey600} mt={-2}>
          Дижитал Гараж B2B – авто засвар, сэлбэгийн бизнесүүдэд зориулсан
          захиалга, нийлүүлэлт, менежментийн нэгдсэн платформ.
        </Text>
        <InputGroup maxW={494}>
          <InputLeftElement>
            <IconSearch color={grey500} size={20} />
          </InputLeftElement>
          <Input
            pl={8}
            alignSelf="center"
            placeholder="OE дугаар, Бүтээгдэхүүний нэрээр, Үйлдвэрлэгчээр хайх"
          />
        </InputGroup>
        <HStack gap={4}>
          <Link href="/sign-up">
            <Button rightIcon={<IconArrowRight />}>Бүртгүүлэх</Button>
          </Link>
          <Button variant="outline" onClick={loginOnOpen}>
            Нэвтрэх
          </Button>
        </HStack>
      </VStack>
      <LoginModal onClose={loginOnClose} isOpen={loginIsOpen} />
    </VStack>
  );
};
