"use client";
import { GetProfile, UpdateProfile } from "@/_services/user";
import { BreadCrumb, SideBar } from "@/components";
import { UseApi } from "@/hooks";
import { grey100, grey50, primary, textDefault } from "@/theme/colors";
import {
  Button,
  FormControl,
  FormHelperText,
  Grid,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useFormik } from "formik";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

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
  [key: string]: string | boolean;
}
interface FormField {
  name: keyof FormValues;
  placeHolder: string;
  label: string;
  type?: string;
  isCompanyField?: boolean;
}

export const PersonalInfo = () => {
  const [{ data: profile, isLoading }, getProfile] = UseApi({
    service: GetProfile,
    useAuth: true,
  });

  const [{ data: updatedData, isLoading: updateLoader }, updateProfile] =
    UseApi({
      service: UpdateProfile,
      useAuth: true,
    });

  useEffect(() => {
    getProfile();
  }, []);

  const formik = useFormik<FormValues>({
    initialValues: {
      companyLocation: "",
      companyRegNum: "",
      employeeName: profile?.name || "",
      employeePosition: profile?.position || "",
      phoneNumber: profile?.phone || "",
      email: profile?.email || "",
      password: "",
      repassword: "",
      privacyAccepted: false,
      termsAccepted: false,
    },
    enableReinitialize: true,
    // validationSchema,
    onSubmit: async (values) => {
      try {
        console.log(values);
      } catch (error) {}
    },
  });
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
  return (
    <VStack
      w="full"
      p={4}
      gap={6}
      borderRadius={8}
      border={`1px solid ${grey100}`}
      boxShadow="0px 2px 24px -4px rgba(16, 24, 40, 0.02)"
    >
      <HStack w="full" justify="space-between">
        <Text variant="h7">Хэрэглэгчийн тохиргоо</Text>
        <Button variant="navy">Засах</Button>
      </HStack>
      <Grid w="full" templateColumns="repeat(2, 1fr)" rowGap={4} columnGap={6}>
        {formFields.map((field, index) => {
          if (field.isCompanyField) return null;

          const fieldName = field.name;
          const fieldError =
            formik.touched[fieldName] && formik.errors[fieldName];

          if (fieldName === "companyLocation") {
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
    </VStack>
  );
};
