"use client";
import {
  Button,
  Checkbox,
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
import Link from "next/link";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { ValidationCheck } from "./Validator";
import { useSearchParams } from "next/navigation";

const validationSchema = yup.object({
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
});

export const SignUpForm = () => {
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag") || null;
  const [validations, setValidations] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    passwordsMatch: false,
  });
  const formik = useFormik({
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
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
      } catch (error) {
        console.error("Error in form submission:", error);
      }
    },
  });
  const inputs = [
    {
      name: "employeeName",
      placeHolder: "Нэр",
      label: "Бүртгэл үүсгэсэн ажилтны нэр",
      value: formik.values.employeeName,
      error: formik.touched.employeeName && formik.errors.employeeName,
    },
    {
      name: "employeePosition",
      placeHolder: "Жишээ@gmail.com",
      label: "Албан тушаал",
      value: formik.values.employeePosition,
      error: formik.touched.employeePosition && formik.errors.employeePosition,
    },
    {
      name: "phoneNumber",
      placeHolder: "+976",
      label: "Утасны дугаар",
      value: formik.values.phoneNumber,
      error: formik.touched.phoneNumber && formik.errors.phoneNumber,
    },
    {
      name: "email",
      placeHolder: "example@garage.mn",
      label: "Емайл хаяг",
      value: formik.values.email,
      error: formik.touched.email && formik.errors.email,
    },
    {
      name: "password",
      placeHolder: "***********",
      label: "Нууц үг зохиох",
      value: formik.values.password,
      error: formik.touched.password && formik.errors.password,
    },
    {
      name: "repassword",
      placeHolder: "***********",
      label: "Нууц үг давтах",
      value: formik.values.repassword,
      error: formik.touched.repassword && formik.errors.repassword,
    },
  ];

  useEffect(() => {
    const newValidations = {
      minLength: formik.values.password.length >= 8,
      hasUpperCase: /[A-Z]/.test(formik.values.password),
      hasLowerCase: /[a-z]/.test(formik.values.password),
      hasNumber: /\d/.test(formik.values.password),
      passwordsMatch:
        formik.values.password === formik.values.repassword &&
        formik.values.password !== "",
    };
    setValidations(newValidations);
  }, [formik.values.password, formik.values.repassword]);

  return (
    <VStack w="60%" gap={8} mt={"115px"} display={tag ? "flex" : "none"}>
      <Text variant="h7">
        {tag == "company"
          ? "Компанийнхаа талаар бидэнтэй хуваалцаач"
          : "Хувийн мэдээлэлээ оруулна уу"}
      </Text>
      <Text variant="body2" mt={-6}>
        Start with what you know, see what sticks, and get paid
      </Text>
      <Grid w="full" templateColumns="repeat(2, 1fr)" rowGap={4} columnGap={4}>
        <FormControl display={tag == "company" ? "block" : "none"}>
          <Text pb={"6px"} variant="subtitle3">
            Байгууллагын регистрийн дугаар
          </Text>
          <Input
            name="companyRegNum"
            flex={1}
            placeholder="1234567"
            value={formik.values.companyRegNum || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.values.companyRegNum && (
            <FormHelperText color="#D72C0D">
              {formik.values.companyRegNum}
            </FormHelperText>
          )}
        </FormControl>
        <FormControl display={tag == "company" ? "block" : "none"}>
          <Text pb={"6px"} variant="subtitle3">
            Байгууллагын хаяг
          </Text>
          <Input
            name="companyLocation"
            flex={1}
            placeholder={"СБД , 8-Р ХОРОО ..."}
            value={formik.values.companyLocation || ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.values.companyLocation && (
            <FormHelperText color="#D72C0D">
              {formik.values.companyLocation}
            </FormHelperText>
          )}
        </FormControl>
        {inputs.map((item, index: number) => (
          <FormControl key={index}>
            <Text pb={"6px"} variant="subtitle3">{`${item.label}`}</Text>
            <Input
              name={item.name}
              flex={1}
              placeholder={item.placeHolder}
              value={item.value || ""}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {item.error && (
              <FormHelperText color="#D72C0D">{item.error}</FormHelperText>
            )}
          </FormControl>
        ))}
      </Grid>

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
      <HStack gap={4} w="full" align="flex-start">
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
      <HStack gap={4} w="full" mt={-6}>
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
      </HStack>
      <Button w="full">Бүртгүүлэх</Button>
    </VStack>
  );
};
