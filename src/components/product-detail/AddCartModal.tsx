"use client";
import { AddToCart } from "@/_services/user";
import { UseApi, useCustomToast } from "@/hooks";
import { grey100, grey700, primary } from "@/theme/colors";
import { formatCurrency } from "@/utils";
import {
  Button,
  HStack,
  Image,
  Input,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus, IconShoppingCart } from "@tabler/icons-react";
import { title } from "process";
import { useEffect, useState } from "react";
type AddCartModal = {
  isOpen: boolean;
  onClose: () => void;
  product: any;
  price: any;
  inventory: any;
};

export const AddCartModal = (props: AddCartModal) => {
  const { isOpen, onClose, product, price, inventory } = props;
  const [total, setTotal] = useState();
  const [quantity, setQuantity] = useState(2);
  const toast = useCustomToast();
  const [{ data, isLoading, error, errData, successMessage }, addToCart] =
    UseApi({
      service: AddToCart,
      useAuth: true,
    });

  const handleAddToCart = () => {
    if (quantity < 2)
      return toast({
        type: "error",
        title: "Уучлаарай",
        description: "Та 2-с дээш сэлбэг сагслана уу",
      });
    addToCart({ partid: inventory?.partid, quantity: quantity });
  };

  useEffect(() => {
    if (error) {
      toast({
        type: "error",
        title: "Уучлаарай",
        description: errData || "",
      });
    } else if (successMessage) {
      toast({
        type: "success",
        title: "Амжилттай.",
        description: successMessage || "",
      });
      onClose();
    }
  }, [error, successMessage]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={488} p={6}>
        <VStack gap={8}>
          <Text variant="h7" textAlign="center" maxW={380}>
            {product?.brandname} {product?.category}
          </Text>
          <HStack gap={6} w="full">
            <Image
              src={
                product?.images?.imgurl800 ||
                product?.images?.imgurl400 ||
                "/home/ridex.svg"
              }
              w={181}
              objectFit="contain"
            />
            <VStack gap={4} align="flex-start" w={235}>
              <Text>Худалдан авах тоо:</Text>
              <HStack p={1} borderRadius={16} bg={grey100}>
                <Stack
                  p={1}
                  borderRadius="full"
                  bg="white"
                  cursor="pointer"
                  onClick={() => {
                    if (quantity > 2) setQuantity((prev) => prev - 1);
                  }}
                >
                  <IconMinus color={primary} size={13} />
                </Stack>
                <Input
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
                  variant="ghost"
                  maxW="30px"
                  alignItems={"center"}
                  textAlign="center"
                  h={6}
                  p={0}
                />
                <Stack
                  p={1}
                  borderRadius="full"
                  bg="white"
                  cursor="pointer"
                  onClick={() => setQuantity((prev) => prev + 1)}
                >
                  <IconPlus color={primary} size={13} />
                </Stack>
              </HStack>
              <HStack gap={4}>
                {[10, 15, 20, 100].map((item, index) => (
                  <Button
                    key={index}
                    variant="navy"
                    padding={0}
                    borderRadius={16}
                    fontWeight={600}
                    h={6}
                    onClick={() => setQuantity(item)}
                  >
                    {item}
                  </Button>
                ))}
              </HStack>
              <VStack gap={0} align="flex-start" mt={2}>
                <Text variant="h5">{formatCurrency(price)}</Text>
                <Text fontSize={12} fontWeight={500} color={grey700}>
                  НӨАТ багтсан үнэ
                </Text>
              </VStack>
              <HStack w="full">
                <Button
                  variant="outline"
                  leftIcon={<IconShoppingCart />}
                  isLoading={isLoading}
                  onClick={handleAddToCart}
                >
                  Сагслах
                </Button>
                <Button>Худалдан авах</Button>
              </HStack>
            </VStack>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
