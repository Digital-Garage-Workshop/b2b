import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { SetStateAction, useEffect, useMemo, useState } from "react";
import * as Yup from "yup";
// import { signIn } from "next-auth/react";
import { IconCheck } from "@tabler/icons-react";
// import { useCustomToast } from "../global/useCustomToast";

type LoginFormProps = {
  onClose: () => void;
  setModal: (
    value: SetStateAction<"login" | "otp" | "pass" | "forgotPass">
  ) => void;
  modal: string;
  phonenumber: string;
  otp: string;
};

interface FormValues {
  password: string;
  repass: string;
  // termsAccepted: boolean;
  // privacyAccepted: boolean;
}

export const PasswordModal = (props: LoginFormProps) => {
  const { onClose, modal, phonenumber, otp } = props;
  const [isLoading, setIsLoading] = useState(false);
  //   const toast = useCustomToast();

  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    passwordsMatch: false,
  });

  const validationSchema = useMemo(() => {
    return Yup.object({
      password: Yup.string()
        .min(8, "Нууц үг хамгийн багадаа 8 тэмдэгттэй байна")
        .matches(/[A-Z]/, "Нэг том үсэг оруулна уу")
        .matches(/[a-z]/, "Нэг жижиг үсэг оруулна уу")
        .matches(/\d/, "Нэг тоо оруулна уу")
        .required("Нууц үгээ заавал оруулна уу!"),
      repass: Yup.string()
        .oneOf([Yup.ref("password")], "Нууц үгнүүд таарахгүй байна")
        .required("Нууц үгээ давтан оруулна уу!"),
    });
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      password: "",
      repass: "",
      // termsAccepted: false,
      // privacyAccepted: false,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      //   setIsLoading(true);
      //   try {
      //     if (otp === "signup") {
      //       const result = await signIn("signUp", {
      //         email: phonenumber,
      //         password: values.password,
      //         redirect: false,
      //       });
      //       if (result?.error) throw new Error(result.error);
      //       toast({
      //         type: "success",
      //         title: "Амжилттай!",
      //         description: "Та амжилттай нэвтэрлээ.",
      //       });
      //       onClose?.();
      //     } else if (otp === "forgotPass") {
      //       const result = await signIn("changePass", {
      //         email: phonenumber,
      //         password: values.password,
      //         confirm_password: values.repass,
      //         redirect: false,
      //       });
      //       if (result?.error) throw new Error(result.error);
      //       toast({
      //         type: "success",
      //         title: "Амжилттай!",
      //         description: "Та амжилттай нэвтэрлээ.",
      //       });
      //       onClose?.();
      //     }
      //   } catch (error) {
      //     toast({
      //       type: "error",
      //       title: "Уучлаарай",
      //       description: "Алдаа гарлаа.",
      //     });
      //   } finally {
      //     setIsLoading(false);
      //   }
    },
  });

  const ValidationCheck = ({
    isValid,
    text,
  }: {
    isValid: boolean;
    text: string;
  }) => (
    <HStack gap={2} w="full">
      <IconCheck color={isValid ? "#F75B00" : "#475467"} />
      <Text color={isValid ? "#F75B00" : "#475467"} fontSize={14}>
        {text}
      </Text>
    </HStack>
  );

  useEffect(() => {
    const newValidations = {
      minLength: formik.values.password.length >= 8,
      hasUpperCase: /[A-Z]/.test(formik.values.password),
      hasLowerCase: /[a-z]/.test(formik.values.password),
      hasNumber: /\d/.test(formik.values.password),
      passwordsMatch:
        formik.values.password === formik.values.repass &&
        formik.values.password !== "",
    };
    setValidations(newValidations);
  }, [formik.values.password, formik.values.repass]);

  const isSubmitDisabled =
    !validations.minLength ||
    !validations.hasUpperCase ||
    !validations.hasLowerCase ||
    !validations.hasNumber ||
    !validations.passwordsMatch;
  // ||
  // !formik.values.termsAccepted ||
  // !formik.values.privacyAccepted;

  return (
    <form
      style={{
        width: "100%",
      }}
      onSubmit={formik.handleSubmit}
    >
      <VStack
        w="full"
        gap={6}
        display={modal === "pass" ? "flex" : "none"}
        p={6}
      >
        <VStack
          alignSelf="center"
          textAlign="center"
          w="100%"
          gap={0}
          m={0}
          mt={-6}
        >
          <VStack gap={"10px"} w="full">
            <Text fontSize={24} fontWeight={700}>
              Нууц үг үүсгэх
            </Text>
          </VStack>
        </VStack>
        {/* <ModalCloseButton /> */}
        <VStack p={0} gap={6} w="full">
          <VStack gap={4} w="full">
            <FormControl
              isInvalid={formik.touched.password && !!formik.errors.password}
            >
              <FormLabel fontSize={14} fontWeight={600}>
                Нууц үг үүсгэх
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.6665 9.16667V5.83333C6.6665 4.94928 7.01769 4.10143 7.64281 3.47631C8.26794 2.85119 9.11578 2.5 9.99984 2.5C10.8839 2.5 11.7317 2.85119 12.3569 3.47631C12.982 4.10143 13.3332 4.94928 13.3332 5.83333V9.16667M4.1665 10.8333C4.1665 10.3913 4.3421 9.96738 4.65466 9.65482C4.96722 9.34226 5.39114 9.16667 5.83317 9.16667H14.1665C14.6085 9.16667 15.0325 9.34226 15.345 9.65482C15.6576 9.96738 15.8332 10.3913 15.8332 10.8333V15.8333C15.8332 16.2754 15.6576 16.6993 15.345 17.0118C15.0325 17.3244 14.6085 17.5 14.1665 17.5H5.83317C5.39114 17.5 4.96722 17.3244 4.65466 17.0118C4.3421 16.6993 4.1665 16.2754 4.1665 15.8333V10.8333ZM9.1665 13.3333C9.1665 13.5543 9.2543 13.7663 9.41058 13.9226C9.56686 14.0789 9.77882 14.1667 9.99984 14.1667C10.2209 14.1667 10.4328 14.0789 10.5891 13.9226C10.7454 13.7663 10.8332 13.5543 10.8332 13.3333C10.8332 13.1123 10.7454 12.9004 10.5891 12.7441C10.4328 12.5878 10.2209 12.5 9.99984 12.5C9.77882 12.5 9.56686 12.5878 9.41058 12.7441C9.2543 12.9004 9.1665 13.1123 9.1665 13.3333Z"
                      stroke="#667085"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </InputLeftElement>
                <Input
                  name="password"
                  value={formik.values.password}
                  placeholder="********"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  pl={10}
                />
              </InputGroup>
              {formik.touched.password && formik.errors.password && (
                <FormHelperText color="#D72C0D">
                  {formik.errors.password}
                </FormHelperText>
              )}
            </FormControl>
            <FormControl
              isInvalid={formik.touched.repass && !!formik.errors.repass}
            >
              <FormLabel fontSize={14} fontWeight={600}>
                Нууц үг давтах
              </FormLabel>
              <InputGroup>
                <InputLeftElement>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                  >
                    <path
                      d="M6.6665 9.16667V5.83333C6.6665 4.94928 7.01769 4.10143 7.64281 3.47631C8.26794 2.85119 9.11578 2.5 9.99984 2.5C10.8839 2.5 11.7317 2.85119 12.3569 3.47631C12.982 4.10143 13.3332 4.94928 13.3332 5.83333V9.16667M4.1665 10.8333C4.1665 10.3913 4.3421 9.96738 4.65466 9.65482C4.96722 9.34226 5.39114 9.16667 5.83317 9.16667H14.1665C14.6085 9.16667 15.0325 9.34226 15.345 9.65482C15.6576 9.96738 15.8332 10.3913 15.8332 10.8333V15.8333C15.8332 16.2754 15.6576 16.6993 15.345 17.0118C15.0325 17.3244 14.6085 17.5 14.1665 17.5H5.83317C5.39114 17.5 4.96722 17.3244 4.65466 17.0118C4.3421 16.6993 4.1665 16.2754 4.1665 15.8333V10.8333ZM9.1665 13.3333C9.1665 13.5543 9.2543 13.7663 9.41058 13.9226C9.56686 14.0789 9.77882 14.1667 9.99984 14.1667C10.2209 14.1667 10.4328 14.0789 10.5891 13.9226C10.7454 13.7663 10.8332 13.5543 10.8332 13.3333C10.8332 13.1123 10.7454 12.9004 10.5891 12.7441C10.4328 12.5878 10.2209 12.5 9.99984 12.5C9.77882 12.5 9.56686 12.5878 9.41058 12.7441C9.2543 12.9004 9.1665 13.1123 9.1665 13.3333Z"
                      stroke="#667085"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </InputLeftElement>
                <Input
                  name="repass"
                  value={formik.values.repass}
                  placeholder="********"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="password"
                  pl={10}
                />
              </InputGroup>
              {formik.touched.repass && formik.errors.repass && (
                <FormHelperText color="#D72C0D">
                  {formik.errors.repass}
                </FormHelperText>
              )}
            </FormControl>
            <VStack gap={2} w="full">
              <ValidationCheck
                text="Багадаа 8 тэмдэгт урттай"
                isValid={validations.minLength}
              />
              <ValidationCheck
                text="Нэг том үсэг"
                isValid={validations.hasUpperCase}
              />
              <ValidationCheck
                text="Нэг жижиг үсэг"
                isValid={validations.hasLowerCase}
              />
              <ValidationCheck
                text="Нэг тоо агуулах"
                isValid={validations.hasNumber}
              />
              <ValidationCheck
                text="Нууц үгнүүд таарч байна"
                isValid={validations.passwordsMatch}
              />
            </VStack>
            {/* <HStack gap={4} w="full" align="flex-start">
                <Checkbox
                  name="termsAccepted"
                  isChecked={formik.values.termsAccepted}
                  onChange={formik.handleChange}
                />
                <Text color="#475467" fontSize={14}>
                  Би{" "}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <Link target="_blank" href="/terms-and-condition">
                      Үйлчилгээний нөхцөлтэй{" "}
                    </Link>
                  </span>
                  танилцаж, хүлээн зөвшөөрсөн.
                </Text>
              </HStack>
              <HStack gap={4} w="full">
                <Checkbox
                  name="privacyAccepted"
                  isChecked={formik.values.privacyAccepted}
                  onChange={formik.handleChange}
                />
                <Text color="#475467" fontSize={14}>
                  Би{" "}
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <Link target="_blank" href="/privacy-and-policy">
                      Нууцлалын бодлогыг{" "}
                    </Link>
                  </span>{" "}
                  танилцаж, хүлээн зөвшөөрсөн.
                </Text>
              </HStack> */}
          </VStack>
        </VStack>
        <VStack gap={4} w="full" mt={2}>
          <Button
            variant={"solid"}
            type="submit"
            isLoading={isLoading}
            width="full"
            colorScheme="teal"
            isDisabled={isSubmitDisabled}
          >
            {modal !== "signup" ? "Нэвтрэх" : "Бүртгүүлэх"}
          </Button>
        </VStack>
      </VStack>
    </form>
  );
};
