"use client";
import {
  grey100,
  grey200,
  grey50,
  grey700,
  primary,
  success,
  success50,
} from "@/theme/colors";
import {
  Box,
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { formatCurrency } from "@/utils";

export const ExcelCard = ({
  item,
  oem,
  setCheckedProducts,
  handleRemoveSingleProduct,
}: {
  item: any;
  oem: string;
  setCheckedProducts: (product: any, checked: boolean) => void;
  handleRemoveSingleProduct: (oemCode: string, productId: string) => void;
}) => {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(4);
  const orgQuantity = parseInt(item?.org_quantity) > 0;

  useEffect(() => {
    setQuantity(parseInt(item?.user_quantity));
  }, [item]);
  return (
    <HStack
      w="full"
      borderRadius={8}
      border={`1px solid ${grey200}`}
      bg={orgQuantity ? "white" : grey50}
      p={4}
      gap="56px"
      boxShadow="0px 4px 8px -4px rgba(16, 24, 40, 0.05)"
      cursor="pointer"
    >
      <HStack gap={4} flex={1}>
        <Checkbox
          isDisabled={!orgQuantity}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setCheckedProducts(item, e.target.checked);
          }}
        />
        <Image
          src={
            item.image?.imgurl800 || item.image?.imgurl400 || "/home/ridex.svg"
          }
          height={112}
          objectFit="contain"
          w={112}
        />
        <VStack gap={2} align="flex-start">
          <HStack>
            <Text variant="subtitle2">OEM:</Text>
            <Text bg={primary} color="white" variant="subtitle2">
              {oem}
            </Text>
          </HStack>
          <Text variant="title1">
            {item?.brandname} {item?.category}
          </Text>
          <Text fontSize={14}>Article Number: {item?.articleno}</Text>
          {orgQuantity ? (
            <Text
              bg={success50}
              color={success}
              variant="overlineBold"
              borderRadius={16}
              p="4px 8px"
            >
              Нөөцөд байгаа
            </Text>
          ) : (
            <Text
              bg={grey200}
              color={grey700}
              variant="overlineBold"
              borderRadius={16}
              p="4px 8px"
            >
              Дууссан
            </Text>
          )}
        </VStack>
      </HStack>
      <Stack height={112} w="1px" bg={grey200} />
      <HStack
        flex={1}
        w="full"
        justify="space-between"
        opacity={!orgQuantity ? 0.6 : 1}
        pointerEvents={!orgQuantity ? "none" : "all"}
        cursor={!orgQuantity ? "not-allowed" : "pointer"}
      >
        <HStack gap={6} justify="space-around" w="full">
          <Text variant="subtitle2">
            Нэгж үнэ: {formatCurrency(item?.price || 0)}
          </Text>
          <VStack gap={4} align="flex-start">
            <HStack gap={6}>
              <HStack p={1} borderRadius={16} bg={grey100} maxW={90}>
                <Stack
                  p={1}
                  borderRadius="full"
                  bg="white"
                  cursor="pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (quantity > 2) setQuantity((prev) => prev - 1);
                  }}
                >
                  <IconMinus color={primary} size={13} />
                </Stack>
                <Input
                  value={quantity}
                  onChange={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity(parseInt(e.target.value) || 0);
                  }}
                  variant="ghost"
                  maxW="50px"
                  alignItems={"center"}
                  textAlign="center"
                  h={6}
                  p={0}
                  fontWeight={600}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                />
                <Stack
                  p={1}
                  borderRadius="full"
                  bg="white"
                  cursor="pointer"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setQuantity((prev) => prev + 1);
                  }}
                >
                  <IconPlus color={primary} size={13} />
                </Stack>
              </HStack>

              <VStack gap={0} align="flex-start" w="fit-content">
                <Text variant="h7">
                  {session
                    ? formatCurrency(item?.price * quantity || 0)
                    : "****"}
                </Text>
                <Text fontSize={12} fontWeight={500} color={grey700}>
                  НӨАТ багтсан үнэ
                </Text>
              </VStack>
            </HStack>
            {item?.miss_quantity && (
              <HStack gap={4}>
                <Checkbox w={4} h={4} />
                <Text fontSize={12}>Дараа захиалах</Text>
                <Text
                  bg={grey100}
                  borderRadius={16}
                  p="0px 8px"
                  variant="subtitle2"
                >
                  {item?.miss_quantity}
                </Text>
              </HStack>
            )}
          </VStack>
        </HStack>
        <Button
          borderRadius="full"
          variant="filled"
          p="6px"
          onClick={(e) => {
            e.preventDefault(); // Prevent Link navigation
            e.stopPropagation();
            handleRemoveSingleProduct(oem, item.partid);
          }}
        >
          <IconTrash size={20} />
        </Button>
      </HStack>
    </HStack>
  );
};
