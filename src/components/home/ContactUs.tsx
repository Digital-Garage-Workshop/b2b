"use client";
import { grey200, grey500, primary } from "@/theme/colors";
import {
  Button,
  FormControl,
  FormLabel,
  Grid,
  Highlight,
  HStack,
  Input,
  Text,
  Textarea,
  VStack,
} from "@chakra-ui/react";
import { MailIcon, PhoneIcon } from "@/icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { IconArrowRight } from "@tabler/icons-react";
const validationSchema = yup.object({
  name: yup.string(),
  email: yup
    .string()
    .required("Имэйл оруулна уу")
    .min(2, "Нэр хамгийн багадаа 2 үсэг байна"),
  phoneNumber: yup.number(),
  companyReg: yup.number(),
  mesasge: yup.string().max(200),
});

export const ContactUs = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phoneNumber: null,
      companyReg: null,
      message: "",
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
      name: "name",
      placeHolder: "Нэр",
      label: "Нэр",
      value: formik.values.name,
    },
    {
      name: "email",
      placeHolder: "Жишээ@gmail.com",
      label: "Емайл хаяг",
      value: formik.values.email,
    },
    {
      name: "phoneNumber",
      placeHolder: "+976",
      label: "Утасны дугаар",
      value: formik.values.phoneNumber,
    },
    {
      name: "companyReg",
      placeHolder: "1234567",
      label: "Байгууллагын регистрийн дугаар",
      value: formik.values.companyReg,
    },
  ];
  return (
    <HStack w="full" gap={4} justify="space-between" pos="relative">
      <VStack gap={4} align="flex-start" maxW={347}>
        <Text variant="h6" maxW={403} fontSize={40}>
          <Highlight query="холбогдох" styles={{ color: primary }}>
            Бидэнтэй холбогдох
          </Highlight>
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur nunc nunc sit velit eget
          sollicitudin sit posuere
        </Text>
        <HStack
          gap={4}
          p="17px 20px"
          border={`1px solid ${grey200}`}
          borderRadius={8}
          w={270}
          boxShadow=" 0px 0.5px 2px 0px rgba(25, 33, 61, 0.10)"
        >
          <MailIcon />
          <VStack gap={2} align="flex-start">
            <Text variant="body3" color={grey500}>
              Email:
            </Text>
            <Text variant="title3" color={grey500}>
              info@garage.mn
            </Text>
          </VStack>
        </HStack>
        <HStack
          gap={4}
          p="17px 20px"
          border={`1px solid ${grey200}`}
          borderRadius={8}
          w={270}
          boxShadow=" 0px 0.5px 2px 0px rgba(25, 33, 61, 0.10)"
        >
          <PhoneIcon />
          <VStack gap={2} align="flex-start">
            <Text variant="body3" color={grey500}>
              Phone:
            </Text>
            <Text variant="title3" color={grey500}>
              +976 7200 3003
            </Text>
          </VStack>
        </HStack>
      </VStack>
      <VStack
        p={4}
        gap={4}
        bg="white"
        boxShadow=" 0px 1px 4px 0px rgba(25, 33, 61, 0.08)"
        border={`1px solid ${grey200}`}
        borderRadius={8}
        w="50%"
        align="flex-start"
      >
        <Grid
          w="full"
          templateColumns="repeat(2, 1fr)"
          rowGap={4}
          columnGap={6}
        >
          {inputs.map((item, index: number) => (
            <VStack gap="6px" align={"flex-start"} key={index}>
              <Text variant="subtitle3">{item.label}</Text>
              <Input
                name={item.name}
                flex={1}
                placeholder={item.placeHolder}
                value={item.value || ""}
                onChange={formik.handleChange}
              />
            </VStack>
          ))}
        </Grid>
        <FormControl>
          <FormLabel>
            <Text variant="subtitle3">Мессеж</Text>
          </FormLabel>
          <Textarea
            name="message"
            flex={1}
            h={92}
            placeholder="Энд мессежээ бичнэ үү..."
            onChange={formik.handleChange}
            background="var(--Primary-White, #FFF)"
            value={formik.values.message}
            onBlur={formik.handleBlur}
            border="1px solid  #D0D5DD"
            // background=" #FFF"
            boxShadow="0px 1px 2px 0px rgba(10, 13, 18, 0.05)"
            _hover={{
              border: "1px solid #D0D5DD",
              background: " #F9FAFB",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
            }}
            _focus={{
              border: "1px solid #F75B00",
              background: "#FFF",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.1)",
              outline: "none",
            }}
            _disabled={{
              border: "1px solid #D0D5DD",
              background: "#F9FAFB",
              boxShadow: "0px 1px 2px 0px rgba(10, 13, 18, 0.05)",
              opacity: 0.6,
              cursor: "not-allowed",
            }}
          />
        </FormControl>
        <Button rightIcon={<IconArrowRight />}>Илгээх</Button>
      </VStack>
    </HStack>
  );
};
