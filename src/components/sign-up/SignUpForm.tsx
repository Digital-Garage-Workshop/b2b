"use client";
import {
  Button,
  Checkbox,
  FormControl,
  FormHelperText,
  Grid,
  HStack,
  Input,
  Text,
  VStack,
  Box,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useEffect, useState, useMemo } from "react";
import * as yup from "yup";
import { ValidationCheck } from "./Validator";
import { useCustomToast, UseApi } from "@/hooks";

// Import the company register service
import { GetCompanyRegister } from "@/_services"; // Adjust the import path as needed

// Define types for form values
interface FormValues {
  companyLocation: string;
  companyRegNum: string;
  employeeName: string;
  employeePosition: string;
  phoneNumber: string;
  email: string;
  password: string;
  repassword: string;
  privacyAccepted: boolean;
  termsAccepted: boolean;
  [key: string]: string | boolean; // Index signature for dynamic access
}

// Form field type definition
interface FormField {
  name: keyof FormValues;
  placeHolder: string;
  label: string;
  type?: string;
  isCompanyField?: boolean;
}

export const SignUpForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const tag = searchParams?.get("tag") || null;
  const toast = useCustomToast();
  const [companyName, setCompanyName] = useState<string | null>(null);
  const [regNumBlurred, setRegNumBlurred] = useState(false);

  // Setup API hook for company registration lookup
  const [
    { data: companyData, isLoading: companyLoading, error: companyError },
    fetchCompany,
  ] = UseApi({
    service: GetCompanyRegister,
  });

  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    passwordsMatch: false,
  });

  const validationSchema = useMemo(() => {
    return yup.object({
      ...(tag === "company" && {
        companyRegNum: yup
          .string()
          .required("Байгууллагын регистрийн дугаар оруулна уу"),
        companyLocation: yup.string().required("Байгууллагын хаяг оруулна уу"),
      }),

      employeeName: yup.string().required("Нэр ээ оруулна уу"),
      employeePosition: yup.string().required("Албан тушаал оруулна уу"),
      phoneNumber: yup
        .string()
        .required("Утасны дугаар оруулна уу")
        .matches(/^[0-9]{8}$/, "Утасны дугаар 8 оронтой байх ёстой"),
      email: yup
        .string()
        .required("Имэйл оруулна уу")
        .email("Зөв имэйл хаяг оруулна уу"),
      password: yup
        .string()
        .required("Нууц үг оруулна уу")
        .min(8, "Нууц үг 8-аас дээш тэмдэгттэй байх ёстой")
        .matches(/[A-Z]/, "Нууц үг дор хаяж 1 том үсэг агуулсан байх ёстой")
        .matches(/[a-z]/, "Нууц үг дор хаяж 1 жижиг үсэг агуулсан байх ёстой")
        .matches(/[0-9]/, "Нууц үг дор хаяж 1 тоо агуулсан байх ёстой")
        .matches(
          /[@$!%*?&]/,
          "Нууц үг дор хаяж 1 тусгай тэмдэгт (@$!%*?&) агуулсан байх ёстой"
        ),
      repassword: yup
        .string()
        .required("Нууц үгээ давтан оруулна уу")
        .oneOf([yup.ref("password")], "Нууц үг таарахгүй байна"),
      termsAccepted: yup
        .boolean()
        .oneOf([true], "Үйлчилгээний нөхцөлийг зөвшөөрөх шаардлагатай"),
      privacyAccepted: yup
        .boolean()
        .oneOf([true], "Нууцлалын бодлогыг зөвшөөрөх шаардлагатай"),
    });
  }, [tag]);

  // Form configuration
  const formik = useFormik<FormValues>({
    initialValues: {
      companyLocation: "",
      companyRegNum: "",
      employeeName: "",
      employeePosition: "",
      phoneNumber: "",
      email: "",
      password: "",
      repassword: "",
      privacyAccepted: false,
      termsAccepted: false,
    },
    validationSchema,
    onSubmit: async (values) => {
      // Don't proceed with registration if company lookup is in progress
      if (companyLoading) {
        toast({
          type: "warning",
          title: "Хүлээнэ үү",
          description: "Компанийн мэдээлэл шалгаж байна.",
        });
        return;
      }

      // Don't proceed if company registration is required but not found
      if (tag === "company" && !companyName) {
        toast({
          type: "error",
          title: "Компани олдсонгүй",
          description: "Зөв регистрийн дугаар оруулна уу.",
        });
        return;
      }

      setIsLoading(true);
      try {
        const formData = new FormData();
        formData.append("email", values.email);
        formData.append("password", values.password);
        formData.append("name", values.employeeName);
        formData.append("position", values.employeePosition);
        formData.append("phone", values.phoneNumber);
        formData.append("type", tag === "company" ? "corporate" : "personal");
        if (tag === "company") {
          formData.append("register", values.companyRegNum);
          if (companyName) {
            formData.append("corporatename", companyName);
          }
        }

        const apiurl = process.env.NEXT_PUBLIC_URL_API;

        const response = await fetch(`${apiurl}/register`, {
          method: "POST",
          body: formData,
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Registration failed");
        }

        toast({
          type: "success",
          title: "Амжилттай!",
          description: "Та амжилттай бүртгүүллээ.",
        });

        router.push("/verification-pending");
      } catch (error: any) {
        toast({
          type: "error",
          title: "Уучлаарай",
          description: error.message || "Бүртгүүлэх үйлдэл амжилтгүй боллоо.",
        });
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Look up company information when registration number is entered
  useEffect(() => {
    if (
      tag === "company" &&
      formik.values.companyRegNum &&
      formik.values.companyRegNum.length >= 7 &&
      regNumBlurred
    ) {
      fetchCompany({ regnumber: formik.values.companyRegNum });
    }
  }, [formik.values.companyRegNum, regNumBlurred]);

  // Update company name when data is received
  useEffect(() => {
    if (companyData && companyData.name) {
      setCompanyName(companyData.name);

      // If location is empty, populate it from API response if available
      if (!formik.values.companyLocation && companyData.address) {
        formik.setFieldValue("companyLocation", companyData.address);
      }
    } else if (companyError) {
      setCompanyName(null);
    }
  }, [companyData, companyError]);

  const formFields: FormField[] = [
    {
      name: "companyRegNum",
      placeHolder: "1234567",
      label: "Байгууллагын регистрийн дугаар",
      isCompanyField: true,
    },
    {
      name: "companyLocation",
      placeHolder: "СБД, 8-Р ХОРОО...",
      label: "Байгууллагын хаяг",
      isCompanyField: true,
    },
    {
      name: "employeeName",
      placeHolder: "Нэр",
      label: "Бүртгэл үүсгэсэн ажилтны нэр",
    },
    {
      name: "employeePosition",
      placeHolder: "Менежер, захирал гэх мэт",
      label: "Албан тушаал",
    },
    {
      name: "phoneNumber",
      placeHolder: "99887766",
      label: "Утасны дугаар",
    },
    {
      name: "email",
      placeHolder: "example@garage.mn",
      label: "Имэйл хаяг",
    },
    {
      name: "password",
      placeHolder: "***********",
      label: "Нууц үг зохиох",
      type: "password",
    },
    {
      name: "repassword",
      placeHolder: "***********",
      label: "Нууц үг давтах",
      type: "password",
    },
  ];

  useEffect(() => {
    const newValidations = {
      minLength: formik.values.password.length >= 8,
      hasUpperCase: /[A-Z]/.test(formik.values.password),
      hasLowerCase: /[a-z]/.test(formik.values.password),
      hasNumber: /\d/.test(formik.values.password),
      hasSpecialChar: /[@$!%*?&]/.test(formik.values.password),
      passwordsMatch:
        formik.values.password === formik.values.repassword &&
        formik.values.password !== "",
    };
    setValidations(newValidations);
  }, [formik.values.password, formik.values.repassword]);

  if (!tag) return null;

  // Form submission is disabled until terms and privacy are accepted
  const isSubmitDisabled =
    !formik.values.termsAccepted ||
    !formik.values.privacyAccepted ||
    (tag === "company" && !companyName) ||
    companyLoading;

  return (
    <VStack w="60%" gap={8} mt="115px">
      {/* Header */}
      <Text variant="h7">
        {tag === "company"
          ? "Компанийнхаа талаар бидэнтэй хуваалцаач"
          : "Хувийн мэдээлэлээ оруулна уу"}
      </Text>
      <Text variant="body2" mt={-6}>
        Start with what you know, see what sticks, and get paid
      </Text>

      {/* Form Fields */}
      <Grid w="full" templateColumns="repeat(2, 1fr)" rowGap={4} columnGap={4}>
        {formFields.map((field, index) => {
          // Skip company fields for non-company signup
          if (field.isCompanyField && tag !== "company") return null;

          const fieldName = field.name;
          const fieldError =
            formik.touched[fieldName] && formik.errors[fieldName];

          // Special case for company registration number field
          if (fieldName === "companyRegNum") {
            return (
              <FormControl key={index}>
                <Text pb="6px" variant="subtitle3">
                  {field.label}
                </Text>
                <VStack w="full" spacing={2} align="start">
                  <Input
                    name={fieldName.toString()}
                    flex={1}
                    placeholder={field.placeHolder}
                    value={formik.values[fieldName].toString()}
                    onChange={formik.handleChange}
                    onBlur={(e) => {
                      formik.handleBlur(e);
                      setRegNumBlurred(true);
                    }}
                    type={field.type || "text"}
                    isDisabled={companyLoading}
                  />
                  {companyLoading && (
                    <Text fontSize="sm" color="gray.500">
                      Компани хайж байна...
                    </Text>
                  )}
                  {companyName && (
                    <Box
                      p={2}
                      bg="green.50"
                      borderRadius="md"
                      width="full"
                      borderLeft="4px solid"
                      borderColor="green.500"
                    >
                      <Text fontSize="sm" fontWeight="medium">
                        {companyName}
                      </Text>
                    </Box>
                  )}
                  {companyError &&
                    regNumBlurred &&
                    formik.values.companyRegNum && (
                      <Text fontSize="sm" color="red.500">
                        Компани олдсонгүй. Регистрийн дугаараа шалгана уу.
                      </Text>
                    )}
                  {fieldError && (
                    <FormHelperText color="#D72C0D">
                      {fieldError as string}
                    </FormHelperText>
                  )}
                </VStack>
              </FormControl>
            );
          }

          // Special case for company location field - auto-populated from API
          if (fieldName === "companyLocation" && tag === "company") {
            return (
              <FormControl key={index}>
                <Text pb="6px" variant="subtitle3">
                  {field.label}
                </Text>
                <Input
                  name={fieldName.toString()}
                  flex={1}
                  placeholder={field.placeHolder}
                  value={formik.values[fieldName].toString()}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  type={field.type || "text"}
                  isDisabled={companyLoading}
                />
                {fieldError && (
                  <FormHelperText color="#D72C0D">
                    {fieldError as string}
                  </FormHelperText>
                )}
              </FormControl>
            );
          }

          return (
            <FormControl key={index}>
              <Text pb="6px" variant="subtitle3">
                {field.label}
              </Text>
              <Input
                name={fieldName.toString()}
                flex={1}
                placeholder={field.placeHolder}
                value={formik.values[fieldName].toString()}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type={field.type || "text"}
              />
              {fieldError && (
                <FormHelperText color="#D72C0D">
                  {fieldError as string}
                </FormHelperText>
              )}
            </FormControl>
          );
        })}
      </Grid>

      {/* Password Requirements */}
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
          text="Нэг тусгай тэмдэгт (@$!%*?&)"
          isValid={validations.hasSpecialChar}
        />
        <ValidationCheck
          text="Нууц үгнүүд таарч байна"
          isValid={validations.passwordsMatch}
        />
      </VStack>

      {/* Terms and Privacy Checkboxes */}
      <HStack gap={4} w="full" align="flex-start">
        <Checkbox
          name="termsAccepted"
          isChecked={formik.values.termsAccepted}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.termsAccepted && !formik.values.termsAccepted
          }
        />
        <Text color="#475467" fontSize={14}>
          Би{" "}
          <Link
            href="/terms-and-condition"
            target="_blank"
            style={{
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Үйлчилгээний нөхцөлтэй{" "}
          </Link>
          танилцаж, хүлээн зөвшөөрсөн.
        </Text>
      </HStack>
      <HStack gap={4} w="full" mt={-6}>
        <Checkbox
          name="privacyAccepted"
          isChecked={formik.values.privacyAccepted}
          onChange={formik.handleChange}
          isInvalid={
            formik.touched.privacyAccepted && !formik.values.privacyAccepted
          }
        />
        <Text color="#475467" fontSize={14}>
          Би{" "}
          <Link
            href="/privacy-and-policy"
            target="_blank"
            style={{
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Нууцлалын бодлогыг{" "}
          </Link>
          танилцаж, хүлээн зөвшөөрсөн.
        </Text>
      </HStack>

      {/* Submit Button */}
      <Button
        w="full"
        isLoading={isLoading}
        type="submit"
        onClick={() => formik.handleSubmit()}
        isDisabled={isSubmitDisabled}
        colorScheme="teal"
      >
        Бүртгүүлэх
      </Button>
    </VStack>
  );
};
