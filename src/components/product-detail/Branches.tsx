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
import { useSession } from "next-auth/react";
import { LoginModal } from "../login";
import { formatCurrency } from "@/utils";

export const Branches = (props: { product: any; branch: any }) => {
  const { product, branch } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data: session } = useSession();
  const {
    isOpen: loginIsOpen,
    onClose: loginOnclose,
    onOpen: loginOnOpen,
  } = useDisclosure();
  return (
    <HStack w="full" pos="relative" justify="space-between">
      <Text
        variant="overlineBold"
        maxW={12}
        overflow="hidden"
        textOverflow="ellipsis"
        whiteSpace="nowrap"
      >
        {branch.organization}
      </Text>
      <HStack gap={1}>
        {[1, 2, 3, 4, 5].map((blocks) => (
          <Stack
            key={blocks}
            w={1}
            h={3}
            borderRadius={8}
            bg={
              parseInt(branch.quantity) >
              (parseInt(branch.quantity) / 5) * blocks
                ? success
                : grey200
            }
          />
        ))}
      </HStack>
      <VStack gap={0} align="flex-start" pl={2}>
        <Text variant="title2">
          {session ? formatCurrency(branch.price || 0) : "****"}
        </Text>
        <Text fontSize={8} fontWeight={500} color={grey700}>
          НӨАТ багтсан үнэ
        </Text>
      </VStack>
      <Button
        borderRadius="full"
        p={"6px"}
        pos="relative"
        right={0}
        disabled={parseInt(branch.quantity) > 0 ? false : true}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          if (session) {
            onOpen();
          } else {
            loginOnOpen();
          }
        }}
      >
        <IconShoppingCart />
      </Button>
      <AddCartModal
        isOpen={isOpen}
        onClose={onClose}
        product={product}
        price={branch.price}
        inventory={branch}
      />
      <LoginModal isOpen={loginIsOpen} onClose={loginOnclose} />
    </HStack>
  );
};
