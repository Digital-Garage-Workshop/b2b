"use client";
import { SignUpForm } from "@/components/sign-up";
import { grey200, grey600, primary } from "@/theme/colors";
import { Button, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import { IconArrowRight, IconUser, IconUsers } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Page() {
  const [isCompany, setIsCompany] = useState(false);
  const searchParams = useSearchParams();
  const tag = searchParams?.get("tag") || null;
  const router = useRouter();

  return (
    <VStack
      w="100%"
      minH="100vh"
      align="center"
      justify="center"
      pos="relative"
    >
      <VStack
        display={!tag ? "flex" : "none"}
        w={"45%"}
        gap={8}
        alignSelf="center"
        justifySelf={"center"}
      >
        <Text variant="h7">Get started with Garage B2B</Text>
        <Text variant="body2" mt={-6}>
          Start with what you know, see what sticks, and get paid
        </Text>
        <HStack
          w="full"
          border={`1.5px solid ${!isCompany ? primary : grey200}`}
          bg={!isCompany ? "#FEF7F2" : "white"}
          p="10px"
          gap="10px"
          borderRadius={8}
          flex={1}
          cursor="pointer"
          onClick={() => setIsCompany(false)}
        >
          <Stack
            p={2}
            borderRadius={8}
            border={`1.5px solid ${!isCompany ? primary : grey200}`}
            bg="white"
          >
            <IconUser size={24} />
          </Stack>
          <VStack align="flex-start" gap={0}>
            <Text variant="subtitle3">Хувь хүн</Text>
            <Text variant="caption">
              Im settings up a storefront for myself
            </Text>
          </VStack>
        </HStack>
        <HStack
          w="full"
          mt={-4}
          border={`1.5px solid ${isCompany ? primary : grey200}`}
          bg={isCompany ? "#FEF7F2" : "white"}
          p="10px"
          gap="10px"
          borderRadius={8}
          flex={1}
          cursor="pointer"
          onClick={() => setIsCompany(true)}
        >
          <Stack
            p={2}
            borderRadius={8}
            border={`1.5px solid ${isCompany ? primary : grey200}`}
            bg="white"
          >
            <IconUsers size={24} />
          </Stack>
          <VStack align="flex-start" gap={0}>
            <Text variant="subtitle3">Байгууллага</Text>
            <Text variant="caption">
              Im settings up a storefront for my company
            </Text>
          </VStack>
        </HStack>
        <Button
          w="full"
          rightIcon={<IconArrowRight />}
          onClick={() => {
            if (isCompany) {
              router.push("?tag=company");
            } else {
              router.push("?tag=personal");
            }
          }}
        >
          Үргэлжлүүлэх
        </Button>
      </VStack>
      <SignUpForm />
      <HStack
        w="full"
        justify="space-between"
        pb={12}
        pos="absolute"
        bottom={0}
        display={!tag ? "flex" : "none"}
      >
        <Text color={grey600} fontSize={12}>
          © 2023 — Copyright
        </Text>
        <Text fontSize={12} color={grey600}>
          Privacy
        </Text>
      </HStack>
    </VStack>
  );
}
