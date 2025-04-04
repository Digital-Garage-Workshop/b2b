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

export default function VerificationPending() {
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
          <Highlight query="Tengisulzii@gmail.com" styles={{ fontWeight: 700 }}>
            To start using Garage B2B, confirm your email address with the email
            we sent to: Tengisulzii@gmail.com
          </Highlight>
        </Text>
        <HStack w="full">
          <Button flex={1} variant="outline">
            Contact support
          </Button>
          <Button flex={1}>Дахин илгээх</Button>
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
