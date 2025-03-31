"use client";
import { EmptyCart, GetCartProducts } from "@/_services/user";
import {
  BreadCrumb,
  CartProductCard,
  OrderInfo,
  SelectLocation,
} from "@/components";
import { UseApi } from "@/hooks";
import { ExelIcon } from "@/icons";
import { error600, grey200, grey500 } from "@/theme/colors";
import { Button, HStack, Text, VStack } from "@chakra-ui/react";
import { IconPackage, IconTrash } from "@tabler/icons-react";
import { useEffect, useState } from "react";

export default function Page() {
  const [localProducts, setLocalProducts] = useState([]);
  const [allTotal, setAllTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");

  const [{ data: products, isLoading: productLoader }, getCartProduct] = UseApi(
    {
      service: GetCartProducts,
      useAuth: true,
    }
  );

  const [{ data: emptyCartData, isLoading: emptyCartLoader }, emptyCart] =
    UseApi({
      service: EmptyCart,
      useAuth: true,
    });

  useEffect(() => {
    if (products) {
      setLocalProducts(products);
    }
  }, [products]);

  useEffect(() => {
    if (emptyCartData) {
      setLocalProducts([]);
    }
  }, [emptyCartData]);

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
    setLocalProducts([]);
    emptyCart();
  };

  return (
    <VStack w="full" pb={110} minH="100vh">
      <BreadCrumb crumbs={[{ path: "Cart", href: "" }]} />
      <HStack w="full" gap={6} align="flex-start">
        <VStack flex={4} gap={6}>
          <SelectLocation
            setSelectedAddress={setSelectedAddress}
            selectedAddress={selectedAddress}
          />
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
                  {localProducts?.length || 0} items
                </Text>
              </HStack>
              <HStack
                p={0}
                cursor="pointer"
                display={localProducts?.length > 0 ? "flex" : "none"}
                onClick={handleEmptyCart}
              >
                <IconTrash color={error600} size={20} />
                <Text variant="body2" color={error600}>
                  Remove all
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
            {localProducts?.length > 0 ? (
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
                gap={3}
                alignItems="center"
                justify="center"
              >
                <IconPackage size={64} color={grey500} />
                <Text fontSize="lg" fontWeight="medium">
                  Бүтээгдэхүүн олдсонгүй
                </Text>
                <Text color={grey500} textAlign="center" maxW={400}>
                  Танд сагсалсан бүтээгдэхүүн одоогоор байхгүй байна.
                </Text>
              </VStack>
            )}
          </VStack>
        </VStack>
        <OrderInfo
          total={allTotal}
          selectedAddress={selectedAddress}
          items={localProducts?.length}
        />
      </HStack>
    </VStack>
  );
}
