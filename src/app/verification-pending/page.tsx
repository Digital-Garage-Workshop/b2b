"use client";
import { ResendVerify } from "@/_services/auth/resendVerify";
import { UseApi, useCustomToast } from "@/hooks";
import { grey200, grey600 } from "@/theme/colors";
import {
  Button,
  Highlight,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function VerificationPending() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("mail");
  const toast = useCustomToast();

  const [{ data, isLoading, error, successMessage }, resend] = UseApi({
    service: ResendVerify,
  });

  useEffect(() => {
    if (successMessage) {
      toast({
        type: "success",
        title: "Амжилттай",
        description: successMessage || "",
      });
    } else if (error) {
      toast({
        type: "error",
        title: "Амжилтгүй",
        description: error || "",
      });
    }
  }, [successMessage, error]);
  return (
    <Stack
      minH={"100vh"}
      w="full"
      align="center"
      justify="center"
      gap={162}
      pb={20}
    >
      <VStack
        w={678}
        border={`1px solid ${grey200}`}
        boxShadow="0px 4px 8px -4px rgba(16, 24, 40, 0.05)"
        p={6}
        gap={6}
        borderRadius={8}
        mt={150}
      >
        <Image src="/mail.svg" alt="mail" w={336} h={336} />
        <Text variant="h7">И-Мэйлээ шалгана уу.</Text>
        <Text textAlign={"center"}>
          <Highlight
            query={`${email?.toString()}`}
            styles={{ fontWeight: 700 }}
          >
            {`To start using Garage B2B, confirm your email address with the email
            we sent to: ${email || ""}`}
          </Highlight>
        </Text>
        <HStack w="full">
          <Button flex={1} variant="outline">
            Contact support
          </Button>
          <Button
            flex={1}
            isLoading={isLoading}
            onClick={() => resend({ email: email })}
          >
            Дахин илгээх
          </Button>
        </HStack>
      </VStack>
      <HStack w="full" justify="space-between" mt={88} pb={12}>
        <Text color={grey600} fontSize={12}>
          © 2023 — Copyright
        </Text>
        <Text fontSize={12} color={grey600}>
          Privacy
        </Text>
      </HStack>
    </Stack>
  );
}
