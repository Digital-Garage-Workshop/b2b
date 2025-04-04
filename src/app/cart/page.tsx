"use client";
import { EmptyCart, GetCartProducts } from "@/_services/user";
import {
  BreadCrumb,
  CartProductCard,
  OrderInfo,
  SelectLocation,
} from "@/components";
import { UseApi, useCustomToast } from "@/hooks";
import { ExelIcon, LongArrow } from "@/icons";
import {
  error600,
  grey100,
  grey200,
  grey50,
  grey500,
  primary,
} from "@/theme/colors";
import {
  Button,
  HStack,
  Image,
  Skeleton,
  Spinner,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconPackage, IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Page() {
  const [localProducts, setLocalProducts] = useState<any[]>([]);
  const [allTotal, setAllTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const toast = useCustomToast();

  const [{ data: products, isLoading: productLoader }, getCartProduct] = UseApi(
    {
      service: GetCartProducts,
      useAuth: true,
    }
  );

  const [
    { data: emptyCartData, isLoading: emptyCartLoader, successMessage },
    emptyCart,
  ] = UseApi({
    service: EmptyCart,
    useAuth: true,
  });

  useEffect(() => {
    if (products) {
      setLocalProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (successMessage) {
      setLocalProducts([]);
      toast({
        type: "success",
        title: "Амжилттай",
        description: successMessage || "",
      });
    }
  }, [emptyCartData, successMessage]);

  useEffect(() => {
    if (localProducts && localProducts.length > 0) {
      const total = localProducts.reduce((acc, item: any) => {
        return acc + (item?.price || 0) * (item?.quantity || 0);
      }, 0);

      setAllTotal(total);
    } else {
      // If there are no products, set total to 0
      setAllTotal(0);
    }
  }, [localProducts]);

  useEffect(() => {
    getCartProduct();
  }, []);

  const handleEmptyCart = () => {
    // setLocalProducts([]);
    emptyCart();
  };

  return (
    <VStack w="full" pb={110} minH="100vh" align="flex-start">
      <HStack my={"22px"}>
        <Text variant="subtitle2">1. Сагс</Text>
        <LongArrow />
        <Text variant="body2" color={grey500}>
          2. Хаяг
        </Text>
        <LongArrow />
        <Text variant="body2" color={grey500}>
          3. Төлбөр төлөлт
        </Text>
      </HStack>
      <HStack w="full" gap={6} align="flex-start">
        <VStack flex={4} gap={6}>
          <VStack
            w="full"
            gap={6}
            align="flex-start"
            p={6}
            borderRadius={8}
            border={`1px solid ${grey200}`}
            flex={4}
          >
            <HStack
              w="full"
              justify="space-between"
              display={localProducts?.length > 0 ? "flex" : "none"}
            >
              <HStack gap={4}>
                <Text variant="h8">Сагс</Text>
                <Text variant="subtitle2" color={grey500}>
                  {localProducts?.length || 0} бүтээгдэхүүн
                </Text>
              </HStack>
              <HStack
                p={0}
                cursor="pointer"
                display={localProducts?.length > 0 ? "flex" : "none"}
                onClick={handleEmptyCart}
              >
                {emptyCartLoader ? (
                  <Spinner size="sm" colorScheme={primary} color={primary} />
                ) : (
                  <IconTrash color={error600} size={20} />
                )}
                <Text variant="body2" color={error600}>
                  Бүгдийг нь устгах
                </Text>
              </HStack>
            </HStack>
            <Button
              display={localProducts?.length > 0 ? "flex" : "none"}
              w="full"
              variant="outline"
              leftIcon={<ExelIcon />}
            >
              Excel файлаар татах
            </Button>
            {productLoader ? (
              <VStack w="full">
                <Skeleton
                  w="full"
                  h={183}
                  borderRadius={8}
                  startColor={grey50}
                  endColor={grey100}
                />
                <Skeleton
                  w="full"
                  h={183}
                  borderRadius={8}
                  startColor={grey50}
                  endColor={grey100}
                />
                <Skeleton
                  w="full"
                  h={183}
                  borderRadius={8}
                  startColor={grey50}
                  endColor={grey100}
                />
                <Skeleton
                  w="full"
                  h={183}
                  borderRadius={8}
                  startColor={grey50}
                  endColor={grey100}
                />
              </VStack>
            ) : localProducts?.length > 0 ? (
              localProducts?.map((product, index) => {
                return (
                  <CartProductCard
                    data={product}
                    key={index}
                    setLocalProducts={setLocalProducts}
                    setAllTotal={setAllTotal}
                  />
                );
              })
            ) : (
              <VStack
                w="full"
                py={10}
                gap={1}
                alignItems="center"
                justify="center"
              >
                <Image src="/cartempty.svg" h={217} w={263} />
                <Text variant="subtitle2">Таны сагс хоосон байна!</Text>
                <Text color={grey500} variant="body3">
                  Танд сагсалсан бүтээгдэхүүн одоогоор байхгүй байна.
                </Text>
                <Link href="/">
                  <Button variant="outline" mt={3}>
                    Худалдан авалт хийх
                  </Button>
                </Link>
              </VStack>
            )}
          </VStack>
        </VStack>
        <OrderInfo
          total={allTotal}
          selectedAddress={selectedAddress}
          items={localProducts?.length}
          showReg={false}
          handleCreateData={(
            isOrganization: boolean,
            regNumber: string,
            regData?: any
          ) => {}}
        />
      </HStack>
    </VStack>
  );
}
