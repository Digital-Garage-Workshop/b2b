"use client";
import {
  Button,
  HStack,
  Input,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Selection } from "./Selection";
import { useFormik } from "formik";
import { UseApi, useCustomToast } from "@/hooks";
import {
  GetCarByPlate,
  GetCarEngine,
  GetCarManu,
  GetCarModel,
} from "@/_services";
import { useRouter } from "next/navigation";
import { addCar } from "@/redux/slices/carSlice";
import { useDispatch } from "react-redux";
import { CarModal } from "./CarModal";

export const AddCar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlate, setIsPlate] = useState(false);
  const [carid, setCarid] = useState<null | string>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const dispatch = useDispatch();
  const toast = useCustomToast();

  const [
    { data: plateData, isLoading: plateLoader, error: plateError },
    fetchPlate,
  ] = UseApi({
    service: GetCarByPlate,
  });

  const [{ data: manu }, fetchManu] = UseApi({
    service: GetCarManu,
  });
  const [{ data: model }, fetchModel] = UseApi({
    service: GetCarModel,
  });
  const [{ data: engines }, fetchEngine] = UseApi({
    service: GetCarEngine,
  });

  const formik = useFormik({
    initialValues: {
      selectedBrand: "",
      selectedBrandName: "",
      selectedModel: "",
      selectedModelName: "",
      selectedCar: "",
      selectedCarName: "",
      plate: "",
    },
    onSubmit: (values) => {
      if (isPlate) {
        if (values.plate) {
          fetchPlate({ platenumber: values.plate });
        } else {
          toast({
            type: "warning",
            title: "Уучлаарай",
            description: "Та улсын дугаараа оруулна уу",
          });
        }
      } else {
        if (values.selectedCar) {
          dispatch(
            addCar({
              carid: values.selectedCar,
              manuName: values.selectedBrandName,
              modelName: values.selectedModelName,
              engine: values.selectedCarName,
              plate: null,
              vin: null,
            })
          );
          const searchParams = new URLSearchParams(window.location.search);

          searchParams.set("car", values.selectedCar);

          router.push(`?${searchParams.toString()}`);
        }
      }
    },
  });

  useEffect(() => {
    fetchManu();
  }, []);

  useEffect(() => {
    if ((formik.values.selectedBrand, formik.values.selectedModel)) {
      fetchEngine({
        manuid: formik.values.selectedBrand,
        modelid: formik.values.selectedModel,
      });
    } else if (formik.values.selectedBrand) {
      fetchModel({ manuid: formik.values.selectedBrand });
    }
  }, [formik.values.selectedBrand, formik.values.selectedModel]);

  useEffect(() => {
    if (formik.values.selectedCar) {
      setCarid(formik.values.selectedCar);
    }
  }, [formik.values.selectedCar]);

  useEffect(() => {
    if (plateData) onOpen();
  }, [plateData]);
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
          flex={1}
          variant={isPlate ? "navy" : "ghost"}
          onClick={() => setIsPlate(true)}
        >
          Улсын дугаар
        </Button>
        <Button
          flex={1}
          variant={isPlate ? "ghost" : "navy"}
          onClick={() => setIsPlate(false)}
        >
          Модел сонгох
        </Button>
      </HStack>

      {isPlate ? (
        <Input
          placeholder="0000 ААА"
          value={formik.values.plate}
          name="plate"
          onChange={formik.handleChange}
          maxLength={7}
        />
      ) : (
        <VStack w="full" gap="10px">
          {/* Select Brand (Manufacturer) */}
          <Selection
            data={manu}
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
            data={model} // Pass only the filtered models
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
            data={engines}
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
      <Button
        w="full"
        leftIcon={<IconPlus />}
        mt={2}
        onClick={() => formik.handleSubmit()}
        isLoading={plateLoader}
      >
        Машин нэмэх
      </Button>
      <CarModal
        data={plateData}
        isOpen={isOpen}
        onClose={onClose}
        plate={formik.values.plate}
      />
    </VStack>
  );
};
