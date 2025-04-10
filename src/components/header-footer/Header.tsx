"use client";
import { ExelIcon, Logo } from "@/icons";
import { grey50, secondary } from "@/theme/colors";
import {
  Box,
  Button,
  HStack,
  Input,
  Skeleton,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import {
  IconArrowRight,
  IconShoppingCart,
  IconUser,
} from "@tabler/icons-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { LoginModal } from "../login";
import { useSession } from "next-auth/react";
import { CategoryDropDown } from "./CategoryDropDown";
import { UseApi } from "@/hooks";
import { GetCartProducts } from "@/_services/user";
import { useEffect, useState } from "react";
import { HeaderCategory } from "@/_services";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { addCart } from "@/redux/slices/cartSlice";

export const Header = () => {
  const pathname = usePathname();
  const router = useRouter();
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const cart = useSelector((state: { cart: any }) => state.cart.cart);
  const alltotal = useSelector((state: { cart: any }) => state.cart.allTotal);
  const {
    onClose: loginOnClose,
    onOpen: loginOnOpen,
    isOpen: loginIsOpen,
  } = useDisclosure();

  const [{ data, isLoading }, fetch] = UseApi({
    service: HeaderCategory,
  });

  const [showCategories, setShowCategories] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [cartitems, setCart] = useState(0);

  const [{ data: cartProducts }, fetchCart] = UseApi({
    service: GetCartProducts,
    useAuth: true,
  });

  useEffect(() => {
    fetch();
  }, []);

  useEffect(() => {
    if (session) fetchCart();
  }, [session]);

  useEffect(() => {
    if (cartProducts) {
      cartProducts.map((item: any) => {
        dispatch(addCart(item));
      });
    }
  }, [cartProducts]);

  // useEffect(() => {
  //   const controlCategories = () => {
  //     if (typeof window !== "undefined") {
  //       if (window.scrollY > lastScrollY && window.scrollY > 100) {
  //         setShowCategories(false);
  //       } else if (window.scrollY < lastScrollY) {
  //         setShowCategories(true);
  //       }

  //       setLastScrollY(window.scrollY);
  //     }
  //   };

  //   if (typeof window !== "undefined") {
  //     window.addEventListener("scroll", controlCategories);

  //     return () => {
  //       window.removeEventListener("scroll", controlCategories);
  //     };
  //   }
  // }, [lastScrollY]);

  return (
    <Stack
      w="100%"
      gap={0}
      align="center"
      pos="fixed"
      bg="white"
      zIndex={15}
      overflow="hidden"
    >
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
          <Button
            variant="outline"
            leftIcon={<ExelIcon />}
            px={4}
            mr={4}
            onClick={() => {
              if (session) {
                router.push("/excel-file-import");
              } else {
                loginOnOpen();
              }
            }}
          >
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
          <Link
            href="/profile?tag=Хэрэглэгчийн тохиргоо"
            style={{ display: session ? "flex" : "none" }}
          >
            <Button p={2}>
              <IconUser />
              {/* <IconLogout /> */}
            </Button>
          </Link>

          <Stack pos="relative">
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
            <Stack
              w={6}
              h={6}
              bg={secondary}
              borderRadius={10}
              pos="absolute"
              right={-3}
              top={-3}
              align="center"
              justify="center"
            >
              <Text fontSize={15} fontWeight={700} color="white">
                {alltotal}
              </Text>
            </Stack>
          </Stack>
        </HStack>
      </HStack>
      <HStack
        bg={grey50}
        py={2}
        w="100%"
        justify="center"
        display={
          pathname?.includes("product") || pathname === "/" ? "flex" : "none"
        }
        // height={showCategories ? "54px" : "0px"}
        // transition="height 0.3s ease-in-out"
        overflow="hidden"
      >
        <HStack gap={{ base: 2, md: 6 }} w="82%">
          <Box>
            <CategoryDropDown />
          </Box>

          <Stack w="1px" height="24px" border={"0.5px solid #D0D5DD"} />
          <HStack gap={2} w={"full"}>
            {isLoading ? (
              <HStack gap={6}>
                {[1, 2, 3, 4, 5, 6].map((element) => (
                  <Skeleton
                    key={element}
                    width={"70px"}
                    height={"30px"}
                    startColor="#F2F4F7"
                    endColor="#F2F4F7"
                  />
                ))}
              </HStack>
            ) : (
              data?.map((item: any, index: number) => (
                <Link
                  href={`/product-list/${item.categoryid}?part=${item.name}`}
                  key={index}
                >
                  <Button
                    variant="ghost"
                    cursor={"pointer"}
                    size={"sm"}
                    w="fit-content"
                  >
                    {item.name}
                  </Button>
                </Link>
              ))
            )}
            {/* <Button variant="ghost" size={"sm"}>
              Хямдарсан бараа
            </Button> */}
          </HStack>
        </HStack>
      </HStack>
      <LoginModal isOpen={loginIsOpen} onClose={loginOnClose} />
    </Stack>
  );
};
