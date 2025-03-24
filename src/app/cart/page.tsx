"use client";
import {
  BreadCrumb,
  CartProductCard,
  OrderInfo,
  SelectLocation,
} from "@/components";
import { ExelIcon } from "@/icons";
import {
  error600,
  grey200,
  grey50,
  grey500,
  textDefault,
  warning50,
  warning600,
} from "@/theme/colors";
import { formatCurrency } from "@/utils";
import { Button, Divider, HStack, Text, VStack } from "@chakra-ui/react";
import { IconInfoCircle, IconTrash } from "@tabler/icons-react";

export default function Page() {
  return (
    <VStack w="full" pb={110}>
      <BreadCrumb crumbs={[{ path: "Cart", href: "" }]} />
      <HStack w="full" gap={6} align="flex-start">
        <VStack flex={4} gap={6}>
          <SelectLocation />
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
              <HStack p={0} cursor="pointer">
                <IconTrash color={error600} size={20} />
                <Text variant="body2" color={error600}>
                  Remove all
                </Text>
              </HStack>
            </HStack>
            <Button w="full" variant="outline" leftIcon={<ExelIcon />}>
              Excel файлаар татах
            </Button>
            <CartProductCard />
          </VStack>
        </VStack>
        <OrderInfo />
      </HStack>
    </VStack>
  );
}
