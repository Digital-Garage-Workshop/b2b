"use client";
import { grey200, grey700, success } from "@/theme/colors";
import {
  Button,
  HStack,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { IconShoppingCart } from "@tabler/icons-react";
import { AddCartModal } from "./AddCartModal";

export const Branches = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <HStack w="full" pos="relative" justify="space-between">
      <Text variant="overlineBold">FQ-10</Text>
      <HStack gap={1}>
        {[1, 2, 3, 4, 5].map((item) => (
          <Stack
            key={item}
            w={1}
            h={3}
            borderRadius={8}
            bg={item < 4 ? success : grey200}
          />
        ))}
      </HStack>
      <VStack gap={0} align="flex-start" pl={2}>
        <Text variant="title2">115’000₮</Text>
        <Text fontSize={8} fontWeight={500} color={grey700}>
          НӨАТ багтсан үнэ
        </Text>
      </VStack>
      <Button
        borderRadius="full"
        p={"6px"}
        pos="relative"
        right={0}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          onOpen();
        }}
      >
        <IconShoppingCart />
      </Button>
      <AddCartModal isOpen={isOpen} onClose={onClose} />
    </HStack>
  );
};
