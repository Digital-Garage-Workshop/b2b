"use client";
import { Button, HStack, Input, Text, VStack } from "@chakra-ui/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { Selection } from "./Selection";
import { useFormik } from "formik";
import { UseApi } from "@/hooks";
import { GetCarEngine, GetCarManu, GetCarModel } from "@/_services";
import { useRouter } from "next/navigation";
import { addCar } from "@/redux/slices/carSlice";
import { useDispatch } from "react-redux";

export const AddCar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isPlate, setIsPlate] = useState(false);
  const [carid, setCarid] = useState<null | string>(null);
  const router = useRouter();
  // const dispatch = useDispatch();

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
        } else if (values.selectedCar) {
          // dispatch(
          //   addCar({
          //     carid: values.selectedCar,
          //     manuName: values.selectedBrandName,
          //     modelName: values.selectedModelName,
          //     engine: values.selectedCarName,
          //     plate: null,
          //     vin: null,
          //   })
          // );
          router.push(`?car=${values.selectedCar}`);
        }
      } else {
        if (values.selectedCar) {
          router.push(`?car=${values.selectedCar}`);
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
      >
        Машин нэмэх
      </Button>
    </VStack>
  );
};
