"use client";
import { ExelIcon, Logo } from "@/icons";
import { grey50 } from "@/theme/colors";
import {
  Box,
  Button,
  HStack,
  Input,
  Stack,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IconArrowRight,
  IconLogout,
  IconMenu2,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import path from "path";
import { LoginModal } from "../login";
import { signOut, useSession } from "next-auth/react";
import { CategoryDropDown } from "./CategoryDropDown";

const data = [
  { name: "Амортизатор / Пүрш" },
  { name: "Обуд / Дугуй" },
  { name: "Цахилгаан" },
  { name: "Хямдарсан бараа" },
];
export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  const {
    onClose: loginOnClose,
    onOpen: loginOnOpen,
    isOpen: loginIsOpen,
  } = useDisclosure();

  return (
    <Stack w="100%" gap={0} align="center">
      <HStack gap={6} py={4} justify="space-between" w="82%">
        <Link href="/">
          <Logo />
        </Link>
        <HStack w="70%">
          <Input
            w="100%"
            placeholder="OE дугаар, Бүтээгдэхүүний нэрээр, Үйлдвэрлэгчээр хайх"
          />
        </HStack>
        <HStack gap={2} ml={-4}>
          <Button variant="outline" leftIcon={<ExelIcon />} px={4} mr={4}>
            Excel файлаар хайх
          </Button>
          <Button
            variant="outline"
            onClick={loginOnOpen}
            display={session ? "none" : "flex"}
          >
            Нэвтрэх
          </Button>
          <Link href="/sign-up" style={{ display: session ? "none" : "flex" }}>
            <Button
              rightIcon={<IconArrowRight />}
              size="md"
              colorScheme="primary"
            >
              Бүртгүүлэх
            </Button>
          </Link>
          <Link href="/profile" style={{ display: session ? "flex" : "none" }}>
            <Button
              p={2}
              onClick={() => {
                signOut({ redirect: true, callbackUrl: "/" });
              }}
            >
              {/* <IconUser /> */}
              <IconLogout />
            </Button>
          </Link>

          <Button
            p={2}
            onClick={() => {
              if (session) {
                router.push("/cart");
              } else {
                loginOnOpen();
              }
            }}
          >
            <IconShoppingCart />
          </Button>
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
          <Box>
            <CategoryDropDown />
          </Box>

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
