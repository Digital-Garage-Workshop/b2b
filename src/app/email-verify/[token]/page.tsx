"use client";
import { VerifyEmail } from "@/_services";
import { UseApi } from "@/hooks";
import { Button, VStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const [{ data, isLoading }, verifyEmail] = UseApi({
    service: VerifyEmail,
  });

  const { token } = useParams() as { token: string };

  useEffect(() => {
    verifyEmail({ token });
  }, []);

  return (
    <VStack w="100vw" h="100vh" align="center" justify="center">
      <Button isLoading={isLoading} disabled={isLoading}>
        Нэвтрэх
      </Button>
    </VStack>
  );
}
