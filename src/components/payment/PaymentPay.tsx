"use client";
import {
  Divider,
  HStack,
  Image,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { IconArrowRight } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
// import Image from "next/image";

import { CapitronBank, QpayIcon } from "@/icons";
import { grey200 } from "@/theme/colors";
import { StorePayModal } from "./StorePay";
// import { StorePayModal } from "./StorePayModal";
// import { useAppSelector } from "@/hooks/hooks";
// import { PockeyZeroModal } from "./PocketZeroModal";
// import { Key, useEffect } from "react";
// import { UseApi } from "@/hooks/useApi";
// import { CheckPayment } from "@/services/createOrder/checkPayment";
// import { useRouter } from "next/navigation";
// import { setOrderData } from "@/redux/slices/orderDataSlice";
// import { useDispatch } from "react-redux";
// import { removeFromCart } from "@/redux/slices/cartSlice";
// import { OrderData, Split } from "../../../types";
// import { QpayModal } from "./QpayModal";
// import { BankInfoModal } from "./BankInfoModal";
// import { setPaymentid } from "@/redux/slices/paymentSlice";
// import { GetPocketQr } from "@/services/createOrder/getPocketQr";
// import { CheckPocket } from "@/services/createOrder/checkPocket";
// import { CheckStorePay } from "@/services/createOrder/checkStorePay";

export const PaymentPay = () => {
  const router = useRouter();
  //   const dispatch = useDispatch();

  //   const {
  //     isOpen: PocketIsOpen,
  //     onClose: PocketOnClose,
  //     onOpen: PocketOnOpen,
  //   } = useDisclosure();
  const {
    isOpen: storepayIsOpen,
    onClose: storepayOnClose,
    onOpen: storepayOnOpen,
  } = useDisclosure();
  //   const {
  //     isOpen: qpayIsOpen,
  //     onClose: qpayOnClose,
  //     onOpen: qpayOnOpen,
  //   } = useDisclosure();
  //   const {
  //     isOpen: bankIsOpen,
  //     onClose: bankOnClose,
  //     onOpen: bankOnOpen,
  //   } = useDisclosure();
  //   const paymentData = useAppSelector((state) => state.payment.paymentData);
  //   const paymentid = useAppSelector((state) => state.payment.paymentid);
  //   const orderData = useAppSelector((state) => state.order.orderData);
  //   const [{ data, isLoading, error }, fetch] = UseApi({
  //     service: CheckPayment,
  //     useAuth: true,
  //   });

  //   const [
  //     { data: pocketqr, isLoading: pocketLoading, error: pocketError },
  //     getPocketQr,
  //   ] = UseApi({
  //     service: GetPocketQr,
  //     useAuth: true,
  //   });

  //   const [
  //     { data: pocketSuccess, isLoading: loader, error: checkerr },
  //     checkPocket,
  //   ] = UseApi({
  //     service: CheckPocket,
  //     useAuth: true,
  //   });

  //   const [
  //     { data: storePaySuccess, isLoading: storePayLoader, error: storepayErr },
  //     checkStorePay,
  //   ] = UseApi({
  //     service: CheckStorePay,
  //     useAuth: true,
  //   });

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (paymentData?.orderid && paymentid) {
  //       checkStorePay({
  //         orderid: paymentData?.orderid,
  //         invoiceid: paymentData?.applications?.qpay?.invoice_id,
  //         paymentid: paymentid,
  //       });
  //     }
  //   }, 2000);

  //   return () => clearInterval(interval);
  // }, [paymentData, paymentid]);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (paymentData?.orderid && paymentid) {
  //         fetch({
  //           orderid: paymentData?.orderid,
  //           invoiceid: paymentData?.applications?.qpay?.invoice_id,
  //           paymentid: paymentid,
  //         });
  //       }
  //     }, 2000);

  //     return () => clearInterval(interval);
  //   }, [paymentData]);

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       if (pocketqr) {
  //         checkPocket({
  //           orderid: paymentData?.orderid,
  //           invoiceid: pocketqr?.invoice_id,
  //           paymentid: pocketqr?.paymentid,
  //         });
  //       }
  //     }, 2000);

  //     return () => clearInterval(interval);
  //   }, [pocketqr]);

  //   useEffect(() => {
  //     if (data) {
  //       router.push(`/payment/success`);

  //       data.details.map((e: any) => {
  //         dispatch(
  //           removeFromCart({
  //             partid: e.part.partid,
  //             shippingMethod: e.ordertype,
  //           })
  //         );
  //       });

  //       dispatch(setOrderData(data));
  //     }
  //   }, [data]);

  //   useEffect(() => {
  //     if (pocketSuccess) {
  //       router.push(`/payment/success`);

  //       pocketSuccess?.details?.map((e: any) => {
  //         dispatch(
  //           removeFromCart({
  //             partid: e?.part?.partid,
  //             shippingMethod: e?.ordertype,
  //           })
  //         );
  //       });

  //       dispatch(setOrderData(pocketSuccess));
  //     }
  //   }, [pocketSuccess]);

  return (
    <VStack
      w="45%"
      bg="white"
      borderRadius={8}
      p={6}
      gap={6}
      justifySelf="center"
      border={`1px solid ${grey200}`}
    >
      <VStack gap={2}>
        <Text fontSize={20} fontWeight={700}>
          Төлбөр төлөх
        </Text>
        <Text maxW={292} textAlign="center">
          Та доорх төлбөрийн нөхцөлүүдээс сонгон төлбөрөө төлнө үү
        </Text>
      </VStack>
      <VStack gap={4} w="full">
        {/* <HStack
            p="8px 16px"
            borderRadius={8}
            border="1px solid #F2F4F7"
            bg="#F9FAFB"
            w="full"
            justify="space-between"
          >
            <HStack gap={2}>
              <SocialPay />
              <Text fontSize={16} fontWeight={700}>
                Голомт Банк SocialPay
              </Text>
            </HStack>
            <RightArrow color="#1E1E1E" w="24" h="24" />
          </HStack> */}
        <HStack
          p="8px 16px"
          borderRadius={8}
          border="1px solid #F2F4F7"
          bg="#F9FAFB"
          w="full"
          justify="space-between"
          //   onClick={() => {
          //     bankOnOpen();
          //     dispatch(setPaymentid(paymentData?.transfers?.paymentid || 3));
          //   }}
        >
          <HStack gap={2} onClick={storepayOnOpen}>
            <CapitronBank />
            <Text fontSize={16} fontWeight={700}>
              Дансаар шилжүүлэх
            </Text>
          </HStack>
          <IconArrowRight color="#1E1E1E" size={24} />
          {/* <BankInfoModal isOpen={bankIsOpen} onClose={bankOnClose} /> */}
        </HStack>
        <HStack
          p="8px 16px"
          borderRadius={8}
          border="1px solid #F2F4F7"
          bg="#F9FAFB"
          w="full"
          justify="space-between"
          //   onClick={() => {
          //     qpayOnOpen();
          //     dispatch(setPaymentid(paymentData?.applications?.paymentid || 4));
          //   }}
        >
          <HStack gap={2}>
            <QpayIcon />
            <Text fontSize={16} fontWeight={700}>
              QPay
            </Text>
          </HStack>
          <IconArrowRight color="#1E1E1E" size={24} />
          {/* <QpayModal isOpen={qpayIsOpen} onClose={qpayOnClose} /> */}
        </HStack>
      </VStack>
      {/* {paymentData?.splits !== null ? (
        paymentData?.splits?.length || 0 > 0 ? (
          <VStack gap={6} w="full">
            <HStack gap={4} w="full">
              <Divider w="full" />
              <Text w="142px" fontSize={14} color="#475467" whiteSpace="nowrap">
                Хувааж төлөх нөхцөл
              </Text>
              <Divider />
            </HStack>
            <VStack gap={4} w="full">
              {paymentData?.splits?.map(
                (e: Split, index: Key | null | undefined) => (
                  <HStack
                    key={index}
                    p="8px 16px"
                    borderRadius={8}
                    border="1px solid #F2F4F7"
                    bg="#F9FAFB"
                    w="full"
                    justify="space-between"
                    onClick={() => {
                      if (e.name == "STORE PAY") {
                        storepayOnOpen();
                      } else {
                        getPocketQr({
                          orderid: paymentData?.orderid,
                        });
                        PocketOnOpen();
                      }
                    }}
                  >
                    <HStack gap={2}>
                      <StorePay />
                      <Image
                        src={e.icon ?? ""}
                        alt={e.name ?? ""}
                        width={"40px"}
                        height={"40px"}
                        borderRadius={8}
                      />

                      <Text fontWeight={600} color="#1E1E1E" lineHeight="22px">
                        {e.name}
                      </Text>
                    </HStack>
                    <RightArrow color="#1E1E1E" w="24" h="24" />
                    <StorePayModal
                      orderid={orderData?.orderid.toString() ?? ""}
                      isOpen={storepayIsOpen}
                      paymentid={
                        paymentData?.splits?.[0]?.paymentid?.toString() ?? ""
                      }
                      onClose={storepayOnClose}
                    />
                    {pocketLoading ? null : (
                      <PockeyZeroModal
                        isOpen={PocketIsOpen}
                        onClose={PocketOnClose}
                        total={orderData?.alltotal!}
                        qrcode={pocketqr?.qrcode ?? ""}
                      />
                    )}
                  </HStack>
                )
              )}
            </VStack>
          </VStack>
        ) : (
          <VStack>
            <Text textAlign="center" fontSize={14}>
              Та 100,000 ₮ - с дээш худалдан авалтад Storepay болон PocketZero
              ашиглан хуваан төлөх боломжтой.
            </Text>
          </VStack>
        )
      ) : null} */}
      <StorePayModal
        isOpen={storepayIsOpen}
        onClose={storepayOnClose}
        paymentid="98"
        orderid="1"
      />
    </VStack>
  );
};
