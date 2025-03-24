import { HStack, Text } from "@chakra-ui/react";
import { IconCheck } from "@tabler/icons-react";

export const ValidationCheck = ({
  isValid,
  text,
}: {
  isValid: boolean;
  text: string;
}) => (
  <HStack gap={2} w="full">
    <IconCheck color={isValid ? "#F75B00" : "#475467"} />
    <Text color={isValid ? "#F75B00" : "#475467"} fontSize={14}>
      {text}
    </Text>
  </HStack>
);
