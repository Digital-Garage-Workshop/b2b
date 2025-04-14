"use client";
import { CreatePayment, EmptyCart, GetCartProducts } from "@/_services/user";
import {
  CartProductCard,
  ConsultModal,
  OrderInfo,
  SelectLocation,
} from "@/components";
import { UseApi, useCustomToast } from "@/hooks";
import { ExelIcon, LongArrow } from "@/icons";
import { clearCart } from "@/redux/slices/cartSlice";
import { error600, grey200, grey500 } from "@/theme/colors";
import {
  Button,
  HStack,
  Image,
  Text,
  VStack,
  Alert,
  AlertIcon,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { IconTrash } from "@tabler/icons-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function Page() {
  const [localProducts, setLocalProducts] = useState<any[]>([]);
  const [allTotal, setAllTotal] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState("");
  const [inventoryErrors, setInventoryErrors] = useState<any>([]);
  const toast = useCustomToast();
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [{ data: products, isLoading: productLoader }, getCartProduct] = UseApi(
    {
      service: GetCartProducts,
      useAuth: true,
    }
  );

  const [
    {
      data: emptyCartData,
      isLoading: emptyCartLoader,
      successMessage: emptySuccess,
    },
    emptyCart,
  ] = UseApi({
    service: EmptyCart,
    useAuth: true,
  });

  const [
    {
      data: createPaymentData,
      isLoading: createDataLoader,
      errData,
      error,
      successMessage,
    },
    createOrder,
  ] = UseApi({
    service: CreatePayment,
    useAuth: true,
  });

  const handleCreateData = (
    isOrganization: boolean,
    regNumber: string,
    regData?: any
  ) => {
    try {
      createOrder({
        etype: isOrganization ? "corporate" : "personal",
        addressid: selectedAddress,
        register: regNumber,
        corporatename: regData?.name,
      });
    } catch (error: any) {
      toast({
        type: "error",
        title: "Уучлаарай",
        description: error.toString() || "",
      });
    }
  };

  useEffect(() => {
    if (createPaymentData) {
      toast({
        type: "success",
        title: "Амжилттай",
        description: successMessage || "",
      });
      router.push(`/payment?order=${createPaymentData?.id}`);
    }
  }, [createPaymentData]);

  useEffect(() => {
    if (error) {
      toast({
        type: "error",
        title: "Уучлаарай",
        description: error,
      });
      if (errData && Array.isArray(errData)) {
        setInventoryErrors(errData);
      }
    } else {
      setInventoryErrors([]);
    }
  }, [errData, error]);

  useEffect(() => {
    if (products) {
      setLocalProducts(products);
    }
  }, [products]);

  // useEffect(() => {
  //   if (emptyCartData) {
  //     setLocalProducts([]);
  //   }
  // }, [emptyCartData]);
  useEffect(() => {
    if (emptySuccess) {
      setLocalProducts([]);
      toast({
        type: "success",
        title: "Амжилттай",
        description: emptySuccess || "",
      });
      onClose();
      dispatch(clearCart());
    }
  }, [emptyCartData, emptySuccess]);

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

  const hasInventoryErrors = inventoryErrors && inventoryErrors.length > 0;

  return (
    <VStack w="full" pb={110} minH="100vh" align="flex-start">
      <HStack my={"22px"}>
        <Link href="/cart">
          <Text variant="body2" color={grey500} cursor="pointer">
            1. Cart
          </Text>
        </Link>
        <LongArrow />
        <Text variant="subtitle2">2. Address</Text>
        <LongArrow />
        <Text variant="body2" color={grey500}>
          3. Payment
        </Text>
      </HStack>

      {hasInventoryErrors && (
        <Alert status="error" mb={4} borderRadius={8}>
          <AlertIcon />
          <Box>
            <Text fontWeight="bold">Үлдэгдэл хүрэлцэхгүй байна</Text>
            <Text fontSize="sm">
              Зарим бүтээгдэхүүний үлдэгдэл хүрэлцэхгүй байна. Тоо хэмжээг
              өөрчилнө үү.
            </Text>
          </Box>
        </Alert>
      )}

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
                onClick={onOpen}
              >
                <IconTrash color={error600} size={20} />
                <Text variant="body2" color={error600}>
                  Бүгдийг устгах
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
                  <Link
                    href={`/product-detail/${product?.articleid}`}
                    target="_blank"
                    key={index}
                    style={{ width: "100%" }}
                  >
                    <CartProductCard
                      data={product}
                      key={index}
                      setLocalProducts={setLocalProducts}
                      setAllTotal={setAllTotal}
                      inventoryErrors={inventoryErrors}
                      isAddressCard={true}
                    />
                  </Link>
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
                <Button variant="outline" mt={3}>
                  Худалдан авалт хийх
                </Button>
              </VStack>
            )}
          </VStack>
        </VStack>
        <OrderInfo
          total={allTotal}
          selectedAddress={selectedAddress}
          items={localProducts?.length}
          showReg={true}
          createDataLoader={createDataLoader}
          handleCreateData={handleCreateData}
          hasInventoryErrors={hasInventoryErrors}
          handleUpdateCard={() => {}}
        />
        <ConsultModal
          iconBg="#FEF3F2"
          icon={<IconTrash color="#D92D20" size={28} />}
          isOpen={isOpen}
          onClose={onClose}
          buttonStr="Хоослох"
          buttonLoader={emptyCartLoader}
          buttonAction={handleEmptyCart}
          title="Та сагсаа хоослохдоо итгэлтэй байна уу?"
          desc="Таны сагсалсан бүтээгдэхүүнүүд сагснаас устгагдах бөгөөд худалдан авалт хийхийн тулд ахин бүтээгдэхүүнээ сагслах шаардлагатайг анхаарна уу"
        />
      </HStack>
    </VStack>
  );
}
