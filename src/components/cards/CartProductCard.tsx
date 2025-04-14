"use client";
import { AddToCart, DeleteFromCart } from "@/_services/user";
import { UseApi, useCustomToast } from "@/hooks";
import { removeCart } from "@/redux/slices/cartSlice";
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
  Checkbox,
} from "@chakra-ui/react";
import {
  IconAlertCircle,
  IconMinus,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useRef,
  MouseEvent,
} from "react";
import { useDispatch } from "react-redux";

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
  isAddressCard?: boolean;
}

export const CartProductCard = ({
  isStatic,
  data,
  setLocalProducts,
  setAllTotal,
  isAddressCard,
  inventoryErrors = [],
}: CartProductCardProps) => {
  const [quantity, setQuantity] = useState(data?.quantity || 0);
  const [totalPrice, setTotalPrice] = useState(data?.price * quantity || 0);
  const [isUpdating, setIsUpdating] = useState(false);
  const toast = useCustomToast();
  const dispatch = useDispatch();
  const updateTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const inventoryError = inventoryErrors?.find(
    (error) => error.partid === data?.partid
  );

  const availableQuantity = inventoryError
    ? Number(inventoryError.org_qty)
    : null;
  const hasQuantityError =
    inventoryError && quantity > (availableQuantity || 0);

  const [
    { data: deleteData, isLoading: deleteLoader, successMessage },
    deleteProduct,
  ] = UseApi({
    service: DeleteFromCart,
    useAuth: true,
  });

  const handleDeleteProduct = (
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    deleteProduct({ basketid: data?.userbasketid });
    setLocalProducts((prev) =>
      prev.filter((item) => item.userbasketid !== data?.userbasketid)
    );
    setAllTotal((prevTotal) => prevTotal - totalPrice);
  };

  const handleQuantityChange = (newQuantity: number) => {
    const validQuantity = Math.max(0, newQuantity);
    setQuantity(validQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const newValue = parseInt(e.target.value) || 0;
    handleQuantityChange(newValue);
  };

  const handleIncrement = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
    handleQuantityChange(quantity + 1);
  };

  const handleDecrement = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>
  ) => {
    e.preventDefault();
    e.stopPropagation();
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
    dispatch(removeCart(data?.articleid));
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
          <Text variant="title2">
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
      <Stack
        justify="space-between"
        w="40%"
        align={isStatic ? "flex-end" : "center"}
        flexDir={isStatic ? "column" : "row"}
      >
        <VStack align="flex-start" gap={6}>
          <HStack
            flexDir={isStatic ? "column" : "row"}
            align={isStatic ? "flex-end" : "center"}
          >
            <HStack
              borderRadius={16}
              p="0px 6px"
              bg={grey100}
              border={hasQuantityError ? `1px solid ${error600}` : "none"}
              display={isStatic || isAddressCard ? "none" : "flex"}
              h="22px"
            >
              <Stack
                p={1}
                borderRadius="full"
                bg="white"
                cursor="pointer"
                onClick={handleDecrement}
              >
                <IconMinus color={primary} size={10} />
              </Stack>
              <Input
                value={quantity}
                onChange={handleInputChange}
                variant="ghost"
                maxW="26px"
                alignItems={"center"}
                textAlign="center"
                h={"22px"}
                fontSize={14}
                p={0}
                color={hasQuantityError ? error600 : "inherit"}
              />
              <Stack
                p={1}
                borderRadius="full"
                bg="white"
                cursor="pointer"
                onClick={handleIncrement}
              >
                <IconPlus color={primary} size={10} />
              </Stack>
            </HStack>
            <Text
              display={isStatic || isAddressCard ? "flex" : "none"}
              bg={grey100}
              borderRadius={16}
              variant={isAddressCard ? "subtitle2" : "subtitle1"}
              px={2}
            >
              {data?.quantity}ш
            </Text>
            <VStack gap={0} align="flex-end">
              <Text variant="title1">{formatCurrency(totalPrice)}</Text>
              <Text
                fontSize={12}
                color={grey700}
                display={isStatic ? "flex" : "none"}
              >
                НӨАТ багтсан үнэ
              </Text>
            </VStack>
          </HStack>
          {data?.miss_quantity && (
            <HStack display={isStatic ? "none" : "flex"}>
              <Checkbox w={4} h={4} />
              <Text fontSize={12}>Дараа захиалах</Text>
              <Text
                bg={grey100}
                borderRadius={16}
                p="0px 8px"
                variant="subtitle2"
              >
                {data?.miss_quantity} ш
              </Text>
            </HStack>
          )}
        </VStack>
        <Button
          p="6px"
          variant="filled"
          borderRadius="full"
          display={isStatic ? "none" : "flex"}
          onClick={handleDeleteProduct}
          isDisabled={isUpdating}
          // onClick={(e)=>{}}
          isLoading={deleteLoader}
          w={8}
          h={8}
        >
          <IconTrash color={grey600} size={20} />
        </Button>
      </Stack>
    </HStack>
  );
};
