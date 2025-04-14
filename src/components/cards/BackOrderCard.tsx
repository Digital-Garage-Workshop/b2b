"use client";
import {
  grey100,
  grey200,
  grey50,
  grey500,
  grey700,
  primary,
  warning600,
} from "@/theme/colors";
import {
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
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { formatCurrency } from "@/utils";

export const BackOrderCard = ({
  item,
  setCheckedProducts,
}: {
  item: any;
  setCheckedProducts: Dispatch<SetStateAction<any[]>>;
}) => {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(4);
  const orgQuantity = parseInt(item?.org_quantity) > 0;

  useEffect(() => {
    setQuantity(parseInt(item?.miss_quantity));
  }, []);
  return (
    <HStack
      w="full"
      borderRadius={8}
      border={`1px solid ${grey200}`}
      bg="white"
      p={4}
      // gap="56px"
      boxShadow="0px 4px 8px -4px rgba(16, 24, 40, 0.05)"
      cursor="pointer"
      justify="space-between"
    >
      <HStack gap={2}>
        <Checkbox
          isDisabled={!orgQuantity}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            const isChecked = e.target.checked;

            setCheckedProducts((prev) => {
              if (isChecked) {
                return [...prev, item];
              } else {
                return prev.filter((product) => {
                  console.log(
                    product.articleid != item.articleid,
                    product.articleid,
                    item.articleid
                  );
                  return product.articleid != item.articleid;
                });
              }
            });
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
              {}
            </Text>
          </HStack>

          <Text variant="overline">Үүссэн өдөр: {item?.date}</Text>
          <Text variant="title1">
            {item?.brandname} {item?.partname}
          </Text>
          <Text fontSize={14}>Article Number: {item?.articleno}</Text>
          <Text variant="subtitle3">
            {" "}
            Нэгж үнэ: {formatCurrency(item?.price || 0)}
          </Text>
        </VStack>
      </HStack>

      <VStack align="flex-start">
        <Text variant="body3" color={grey500}>
          Боломжтой өдөр:
        </Text>
        <Text variant="subtitle2" color={warning600}>
          {item?.arriveday || "Тодорхойгүй байна"}
        </Text>
      </VStack>

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
          <Text variant="title1">
            {session
              ? formatCurrency(item?.price * parseInt(item?.miss_quantity) || 0)
              : "****"}
          </Text>
        </VStack>
      </HStack>

      <Button borderRadius="full" variant="filled" p="6px">
        <IconTrash size={20} />
      </Button>
    </HStack>
  );
};
