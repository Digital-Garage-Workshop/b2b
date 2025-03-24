import { grey200, textDefault, warning50, warning600 } from "@/theme/colors";
import { formatCurrency } from "@/utils";
import { Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { IconInfoCircle } from "@tabler/icons-react";

export const OrderInfo = () => {
  return (
    <VStack
      flex={2}
      p={4}
      gap={6}
      align="flex-start"
      border={`1px solid ${grey200}`}
      borderRadius={8}
    >
      <Text variant="h8">Таны захиалга:</Text>
      <VStack gap={2} w="full">
        <HStack w="full" justify="space-between">
          <Text variant="body2" color={textDefault}>
            Бараа тоо:
          </Text>
          <Text variant="body2" color={textDefault}>
            8 ширхэг
          </Text>
        </HStack>
        <HStack w="full" justify="space-between">
          <Text variant="body2" color={textDefault}>
            Бараа тоо:
          </Text>
          <Text variant="body2" color={textDefault}>
            8 ширхэг
          </Text>
        </HStack>
        <HStack w="full" justify="space-between">
          <Text variant="body2" color={textDefault}>
            Бараа тоо:
          </Text>
          <Text variant="body2" color={textDefault}>
            8 ширхэг
          </Text>
        </HStack>
      </VStack>
      <Divider variant="dashed" my={-2} />

      <HStack w="full" justify="space-between">
        <Text variant="subtitle2" color={textDefault}>
          Нийт төлөх үнэ:
        </Text>
        <Text variant="h7" color={textDefault}>
          {formatCurrency(12500000)}
        </Text>
      </HStack>
      <Button w="full">Үргэлжлүүлэх</Button>
      <HStack bg={warning50} borderRadius={8} p="10px" align="flex-start">
        <IconInfoCircle size={24} color={warning600} />
        <Text color={warning600} variant="body3" w="90%">
          Та Хүргэлтээр болон Очиж авах захиалгуудыг хамтад нь захиалах
          боломжгүйг анхаарна уу.
        </Text>
      </HStack>
    </VStack>
  );
};
