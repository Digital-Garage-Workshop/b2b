"use client";
import { VerifyEmail } from "@/_services";
import { LoginModal } from "@/components/login";
import { UseApi } from "@/hooks";
import { grey200, grey600 } from "@/theme/colors";
import {
  Button,
  Highlight,
  HStack,
  Image,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const [{ data, isLoading, status, error }, verifyEmail] = UseApi({
    service: VerifyEmail,
  });

  const { isOpen, onClose, onOpen } = useDisclosure();

  const { token } = useParams() as { token: string };

  useEffect(() => {
    verifyEmail({ token });
  }, []);

  return (
    <VStack w="100%" h="100vh" align="center" justify="center">
      {isLoading ? (
        <VStack>
          <Spinner />
        </VStack>
      ) : status ? (
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
          <Text variant="h7">Амжилттай</Text>
          <Text textAlign={"center"}>
            Та бүртгүүлсэн хаягаа ашиглан нэвтэрнэ үү.
          </Text>
          <Button
            w="full"
            isLoading={isLoading}
            disabled={isLoading}
            onClick={onOpen}
          >
            Нэвтрэх
          </Button>
        </VStack>
      ) : (
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
          <Text variant="h7">Уучлаарай</Text>
          <Text textAlign={"center"}>{error}</Text>
          <Link href="/sign-up" style={{ width: "100%" }}>
            <Button w="full">Бүртгүүлэх</Button>
          </Link>
        </VStack>
      )}
      <HStack w="full" justify="space-between" mt={88} pb={12}>
        <Text color={grey600} fontSize={12}>
          © 2023 — Copyright
        </Text>
        <Text fontSize={12} color={grey600}>
          Privacy
        </Text>
      </HStack>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </VStack>
  );
}
