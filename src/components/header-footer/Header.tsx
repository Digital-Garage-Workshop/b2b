"use client";
import { ExelIcon, Logo } from "@/icons";
import { grey50 } from "@/theme/colors";
import { Button, HStack, Input, Stack, useDisclosure } from "@chakra-ui/react";
import {
  IconArrowRight,
  IconMenu2,
  IconShoppingCart,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import path from "path";
import { LoginModal } from "../login";

const data = [
  { name: "Амортизатор / Пүрш" },
  { name: "Обуд / Дугуй" },
  { name: "Цахилгаан" },
  { name: "Хямдарсан бараа" },
];
export const Header = () => {
  const {
    onClose: loginOnClose,
    onOpen: loginOnOpen,
    isOpen: loginIsOpen,
  } = useDisclosure();
  const pathname = usePathname();
  return (
    <Stack w="100%" gap={0} align="center">
      <HStack gap={6} py={4} justify="space-between" w="82%">
        <Link href="/">
          <Logo />
        </Link>
        <HStack w="70%">
          <Input
            w="76%"
            placeholder="OE дугаар, Бүтээгдэхүүний нэрээр, Үйлдвэрлэгчээр хайх"
          />
          <Button variant="outline" leftIcon={<ExelIcon />} px={4}>
            Excel файлаар хайх
          </Button>
        </HStack>
        <HStack gap={2}>
          <Button variant="outline" onClick={loginOnOpen}>
            Нэвтрэх
          </Button>
          <Link href="/sign-up">
            <Button
              rightIcon={<IconArrowRight />}
              size="md"
              colorScheme="primary"
            >
              Бүртгүүлэх
            </Button>
          </Link>
          <Link href="/cart">
            <Button p={2}>
              <IconShoppingCart />
            </Button>
          </Link>
        </HStack>
      </HStack>
      <HStack
        bg={grey50}
        py={2}
        w="100%"
        justify="center"
        display={pathname?.includes("sign-up") ? "none" : "flex"}
      >
        <HStack gap={{ base: 2, md: 6 }} w="82%">
          {/* <Box>
          <CategoryDropDown />
        </Box> */}
          <Button
            variant="ghost"
            size={"sm"}
            leftIcon={<IconMenu2 size={20} />}
          >
            Ангилал
          </Button>
          <Stack w="1px" height="24px" border={"0.5px solid #D0D5DD"} />
          <HStack gap={2} w={"full"}>
            {
              //   isLoading ? (
              //     <HStack gap={6}>
              //       {[1, 2, 3, 4, 5, 6].map((element) => (
              //         <Skeleton
              //           key={element}
              //           width={"70px"}
              //           height={"30px"}
              //           startColor="#F2F4F7"
              //           endColor="#F2F4F7"
              //         />
              //       ))}
              //     </HStack>
              //   ) : (
              data?.map((item: any, index: number) => (
                <Button
                  variant="ghost"
                  cursor={"pointer"}
                  size={"sm"}
                  key={index}
                  onClick={() => {
                    //   subFetch({ categoryid: item.categoryid });
                    //   dispatch(setMainCategoryId(item.categoryid));
                    //   setIsExpanded(true);
                  }}
                  w="fit-content"
                >
                  {item.name}
                </Button>
              ))
              //   )
            }
            <Button variant="ghost" size={"sm"}>
              Хямдарсан бараа
            </Button>
          </HStack>
        </HStack>
      </HStack>
      <LoginModal isOpen={loginIsOpen} onClose={loginOnClose} />
    </Stack>
  );
};
