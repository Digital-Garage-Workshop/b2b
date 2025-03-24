"use client";
import { CartProductCard, OrderTrack } from "@/components";
import { ExelIcon } from "@/icons";
import { grey200, grey500 } from "@/theme/colors";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";

export default function Page() {
  return (
    <HStack w="full" pb={110} pt={6}>
      <VStack flex={1} gap={6}>
        <OrderTrack />
        <VStack
          w="full"
          gap={6}
          align="flex-start"
          p={6}
          borderRadius={8}
          border={`1px solid ${grey200}`}
          flex={4}
        >
          <HStack w="full" justify="space-between">
            <HStack gap={4}>
              <Text variant="h8">Сагс</Text>
              <Text variant="subtitle2" color={grey500}>
                3 items
              </Text>
            </HStack>
          </HStack>
          <Button w="full" variant="outline" leftIcon={<ExelIcon />}>
            Excel файлаар татах
          </Button>
          <CartProductCard isStatic={true} />
        </VStack>
      </VStack>
      <VStack flex={1}></VStack>
    </HStack>
  );
}
