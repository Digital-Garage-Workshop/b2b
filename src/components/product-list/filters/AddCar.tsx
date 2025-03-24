"use client";
import { grey500 } from "@/theme/colors";
import {
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";
import { Selection } from "./Selection";
import { useFormik } from "formik";

const model = [
  {
    manuid: 1,
    name: "Toyota",
    childrens: [
      { modelid: 101, modelname: "Corolla", yearstart: 2000, yearend: 2023 },
      { modelid: 102, modelname: "Camry", yearstart: 1995, yearend: 2022 },
    ],
  },
  {
    manuid: 2,
    name: "Honda",
    childrens: [
      { modelid: 201, modelname: "Civic", yearstart: 1990, yearend: 2023 },
      { modelid: 202, modelname: "Accord", yearstart: 1985, yearend: 2021 },
    ],
  },
];

const engine = [
  {
    carid: 1,
    carname: "1.8L VVT-i",
  },
  {
    carid: 2,
    carname: "2.0L Turbo",
  },
  {
    carid: 3,
    carname: "3.5L V6 Hybrid",
  },
];

const brand = [
  { manuid: 1, name: "Toyota" },
  { manuid: 2, name: "Honda" },
  { manuid: 3, name: "Ford" },
];

export const AddCar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlate, setIsPlate] = useState(false);

  const formik = useFormik({
    initialValues: {
      selectedBrand: "",
      selectedBrandName: "",
      selectedModel: "",
      selectedModelName: "",
      selectedCar: "",
      selectedCarName: "",
      plate: "",
      vin: "",
    },
    onSubmit: (values) => {
      if (isPlate) {
        if (values.plate) {
        } else if (values.vin) {
        }
      } else {
        console.error("Invalid selection.");
      }
    },
  });

  // Filter models based on the selected brand
  const filteredModels =
    formik.values.selectedBrand === ""
      ? [] // No models if brand isn't selected
      : model.filter((m) => m.manuid === Number(formik.values.selectedBrand));

  // Flatten models to extract children (actual models)
  const modelOptions = filteredModels.flatMap((m) => m.childrens || []);

  return (
    <VStack
      p="8px 16px"
      w="full"
      bg="white"
      borderRadius={8}
      height={isExpanded ? 322 : 54}
      overflow={"hidden"}
      transition="height 400ms ease-in-out"
    >
      <HStack
        py={2.5}
        w="full"
        justify="space-between"
        onClick={() => setIsExpanded((prev) => !prev)}
        cursor="pointer"
      >
        <Text variant="subtitle3">Машинаа оруулах</Text>
        {isExpanded ? <IconMinus size={16} /> : <IconPlus size={16} />}
      </HStack>
      <HStack w="full" pb={2}>
        <Button
          variant={isPlate ? "navy" : "ghost"}
          onClick={() => setIsPlate(true)}
        >
          Улсын дугаар
        </Button>
        <Button
          variant={isPlate ? "ghost" : "navy"}
          onClick={() => setIsPlate(false)}
        >
          Модел сонгох
        </Button>
      </HStack>

      {isPlate ? (
        <Input placeholder="0000 ААА" />
      ) : (
        <VStack w="full" gap="10px">
          {/* Select Brand (Manufacturer) */}
          <Selection
            data={brand}
            isDisabled={false}
            placeholder="Үйлдвэрлэгч"
            type="brand"
            selection={formik.values.selectedBrand}
            setSelected={(value, name) => {
              formik.setFieldValue("selectedBrand", value);
              formik.setFieldValue("selectedBrandName", name);
              // Reset dependent fields when changing the brand
              formik.setFieldValue("selectedModel", "");
              formik.setFieldValue("selectedModelName", "");
              formik.setFieldValue("selectedCar", "");
              formik.setFieldValue("selectedCarName", "");
            }}
            isAlert={
              Boolean(formik.touched.selectedBrand) &&
              Boolean(formik.errors.selectedBrand)
            }
          />

          {/* Select Model (Filtered by Brand) */}
          <Selection
            data={filteredModels} // Pass only the filtered models
            isDisabled={formik.values.selectedBrand === ""}
            placeholder="Модел"
            selection={formik.values.selectedModel}
            setSelected={(value, name) => {
              formik.setFieldValue("selectedModel", value);
              formik.setFieldValue("selectedModelName", name);
              // Reset engine when model changes
              formik.setFieldValue("selectedCar", "");
              formik.setFieldValue("selectedCarName", "");
            }}
            type="model"
            isAlert={
              Boolean(formik.touched.selectedModel) &&
              Boolean(formik.errors.selectedModel)
            }
          />

          {/* Select Engine */}
          <Selection
            data={engine}
            isDisabled={formik.values.selectedModel === ""}
            placeholder="Хөдөлгүүр"
            selection={formik.values.selectedCar}
            setSelected={(value, name) => {
              formik.setFieldValue("selectedCar", value);
              formik.setFieldValue("selectedCarName", name);
            }}
            type="engine"
            isAlert={
              Boolean(formik.touched.selectedCar) &&
              Boolean(formik.errors.selectedCar)
            }
          />
        </VStack>
      )}
      <Button w="full" leftIcon={<IconPlus />} mt={2}>
        Машин нэмэх
      </Button>
    </VStack>
  );
};
