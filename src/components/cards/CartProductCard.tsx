"use client";
import { DeleteFromCart } from "@/_services/user";
import { UseApi } from "@/hooks";
import { grey100, grey200, grey600, grey700, primary } from "@/theme/colors";
import { formatCurrency } from "@/utils";
import {
  Button,
  HStack,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus, IconTrash } from "@tabler/icons-react";
import { useState, useEffect, Dispatch, SetStateAction } from "react";

export const CartProductCard = (props: {
  isStatic?: boolean;
  data: any;
  setLocalProducts: (value: any) => void;
  setAllTotal: Dispatch<SetStateAction<number>>;
}) => {
  const { isStatic, data, setLocalProducts, setAllTotal } = props;
  const [quantity, setQuantity] = useState(data?.quantity || 0);
  const [totalPrice, setTotalPrice] = useState(data?.price * quantity || 0);

  const [
    { data: deleteData, isLoading: DeleteLoader, errData },
    deleteProduct,
  ] = UseApi({
    service: DeleteFromCart,
    useAuth: true,
  });

  const handleDeleteProduct = () => {
    setAllTotal((prevTotal: any) => prevTotal - totalPrice);

    deleteProduct({ basketid: data?.userbasketid });
    setLocalProducts((prev: any) =>
      prev.filter((item: any) => item.userbasketid !== data?.userbasketid)
    );
  };

  useEffect(() => {
    const newTotalPrice = data?.price * quantity || 0;

    setAllTotal((prevTotal) => prevTotal - totalPrice + newTotalPrice);

    setTotalPrice(newTotalPrice);

    setLocalProducts((prev: any) =>
      prev.map((item: any) =>
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

  return (
    <HStack
      w="full"
      borderRadius={8}
      border={`1px solid ${grey200}`}
      p={4}
      justify="space-between"
    >
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
          <Text variant="subtitle2">{data?.articleid}</Text>
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
        >
          <IconTrash color={grey600} />
        </Button>

        <HStack p={1} borderRadius={16} bg={grey100}>
          <Stack
            p={1}
            borderRadius="full"
            bg="white"
            cursor="pointer"
            onClick={() => {
              if (quantity > 0) setQuantity((prev: any) => prev - 1);
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
            onClick={() => setQuantity((prev: any) => prev + 1)}
          >
            <IconPlus color={primary} size={13} />
          </Stack>
        </HStack>
        <VStack gap={0} align="flex-end">
          <Text variant="h8">{formatCurrency(totalPrice)}</Text>
          <Text fontSize={12} fontWeight={500} color={grey700}>
            НӨАТ багтсан үнэ
          </Text>
        </VStack>
      </VStack>
    </HStack>
  );
};
