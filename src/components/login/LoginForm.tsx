import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { Dispatch, SetStateAction, useMemo, useState } from "react";
import * as Yup from "yup";
import Link from "next/link";
import { IconEye, IconEyeOff } from "@tabler/icons-react";
import { signIn, useSession } from "next-auth/react";
import { useCustomToast } from "@/hooks";

type ModalType = "login" | "otp" | "pass" | "forgotPass";
type OtpType = "signup" | "forgotPass";

type LoginFormProps = {
  onClose: () => void;
  setModal: Dispatch<SetStateAction<ModalType>>;
  setOtp: Dispatch<SetStateAction<OtpType>>;
  modal: ModalType;
  setPhone: Dispatch<SetStateAction<string>>;
  setExpire: Dispatch<SetStateAction<string>>;
};

interface FormValues {
  email: string;
  password: string;
  phonenumber: string;
  termsAccepted: boolean;
  privacyAccepted: boolean;
}

export const LoginForm = (props: LoginFormProps) => {
  const { onClose, setModal, modal, setPhone, setExpire, setOtp } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const toast = useCustomToast();
  const { data: session, update } = useSession();

  const validationSchema = useMemo(() => {
    if (modal === "forgotPass") {
      return Yup.object({
        phonenumber: Yup.string().required(
          "Утасны дугаараа заавал оруулна уу!"
        ),
        email: Yup.string().notRequired(),
        password: Yup.string()
          .min(6, "Нууц үг хамгийн багадаа 8 тэмдэгттэй байна")
          .notRequired(),
      });
    } else {
      return Yup.object({
        email: Yup.string().email().required("Имэйл хаягаа заавал оруулна уу!"),
        password: Yup.string()
          .min(6, "Нууц үг хамгийн багадаа 8 тэмдэгттэй байна")
          .required("Нууц үгээ заавал оруулна уу!"),
        phonenumber: Yup.string().notRequired(),
      });
    }
  }, [modal]);

  const formik = useFormik<FormValues>({
    initialValues: {
      email: "",
      password: "",
      phonenumber: "",
      termsAccepted: false,
      privacyAccepted: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);

      try {
        if (modal === "login") {
          const result = await signIn("login", {
            email: values.email,
            password: values.password,
            redirect: false,
          });

          if (result?.error) throw new Error(result.error);

          toast({
            type: "success",
            title: "Амжилттай!",
            description: "Та амжилттай нэвтэрлээ.",
          });

          onClose?.();
        } else if (modal === "forgotPass") {
          setOtp("forgotPass");
          setPhone(values.phonenumber);
          setModal("otp");
        }
      } catch (error) {
        toast({
          type: "error",
          title: "Уучлаарай",
          description:
            error instanceof Error
              ? error.message
              : "Нэвтрэх үйлдэл амжилтгүй боллоо.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  const showForm = modal === "login" || modal === "forgotPass";
  const showPasswordField = modal === "login";
  const showForgotPasswordButton = modal === "login";
  const showLoginButtons = modal !== "forgotPass";
  const showForgotPassButtons = modal === "forgotPass";

  return (
    <form style={{ width: "100%" }} onSubmit={formik.handleSubmit}>
      {showForm && (
        <VStack w="full" gap={6}>
          <VStack alignSelf="center" textAlign="center" w="100%" gap={0} m={0}>
            <VStack gap="10px" w="full">
              <Text fontSize={24} fontWeight={700}>
                {modal === "forgotPass" ? "Нууц үг мартсан" : "Нэвтрэх"}
              </Text>

              {modal !== "forgotPass" && (
                <Text fontSize={14} fontWeight={400} w="full" mt={-2}>
                  И-мэйл хаяг оруулан үргэлжлүүлэх товчийг дарж Garage.mn
                  вебсайтад нэвтэрснээр Таныг тус вебсайтын
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    <Link
                      target="_blank"
                      href="https://mechanicappgarage.sgp1.cdn.digitaloceanspaces.com/garagemn/privacy/2025.01.30%20%D2%AE%D0%B9%D0%BB%D1%87%D0%B8%D0%BB%D0%B3%D1%8D%D1%8D%D0%BD%D0%B8%D0%B9%20%D0%BD%D3%A9%D1%85%D1%86%D3%A9%D0%BB%20-%20Garage.mn.pdf"
                    >
                      {" "}
                      Үйлчилгээний нөхцөл{" "}
                    </Link>
                  </span>
                  болон
                  <span
                    style={{
                      fontSize: "14px",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    {" "}
                    <Link
                      target="_blank"
                      href="https://mechanicappgarage.sgp1.cdn.digitaloceanspaces.com/garagemn/privacy/2025.01.30%20%D0%9D%D1%83%D1%83%D1%86%D0%BB%D0%B0%D0%BB%D1%8B%D0%BD%20%D0%B1%D0%BE%D0%B4%D0%BB%D0%BE%D0%B3%D0%BE.pdf"
                    >
                      Нууцлалын бодлогыг{" "}
                    </Link>
                  </span>
                  хүлээн зөвшөөрсөнд тооцно.
                </Text>
              )}
            </VStack>
          </VStack>

          <VStack gap={2} w="full">
            <FormControl
              isInvalid={formik.touched.email && !!formik.errors.email}
            >
              <FormLabel fontSize={14} fontWeight={600}>
                Имэйл хаяг
              </FormLabel>
              <InputGroup>
                <Input
                  name="email"
                  value={formik.values.email}
                  placeholder="Имэйл хаяг"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type="email"
                />
              </InputGroup>
              {formik.touched.email && formik.errors.email && (
                <FormHelperText color="#D72C0D">
                  {formik.errors.email}
                </FormHelperText>
              )}
            </FormControl>

            {showPasswordField && (
              <FormControl
                isInvalid={formik.touched.password && !!formik.errors.password}
                mt={2}
              >
                <FormLabel fontSize={14} fontWeight={600}>
                  Нууц үг
                </FormLabel>
                <InputGroup>
                  <Input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formik.values.password}
                    placeholder="Нууц үг"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  <InputRightElement
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <IconEye /> : <IconEyeOff />}
                  </InputRightElement>
                </InputGroup>
                {formik.touched.password && formik.errors.password && (
                  <FormHelperText color="#D72C0D">
                    {formik.errors.password}
                  </FormHelperText>
                )}

                {/* Forgot Password Link */}
                {showForgotPasswordButton && (
                  <HStack w="full" justify="flex-end" mt={2}>
                    <Text
                      fontSize={14}
                      color="#344054"
                      textDecoration="underline"
                      cursor="pointer"
                      onClick={() => {
                        formik.resetForm();
                        setModal("forgotPass");
                      }}
                    >
                      Нууц үг мартсан?
                    </Text>
                  </HStack>
                )}
              </FormControl>
            )}
          </VStack>

          {/* Login/Signup Buttons */}
          {showLoginButtons && (
            <VStack gap={4} w="full" mt={2}>
              <Button
                variant="solid"
                type="submit"
                isLoading={isLoading}
                width="full"
                colorScheme="teal"
              >
                Нэвтрэх
              </Button>

              <HStack justify="center" w="full" mt={4}>
                <Text fontSize={14}>Бүртгэлгүй хэрэглэгч?</Text>
                <Link href="/sign-up" onClick={onClose}>
                  <Text
                    fontSize={14}
                    fontWeight={700}
                    textDecor="underline"
                    cursor="pointer"
                  >
                    Бүртгүүлэх
                  </Text>
                </Link>
              </HStack>
            </VStack>
          )}

          {/* Forgot Password Buttons */}
          {showForgotPassButtons && (
            <HStack w="full" gap={4}>
              <Button
                variant="outline"
                width="full"
                colorScheme="teal"
                onClick={onClose}
              >
                Хаах
              </Button>
              <Button
                variant="solid"
                type="submit"
                isLoading={isLoading}
                width="full"
                colorScheme="teal"
              >
                Илгээх
              </Button>
            </HStack>
          )}
        </VStack>
      )}
    </form>
  );
};
