"use client";
import { grey200, grey600, primary } from "@/theme/colors";
import {
  Button,
  Divider,
  Grid,
  Highlight,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconInfoCircle, IconTruckDelivery } from "@tabler/icons-react";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const validationSchema = yup.object({
  khoroo: yup.string().required("Хороо оруулна уу"),
  phoneNumber: yup.string().required("Утас оруулна уу"),
  district: yup.string().required("Дүүрэг оруулна уу"),
  moreInfo: yup.string().max(200),
});

export const SelectLocation = () => {
  const [isUb, setIsUb] = useState(true);
  const [isExpress, setExpress] = useState(false);

  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      district: "",
      khoroo: "",
      moreInfo: "",
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
      name: "phoneNumber",
      placeHolder: "+976",
      label: "Утасны дугаар",
      value: formik.values.phoneNumber,
    },
    {
      name: "email",
      placeHolder: "Жишээ@gmail.com",
      label: "Дүүрэг",
      value: formik.values.district,
    },
    {
      name: "phoneNumber",
      placeHolder: "+976",
      label: "Утасны дугаар",
      value: formik.values.phoneNumber,
    },
  ];
  return (
    <VStack
      w="full"
      p={6}
      gap={6}
      align="flex-start"
      borderRadius={8}
      border={`1px solid ${grey200}`}
    >
      <Text variant="h8">Авах төрөл</Text>
      <HStack w="full" gap={4}>
        <HStack
          border={`1.5px solid ${isUb ? primary : grey200}`}
          bg={isUb ? "#FEF7F2" : "white"}
          p="10px"
          gap="10px"
          borderRadius={8}
          flex={1}
          cursor="pointer"
          onClick={() => setIsUb(true)}
        >
          <Stack
            p={2}
            borderRadius={8}
            border={`1.5px solid ${isUb ? primary : grey200}`}
            bg="white"
          >
            <IconTruckDelivery size={24} />
          </Stack>
          <VStack align="flex-start" gap={0}>
            <Text variant="subtitle3">Улаанбаатар доторх</Text>
            <Text variant="caption">
              Таны захиалгын хаягйин дагуу хүргэж өгнө.
            </Text>
          </VStack>
        </HStack>
        <HStack
          border={`1.5px solid ${!isUb ? primary : grey200}`}
          bg={!isUb ? "#FEF7F2" : "white"}
          p="10px"
          gap="10px"
          borderRadius={8}
          flex={1}
          cursor="pointer"
          onClick={() => setIsUb(false)}
        >
          <Stack
            p={2}
            borderRadius={8}
            border={`1.5px solid ${!isUb ? primary : grey200}`}
            bg="white"
          >
            <IconTruckDelivery size={24} />
          </Stack>
          <VStack align="flex-start" gap={0}>
            <Text variant="subtitle3">Улаанбаатар доторх</Text>
            <Text variant="caption">
              Таны захиалгын хаягйин дагуу хүргэж өгнө.
            </Text>
          </VStack>
        </HStack>
      </HStack>
      <Divider />
      <HStack w="full" gap={4}>
        <HStack
          border={`1.5px solid ${!isExpress ? primary : grey200}`}
          bg={!isExpress ? "#FEF7F2" : "white"}
          p="10px"
          borderRadius={8}
          flex={1}
          cursor="pointer"
          onClick={() => setExpress(false)}
          justify="space-between"
        >
          <VStack align="flex-start" gap={0}>
            <Text variant="subtitle3">Энгийн хүргэлт</Text>
            <Text variant="caption">24-48 цагт хүргэгдэнэ</Text>
          </VStack>
          <Text variant="subtitle3">+6000₮</Text>
        </HStack>
        <HStack
          border={`1.5px solid ${isExpress ? primary : grey200}`}
          bg={isExpress ? "#FEF7F2" : "white"}
          p="10px"
          borderRadius={8}
          flex={1}
          cursor="pointer"
          onClick={() => setExpress(true)}
          justify="space-between"
        >
          <VStack align="flex-start" gap={0}>
            <Text variant="subtitle3"> Шуурхай хүргэлт</Text>
            <Text variant="caption">2-5 цагт хүргэгдэнэ</Text>
          </VStack>
          <Text variant="subtitle3">+12’000₮</Text>
        </HStack>
      </HStack>

      <Grid w="full" templateColumns="repeat(3, 1fr)" rowGap={4} columnGap={4}>
        {inputs.map((item, index: number) => (
          <VStack gap="6px" align={"flex-start"} key={index}>
            <Text variant="subtitle3">
              <Highlight query={"*"} styles={{ color: "#D92D20" }}>
                {`${item.label} *`}
              </Highlight>
            </Text>
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
      <VStack gap="6px" align={"flex-start"} w="full">
        <Text variant="subtitle3">Дэлгэрэнгүй хаяг (заавал биш) </Text>
        <Input
          name="moreInfo"
          flex={1}
          placeholder="Энд мессежээ бичнэ үү..."
          onChange={formik.handleChange}
          variant="custom"
          background="var(--Primary-White, #FFF)"
          _focus={{
            outline: "none",
          }}
          value={formik.values.moreInfo}
          onBlur={formik.handleBlur}
        />
      </VStack>
      <HStack align="flex-start">
        <IconInfoCircle color={grey600} size={24} />
        <Text variant="body3" color={grey600}>
          Та тухайн өдрийн 16:00 цагаас хойш захиалга хийсэн бол захиалга нь
          маргааш нь хүргэлтэнд гарах болно.
        </Text>
      </HStack>
      <Button w="full">Хадгалах</Button>
    </VStack>
  );
};
