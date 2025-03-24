// import { UseApi } from "@/hooks/useApi";
// import { CheckForgotPassOtp } from "@/_services/auth/checkForgotPassOtp";
// import { CheckRegisterOtp } from "@/_services/auth/checkRegisterOtp";
// import { GetForgotPassOtp } from "@/_services/auth/getForgotPassOtp";
// import { Register } from "@/_services/auth/register";
import {
  Button,
  HStack,
  Input,
  SimpleGrid,
  Text,
  VStack,
} from "@chakra-ui/react";
import { SetStateAction, useEffect, useRef, useState } from "react";
// import Countdown, { CountdownRendererFn } from "react-countdown";
// import { useCustomToast } from "../global/useCustomToast";

type LoginFormProps = {
  onClose: () => void;
  setModal: (
    value: SetStateAction<"login" | "otp" | "pass" | "forgotPass">
  ) => void;
  modal: string;
  phonenumber: string;
  expire: string;
  otp: string;
};

export const OtpModal = (props: LoginFormProps) => {
  const { modal, setModal, onClose, phonenumber, expire, otp } = props;
  const [digits, setDigits] = useState(Array(6).fill(""));
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  //   const toast = useCustomToast();
  //   const [
  //     {
  //       data: getforgotPassData,
  //       isLoading: getforgotPassLoader,
  //       error: forgotPassError,
  //       successMessage,
  //     },
  //     getForgotPassOtp,
  //   ] = UseApi({
  //     service: GetForgotPassOtp,
  //   });
  //   const [
  //     {
  //       data: checkRegisterData,
  //       isLoading: checkRegisterLoader,
  //       error: checkRegisterErr,
  //     },
  //     checkRegisterOtp,
  //   ] = UseApi({
  //     service: CheckRegisterOtp,
  //   });

  //   const [
  //     {
  //       data: registerData,
  //       isLoading: registerLoader,
  //       error: registerError,
  //       successMessage: registerMessage,
  //     },
  //     register,
  //   ] = UseApi({
  //     service: Register,
  //   });

  //   const [
  //     {
  //       data: forgotPassData,
  //       isLoading: forgotPassLoader,
  //       error: checkforgotPassError,
  //       successMessage: forgotPassSuccessMessage,
  //     },
  //     checkForgotPassOtp,
  //   ] = UseApi({
  //     service: CheckForgotPassOtp,
  //   });

  const [targetTime, setTargettme] = useState(() => {
    return new Date().getTime() + 2 * 60 * 1000;
  });

  useEffect(() => {
    if (expire) {
      const expireTime = new Date(expire).getTime();
      if (!isNaN(expireTime)) {
        setTargettme(expireTime);
      }
    }
  }, [expire]);

  //   useEffect(() => {
  //     if (getforgotPassData) {
  //       toast({
  //         type: "success",
  //         title: "Амжилттай",
  //         description: successMessage,
  //       });
  //     } else if (registerData) {
  //       toast({
  //         type: "success",
  //         title: "Амжилттай",
  //         description: registerMessage,
  //       });
  //     }
  //   }, [getforgotPassData, registerData]);

  //   useEffect(() => {
  //     if (forgotPassError) {
  //       toast({
  //         type: "error",
  //         title: "Уучлаарай",
  //         description: forgotPassError,
  //       });
  //     } else if (registerError) {
  //       toast({
  //         type: "error",
  //         title: "Уучлаарай",
  //         description: registerError,
  //       });
  //     }
  //   }, [forgotPassError, registerError]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d?$/.test(value)) return;

    const newDigits = [...digits];
    newDigits[index] = value;
    setDigits(newDigits);

    if (value && index < 7) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    if (!digits || !phonenumber) {
      //   toast({
      //     type: "error",
      //     title: "Уучлаарай",
      //     description: "Утасны дугаар эсвэл код байхгүй байна.",
      //   });
      return;
    }

    const userotp = digits.join("").toString();

    // try {
    //   if (otp === "signup") {
    //     checkRegisterOtp({
    //       phone: phonenumber,
    //       otp: userotp,
    //     });
    //   } else if (otp === "forgotPass") {
    //     checkForgotPassOtp({
    //       phone: phonenumber,
    //       otp: userotp,
    //     });
    //   }

    //   // toast({
    //   //   type: "success",
    //   //   title: "Амжилттай",
    //   //   description: "Код амжилттай баталгаажлаа.",
    //   // });
    // } catch (error) {
    //   const errorMessage =
    //     error instanceof Error ? error.message : "Дахин оролдоно уу.";

    //   toast({
    //     type: "error",
    //     title: "Уучлаарай",
    //     description: errorMessage,
    //   });
    // }
  };

  //   const countdownRenderer: CountdownRendererFn = ({
  //     minutes,
  //     seconds,
  //     completed,
  //   }) => {
  //     if (completed) {
  //       //   setPayDisabled(true);
  //       // eslint-disable-next-line react/no-unescaped-entities
  //       return (
  //         <Text
  //           // alignSelf="flex-end"
  //           style={{ color: "#F75B00", fontWeight: 700 }}
  //         >
  //           00:00
  //         </Text>
  //       );
  //     } else {
  //       return (
  //         <HStack gap={0}>
  //           <span style={{ color: "#F75B00", fontWeight: 700 }}>
  //             {`( ${minutes}`} :{" "}
  //           </span>
  //           <span style={{ color: "#F75B00", fontWeight: 700 }}>
  //             {`${seconds} )`}{" "}
  //           </span>
  //         </HStack>
  //       );
  //     }
  //   };

  //   useEffect(() => {
  //     if (checkforgotPassError) {
  //       // console.log(checkforgotPassError);

  //       toast({
  //         type: "error",
  //         title: "Уучлаарай",
  //         description: checkforgotPassError,
  //       });
  //     } else if (checkRegisterErr) {
  //       toast({
  //         type: "error",
  //         title: "Уучлаарай",
  //         description: checkRegisterErr,
  //       });
  //     }
  //   }, [checkforgotPassError, checkRegisterErr]);

  //   useEffect(() => {
  //     if (forgotPassData) {
  //       toast({
  //         type: "success",
  //         title: "Амжилттай",
  //         description: forgotPassSuccessMessage,
  //       });
  //       setModal("pass");
  //     } else if (checkRegisterData) {
  //       toast({
  //         type: "success",
  //         title: "Амжилттай",
  //         description: checkRegisterData,
  //       });
  //       setModal("pass");
  //     }
  //   }, [forgotPassData, checkRegisterData]);
  return (
    <form
      style={{ width: "100%" }}
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <VStack w="full" gap={6} display={modal === "otp" ? "flex" : "none"}>
        <VStack alignSelf="center" textAlign="center" w="100%" gap={0} m={0}>
          <VStack gap={"10px"} w="full">
            <Text fontSize={24} fontWeight={700}>
              Нэг удаагийн код
            </Text>
          </VStack>
        </VStack>
        {/* <ModalCloseButton /> */}
        <VStack p={0} gap={6} w="full" mt={-6}>
          <SimpleGrid w="full" columns={6} spacing={{ base: 2, md: 4 }} p={5}>
            {digits.map((digit, index) => (
              // eslint-disable-next-line react/jsx-key
              <Input
                key={index}
                variant="unstyled"
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                textColor={"black"}
                textAlign="center"
                placeholder="-"
                bg={"#F1F2F3"}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                maxLength={1}
                fontWeight="bold"
                size="xl"
                fontSize={{ base: 14, md: 32 }}
                inputMode="numeric"
                onKeyDown={(e) => {
                  if (e.key === "Backspace" && !digits[index] && index > 0) {
                    inputRefs.current[index - 1]?.focus();
                  }
                }}
                width={"100%"}
                height={{ base: "40px", md: "80px" }}
              />
            ))}
          </SimpleGrid>
          <VStack>
            <Text>Нэг удаагийн код ирээгүй юү?</Text>
            <HStack justify="center">
              <Button
                variant={"ghost"}
                // onClick={() => {
                //   if (otp === "signup") {
                //     register({
                //       phone: phonenumber,
                //     });
                //   } else if (otp === "forgotPass") {
                //     getForgotPassOtp({
                //       phone: phonenumber,
                //     });
                //   }
                // }}
                fontWeight={700}
                w="fit-content"
                color="#F75B00"
              >
                Дахин илгээх{" "}
              </Button>
              {/* <Countdown
                date={targetTime}
                renderer={countdownRenderer}
                intervalDelay={0}
              /> */}
            </HStack>
          </VStack>
        </VStack>

        <Button
          variant={"solid"}
          // type="submit"
          //   isLoading={checkRegisterLoader || forgotPassLoader}
          width="full"
          colorScheme="teal"
          disabled={digits?.[5] === ""}
          onClick={handleSubmit}
        >
          Илгээх
        </Button>
      </VStack>
    </form>
  );
};
