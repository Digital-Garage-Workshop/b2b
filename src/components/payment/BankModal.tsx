import {
  Button,
  HStack,
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
//   import { formatCurrency } from "@/utils/number_formation";
//   import { useAppSelector } from "@/hooks/hooks";
import { CapitronBank } from "@/icons";
//   import { useCustomToast } from "@/hooks/useCustomToast";
//   import { CopyIcon } from "@chakra-ui/icons";
//   import { UseApi } from "@/hooks/useApi";
//   import { removeFromCart } from "@/redux/slices/cartSlice";
//   import { setOrderData } from "@/redux/slices/orderDataSlice";
//   import { CheckPayment } from "@/services/createOrder/checkPayment";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconCopy, IconInfoCircle } from "@tabler/icons-react";
import { formatCurrency } from "@/utils";
import { useCustomToast } from "@/hooks";
//   import { useDispatch } from "react-redux";
//   import { CheckTransferByBank } from "@/services/createOrder/checkTransferByBank";

export const BankInfoModal = (props: {
  isOpen: boolean;
  onClose: () => void;
  data: any;
}) => {
  const { isOpen, onClose, data } = props;
  // const paymentData = useAppSelector((state) => state.payment.paymentData);
  // const orderData = useAppSelector((state) => state.order.orderData);
  // const paymentid = useAppSelector((state) => state.payment.paymentid);
  // const router = useRouter();
  const showToast = useCustomToast();
  // const dispatch = useDispatch();

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast({
        type: "success",
        title: "Амжилттай хуулагдлаа!",
        description: "",
      });
    });
  };

  // const [{ data, isLoading, error }, fetch] = UseApi({
  //   service: CheckTransferByBank,
  //   useAuth: true,
  // });

  // const check = () => {
  //   if (paymentData?.orderid) {
  //     fetch({
  //       orderid: paymentData?.orderid,
  //       invoiceid: paymentData?.transfers?.description,
  //       paymentid: paymentid,
  //     });
  //   }
  // };

  // useEffect(() => {
  //   if (data) {
  //     router.push(`/payment/success`);

  //     data.details.map((e: any) => {
  //       dispatch(
  //         removeFromCart({
  //           partid: e.part.partid,
  //           shippingMethod: e.ordertype,
  //         })
  //       );
  //     });

  //     dispatch(setOrderData(data));
  //   }
  // }, [data]);

  // useEffect(() => {
  //   if (error)
  //     showToast({
  //       type: "error",
  //       description: error || "Таны төлбөр төлөгдөөгүй байна.",
  //       title: "Алдаа",
  //     });
  // }, [error]);

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={488} mx={4}>
        <ModalCloseButton />
        <VStack
          w="100%"
          bg="white"
          p={8}
          borderRadius={8}
          align="center"
          gap={6}
        >
          <VStack gap={2}>
            <Text fontSize={20} fontWeight={700}>
              Дансаар шилжүүлэх
            </Text>
            <Text fontSize={16}>Та гүйлгээний утгаа зөв оруулна уу.</Text>
          </VStack>
          <HStack
            p=" 8px 16px"
            bg="#F2F4F7"
            align="center"
            justify="center"
            gap={2}
            w="full"
            borderRadius={8}
          >
            <CapitronBank w="24" h="24" />
            <Text>{data?.bankname}</Text>
          </HStack>

          <VStack gap={4} w="full">
            <VStack gap={1.5} w="full" align="flex-start">
              <Text fontSize={14} fontWeight={600}>
                Хүлээн авах данс
              </Text>
              <HStack
                w="full"
                p="10px 14px"
                justify={"space-between"}
                border="1px solid #D0D5DD"
                borderRadius={8}
              >
                <Text>{data?.accountnumber}</Text>
                <IconCopy
                  onClick={() => copyToClipboard(data?.accountnumber)}
                  cursor="pointer"
                />
              </HStack>
            </VStack>
            <VStack gap={1.5} w="full" align="flex-start">
              <Text fontSize={14} fontWeight={600}>
                Хүлээн авагч
              </Text>
              <HStack
                w="full"
                p="10px 14px"
                justify={"space-between"}
                border="1px solid #D0D5DD"
                borderRadius={8}
              >
                <Text>{data?.accountname}</Text>
                <IconCopy
                  onClick={() => copyToClipboard(data?.accountname)}
                  cursor="pointer"
                />
              </HStack>
            </VStack>
            <VStack gap={1.5} w="full" align="flex-start">
              <Text fontSize={14} fontWeight={600}>
                Захиалгын дүн
              </Text>
              <HStack
                w="full"
                p="10px 14px"
                justify={"space-between"}
                border="1px solid #D0D5DD"
                borderRadius={8}
              >
                <Text>
                  {formatCurrency(
                    // orderData?.paidtotal ||
                    0
                  )}
                </Text>
                <IconCopy
                  onClick={() =>
                    copyToClipboard(
                      // orderData?.paidtotal?.toString() ||
                      "0"
                    )
                  }
                  cursor="pointer"
                />
              </HStack>
            </VStack>
            <VStack gap={1.5} w="full" align="flex-start">
              <Text fontSize={14} fontWeight={600}>
                Гүйлгээний утга
              </Text>
              <HStack
                w="full"
                p="10px 14px"
                justify={"space-between"}
                border="1px solid #D0D5DD"
                borderRadius={8}
              >
                <Text>{data?.invoiceid}</Text>
                <IconCopy
                  onClick={() => copyToClipboard(data?.invoiceid)}
                  cursor="pointer"
                />
              </HStack>
            </VStack>
          </VStack>
          <Button
          //   onClick={check} isLoading={isLoading}
          >
            Төлбөр шалгах
          </Button>
          <HStack
            w="full"
            bg="#FFFCF5"
            borderRadius={8}
            gap={2}
            p="10px"
            align="flex-start"
          >
            <IconInfoCircle color="#DC6803" size={24} />
            <Text color="#DC6803" maxW={{ base: "300px", md: "370px" }}>
              {`  Төлбөр төлөгдсөний дараа таны захиалга идэвхэждэг болохыг
                анхаараарай! Төлбөрийг дээрх дансанд шилжүүлэх ба
                захиалгын ${data?.invoiceid} дугаарыг гүйлгээний утга дээр бичнэ үү.`}
            </Text>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
