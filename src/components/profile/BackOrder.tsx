"use client";
import { grey100, grey50, grey500 } from "@/theme/colors";
import {
  Button,
  Checkbox,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconSearch, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { BackOrderCard } from "../cards";
import { UseApi } from "@/hooks";
import { GetBackOrders } from "@/_services/user";
import Link from "next/link";

export const BackOrder = () => {
  const [checkedProducts, setCheckedProducts] = useState<any[]>([]);
  const [{ data, isLoading }, getBackOrders] = UseApi({
    service: GetBackOrders,
    useAuth: true,
  });

  useEffect(() => {
    getBackOrders();
  }, []);

  return (
    <VStack
      w="full"
      p={4}
      gap={6}
      borderRadius={8}
      border={`1px solid ${grey100}`}
      boxShadow="0px 2px 24px -4px rgba(16, 24, 40, 0.02)"
      align="flex-start"
    >
      <HStack w="full" justify="space-between">
        <Text variant="h7">Back Order</Text>
        <InputGroup maxW={462}>
          <InputLeftElement>
            <IconSearch size={20} color={grey500} />
          </InputLeftElement>
          <Input
            fontSize={14}
            placeholder="Сэлбэгийн OE дугаар, article number, сэлбэгийн нэрээр хайх"
            pl={8}
            maxW={462}
          />
        </InputGroup>
      </HStack>
      <HStack w="full" justify="flex-end">
        <Button variant="ghost" leftIcon={<Checkbox />}>
          Select all
        </Button>
        <Button p="8px 24px" variant="filled" leftIcon={<IconTrash />}>
          Устгах
        </Button>
      </HStack>
      {isLoading ? (
        <VStack w="full">
          <Skeleton w="full" startColor={grey100} endColor={grey50} h={20} />
          <Skeleton w="full" startColor={grey100} endColor={grey50} h={20} />
          <Skeleton w="full" startColor={grey100} endColor={grey50} h={20} />
          <Skeleton w="full" startColor={grey100} endColor={grey50} h={20} />
        </VStack>
      ) : data?.length > 0 ? (
        data?.map((order: any, index: number) => (
          <Link
            style={{ width: "100%" }}
            href={`/product-detail/${order?.articleid}`}
            target="_blank"
          >
            <BackOrderCard
              key={index}
              setCheckedProducts={setCheckedProducts}
              item={order}
            />
          </Link>
        ))
      ) : (
        <VStack w="full" gap={3} alignItems="center" justify="center">
          <Image src="/empty.svg" width={356} height={356} />
          <Text fontSize="lg" fontWeight="medium">
            Захиалга олдсонгүй!
          </Text>
          <Text color={grey500} textAlign="center" maxW={400}>
            Танд одоогоор захиалгын түүх байхгүй байна.
          </Text>
        </VStack>
      )}
    </VStack>
  );
};
