"use client";
import { AddToCart, DeleteFromCart } from "@/_services/user";
import { UseApi, useCustomToast } from "@/hooks";
import {
  error600,
  grey100,
  grey200,
  grey600,
  grey700,
  primary,
} from "@/theme/colors";
import { formatCurrency } from "@/utils";
import {
  Button,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
  Tooltip,
  Spinner,
} from "@chakra-ui/react";
import {
  IconAlertCircle,
  IconMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useState, useEffect, Dispatch, SetStateAction, useRef } from "react";

export interface Product {
  partid: number;
  quantity: number;
  price: number;
  userbasketid: string | number;
  images?: any;
  brandlogo?: any;
  articleno?: string;
  brandname?: string;
  partname?: string;
  [key: string]: any;
}

interface InventoryError {
  partid: number;
  org_qty: string;
  user_basket_qty: number;
  inv_status: boolean;
}

interface CartProductCardProps {
  isStatic?: boolean;
  data: Product;
  setLocalProducts: Dispatch<SetStateAction<Product[]>>;
  setAllTotal: Dispatch<SetStateAction<number>>;
  inventoryErrors?: InventoryError[];
}

export const CartProductCard = ({
  isStatic,
  data,
  setLocalProducts,
  setAllTotal,
  inventoryErrors = [],
}: CartProductCardProps) => {
  const [quantity, setQuantity] = useState(data?.quantity || 0);
  const [totalPrice, setTotalPrice] = useState(data?.price * quantity || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useCustomToast();
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const inventoryError = inventoryErrors?.find(
    (error) => error.partid === data?.partid
  );

  const availableQuantity = inventoryError
    ? Number(inventoryError.org_qty)
    : null;
  const hasQuantityError =
    inventoryError && quantity > (availableQuantity || 0);

  const [{ data: updateCartData, isLoading: updateCartLoading }, updateCart] =
    UseApi({
      service: AddToCart,
      useAuth: true,
    });

  const [
    { data: deleteData, isLoading: deleteLoader, successMessage },
    deleteProduct,
  ] = UseApi({
    service: DeleteFromCart,
    useAuth: true,
  });

  const updateCartWithCurrentQuantity = () => {
    setIsUpdating(true);

    const formData = new FormData();
    formData.append("partid[]", data?.partid.toString());
    formData.append("quantity[]", quantity.toString());
    updateCart(formData)
      .then(() => {
        toast({
          type: "success",
          title: "Сагс шинэчлэгдлээ",
          description: "Бүтээгдэхүүний тоо хэмжээ шинэчлэгдлээ.",
        });
      })
      .catch((err) => {
        toast({
          type: "error",
          title: "Алдаа гарлаа",
          description: "Сагсыг шинэчлэхэд алдаа гарлаа.",
        });
      })
      .finally(() => {
        setIsUpdating(false);
      });
  };

  const handleDeleteProduct = () => {
    deleteProduct({ basketid: data?.userbasketid });
    setLocalProducts((prev) =>
      prev.filter((item) => item.userbasketid !== data?.userbasketid)
    );
    setAllTotal((prevTotal) => prevTotal - totalPrice);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(0, newQuantity);
    setQuantity(validQuantity);

    if (inventoryError && validQuantity <= (availableQuantity || 4)) {
      updateCartWithCurrentQuantity();
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseInt(e.target.value) || 0;
    handleQuantityChange(newValue);
  };

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 4) {
      handleQuantityChange(quantity - 1);
    }
  };

  useEffect(() => {
    const newTotalPrice = data?.price * quantity || 0;
    setAllTotal((prevTotal) => prevTotal - totalPrice + newTotalPrice);
    setTotalPrice(newTotalPrice);

    setLocalProducts((prev) =>
      prev.map((item) =>
        item.userbasketid === data?.userbasketid
          ? { ...item, quantity: quantity }
          : item
      )
    );
  }, [quantity, data?.price]);

  useEffect(() => {
    const initialPrice = data?.price * data?.quantity || 0;
    if (initialPrice > 0) {
      setAllTotal((prevTotal) => prevTotal + initialPrice);
    }

    return () => {
      setAllTotal((prevTotal) => prevTotal - totalPrice);
    };
  }, []);

  useEffect(() => {
    if (successMessage)
      toast({
        type: "success",
        title: "Амжилттай",
        description: successMessage || "",
      });
  }, [successMessage]);

  return (
    <HStack
      w="full"
      borderRadius={8}
      border={`1px solid ${hasQuantityError ? error600 : grey200}`}
      p={4}
      justify="space-between"
      position="relative"
    >
      {hasQuantityError && (
        <Tooltip
          label={`Үлдэгдэл хүрэлцэхгүй байна. Боломжит тоо: ${availableQuantity}`}
          placement="top"
        >
          <HStack
            position="absolute"
            top={2}
            right={2}
            bg={error600}
            color="white"
            p={1}
            borderRadius="md"
            fontSize="xs"
          >
            <IconAlertCircle size={14} />
            <Text fontSize="xs">Үлдэгдэл: {availableQuantity}</Text>
          </HStack>
        </Tooltip>
      )}

      <HStack gap={4}>
        <Image
          src={
            data?.images?.imgurl800 ||
            data?.images?.imgurl400 ||
            "/home/ridex.svg"
          }
          w={136}
          h={151}
          objectFit={"contain"}
        />
        <VStack gap={2} align="flex-start">
          <Image
            src={
              data?.brandlogo?.imgurl400 ||
              data?.brandlogo?.imgurl200 ||
              "/home/ridexlogo.svg"
            }
            w={78}
            h={6}
            objectFit={"contain"}
          />
          <Text variant="subtitle2">{data?.articleno}</Text>
          <Text variant="title1">
            {data?.brandname}
            {data?.partname}
          </Text>
          <HStack gap={1}>
            <Text variant="subtitle3">Article Number:</Text>
            <Text fontSize={14}>{data?.articleno}</Text>
          </HStack>
          <Text variant="subtitle3">
            Үндсэн үнэ:{formatCurrency(data?.price || 0)}
          </Text>
        </VStack>
      </HStack>
      <VStack justify="space-between" align="flex-end">
        <Button
          p={2}
          variant="filled"
          borderRadius="full"
          display={isStatic ? "none" : "flex"}
          onClick={handleDeleteProduct}
          isDisabled={updateCartLoading || isUpdating}
          isLoading={deleteLoader}
        >
          <IconTrash color={grey600} />
        </Button>

        <HStack
          p={1}
          borderRadius={16}
          bg={grey100}
          border={hasQuantityError ? `1px solid ${error600}` : "none"}
          display={isStatic ? "none" : "flex"}
        >
          <Stack
            p={1}
            borderRadius="full"
            bg="white"
            cursor="pointer"
            onClick={handleDecrement}
            opacity={updateCartLoading || isUpdating ? 0.5 : 1}
            pointerEvents={updateCartLoading || isUpdating ? "none" : "auto"}
          >
            <IconMinus color={primary} size={13} />
          </Stack>
          <Input
            value={quantity}
            onChange={handleInputChange}
            onBlur={() => {
              // Update cart when input loses focus if there's no error
              if (!hasQuantityError) {
                updateCartWithCurrentQuantity();
              }
            }}
            variant="ghost"
            maxW="30px"
            alignItems={"center"}
            textAlign="center"
            h={6}
            p={0}
            color={hasQuantityError ? error600 : "inherit"}
            isDisabled={updateCartLoading || isUpdating}
          />
          <Stack
            p={1}
            borderRadius="full"
            bg="white"
            cursor="pointer"
            onClick={handleIncrement}
            opacity={updateCartLoading || isUpdating ? 0.5 : 1}
            pointerEvents={updateCartLoading || isUpdating ? "none" : "auto"}
          >
            <IconPlus color={primary} size={13} />
          </Stack>
        </HStack>
        <Text
          display={isStatic ? "flex" : "none"}
          bg={grey100}
          borderRadius={16}
          variant="subtitle1"
          px={2}
        >
          {data?.quantity}ш
        </Text>
        <VStack gap={0} align="flex-end">
          <Text variant="h8">{formatCurrency(totalPrice)}</Text>
          <Text fontSize={12} fontWeight={500} color={grey700}>
            НӨАТ багтсан үнэ
          </Text>
          {(updateCartLoading || isUpdating) && (
            <Text fontSize="xs" color="blue.500">
              Шинэчилж байна...
            </Text>
          )}
        </VStack>
      </VStack>
    </HStack>
  );
};
