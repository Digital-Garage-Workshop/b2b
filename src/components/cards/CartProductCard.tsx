import { grey100, grey200, grey600, grey700, primary } from "@/theme/colors";
import { formatCurrency } from "@/utils";
import { Button, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";

export const CartProductCard = (props: { isStatic?: boolean }) => {
  const { isStatic } = props;
  return (
    <HStack
      w="full"
      borderRadius={8}
      border={`1px solid ${grey200}`}
      p={4}
      justify="space-between"
    >
      <HStack gap={4}>
        <Image src="/home/ridex.svg" w={136} h={151} objectFit={"contain"} />
        <VStack gap={2} align="flex-start">
          <Image src="/home/ridexlogo.svg" w={78} h={6} objectFit={"contain"} />
          <Text variant="subtitle2">1862O0009P</Text>
          <Text variant="title1">RIDEX PLUS Engine Oil</Text>
          <HStack gap={1}>
            <Text variant="subtitle3">Article Number:</Text>
            <Text fontSize={14}> SM9913</Text>
          </HStack>
          <Text variant="subtitle3">Үндсэн үнэ: 200’000₮</Text>
        </VStack>
      </HStack>
      <VStack justify="space-between" align="flex-end">
        <Button
          p={2}
          variant="filled"
          borderRadius="full"
          display={isStatic ? "none" : "flex"}
        >
          <IconTrash color={grey600} />
        </Button>
        <HStack p={1} borderRadius={16} bg={grey100}>
          <Stack
            p={1}
            borderRadius="full"
            bg="white"
            cursor="pointer"
            display={isStatic ? "none" : "flex"}
          >
            <IconMinus color={primary} size={13} />
          </Stack>
          <Text variant="subtitle1" color="black">
            {isStatic ? "100ш" : 100}
          </Text>
          <Stack
            p={1}
            borderRadius="full"
            bg="white"
            cursor="pointer"
            display={isStatic ? "none" : "flex"}
          >
            <IconPlus color={primary} size={13} />
          </Stack>
        </HStack>
        <VStack gap={0} align="flex-end">
          <Text variant="h8">{formatCurrency(115000)}</Text>
          <Text fontSize={12} fontWeight={500} color={grey700}>
            НӨАТ багтсан үнэ
          </Text>
        </VStack>
      </VStack>
    </HStack>
  );
};
