"use client";
import { grey200, primary } from "@/theme/colors";
import {
  Button,
  Divider,
  HStack,
  Modal,
  ModalContent,
  ModalOverlay,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconTruckDelivery } from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UseApi, useCustomToast } from "@/hooks";
import {
  AddUserAddress,
  DeleteUserAddress,
  UpdateAddress,
} from "@/_services/user";
import { Province, UbZone } from "../cart";

export const AddUserAddressModal = ({
  isOpen,
  onClose,
  isEditing,
  setAddresses,
  address,
  setIsEditing,
}: {
  isOpen: boolean;
  onClose: () => void;
  isEditing: boolean;
  setAddresses: Dispatch<SetStateAction<any[]>>;
  address?: any | null;
  setIsEditing: Dispatch<SetStateAction<boolean>>;
}) => {
  const [isUb, setIsUb] = useState(true);
  const [showAddressForm, setShowAddressForm] = useState(true);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const toast = useCustomToast();

  const validationSchema = useMemo(() => {
    if (isUb) {
      return yup.object({
        khoroo: yup.string().required("Хороо оруулна уу"),
        phoneNumber: yup.string().required("Утас оруулна уу"),
        district: yup.string().required("Дүүрэг оруулна уу"),
        moreInfo: yup.string().max(200),
      });
    } else {
      return yup.object({
        province: yup.string().required("Аймаг сонгоно уу"),
        terminal: yup.string().required("Терминал сонгоно уу"),
        phoneNumber: yup.string().required("Утас оруулна уу"),
        moreInfo: yup.string().max(200),
      });
    }
  }, [isUb]);

  const [
    { data: addAddressData, isLoading: addLoader, successMessage },
    addUserAddress,
  ] = UseApi({
    service: AddUserAddress,
    useAuth: true,
  });

  const [
    {
      data: updateAddressData,
      isLoading: updateLoader,
      successMessage: updateSuccess,
    },
    updateAddress,
  ] = UseApi({
    service: UpdateAddress,
    useAuth: true,
  });

  const formik = useFormik({
    initialValues: {
      phoneNumber: address?.phone || "",
      district: address?.districtid || "",
      khoroo: address?.teamid || "",
      moreInfo: address?.address || "",
      address: address?.address || "",
      cityid: address?.cityid || "",
      teamid: address?.teamid || "",
      terminal: address?.terminalid || "",
      province: address?.cityid || "",
      id: address?.id || "",
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        await addUserAddress({
          id: values.id,
          country: isUb ? "city" : "countryside",
          phone: formik.values.phoneNumber,
          address: formik.values.moreInfo,
          cityid: isUb ? "1" : formik.values.province,
          districtid: formik.values.district,
          teamid: formik.values.khoroo,
          terminalid: formik.values.terminal,
        });

        formik.resetForm();
        setShowAddressForm(false);
        setEditingAddressId(null);
      } catch (error) {
        console.error("Error in form submission:", error);
      }
    },
  });

  const handleEditAddress = (address: any) => {
    const addressIsUb = address.country === "city";
    setIsUb(addressIsUb);

    if (address) {
      formik.setValues({
        id: address?.id || "",
        phoneNumber: address?.phone || "",
        district: address?.districtid || "",
        khoroo: address?.teamid || "",
        moreInfo: address?.address || "",
        address: address?.address || "",
        cityid: address?.cityid || "",
        teamid: address?.teamid || "",
        province: addressIsUb ? "" : address?.cityid || "",
        terminal: address?.terminalid || "",
      });
    }

    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

  useEffect(() => {
    if (addAddressData) {
      setAddresses((prev: any[]) => [...prev, addAddressData]);
      toast({
        type: "success",
        title: "Амжилттай",
        description: successMessage || updateSuccess || "",
      });
      onClose();
    } else if (updateAddressData) {
      //   setAddresses((prev: any[]) =>
      //     prev.map((item) => {
      //       if (item.id === updateAddressData?.id) {
      //         // item.phoneNumber = updateAddressData?.phone;
      //         // item.district = updateAddressData?.districtid;
      //         // item.khoroo = updateAddressData?.teamid;
      //         // item.moreInfo = updateAddressData?.address || "";
      //         // item.address = updateAddressData?.address || "";
      //         // item.cityid = updateAddressData?.cityid || "";
      //         // item.teamid = updateAddressData?.teamid || "";
      //         // item.province = updateAddressData?.cityid || "";
      //         // item.terminal = updateAddressData?.terminalid || "";
      //         item = updateAddressData;
      //       }
      //     })
      //   );
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === updateAddressData.id ? updateAddressData : item
        )
      );

      // Reset form and UI state after successful update
      formik.resetForm();
      setShowAddressForm(false);
      setIsEditing(false);
      setEditingAddressId(null);
      toast({
        type: "success",
        title: "Амжилттай",
        description: successMessage || updateSuccess || "",
      });
      onClose();
    }
  }, [addAddressData, updateAddressData]);
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent maxW={760}>
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
                <Text variant="subtitle3">Хөдөө орон нутаг</Text>
                <Text variant="caption">
                  Таны захиалгын хаягйин дагуу хүргэж өгнө.
                </Text>
              </VStack>
            </HStack>
          </HStack>
          <Divider />

          {isUb ? <UbZone formik={formik} /> : <Province formik={formik} />}

          <Button
            w="full"
            onClick={() => {
              if (isEditing) {
                updateAddress({
                  addressid: formik.values.id,
                  country: isUb ? "city" : "countryside",
                  phone: formik.values.phoneNumber,
                  address: formik.values.moreInfo,
                  cityid: isUb ? "1" : formik.values.province,
                  districtid: formik.values.district,
                  teamid: formik.values.khoroo,
                  terminalid: formik.values.terminal,
                });
              } else {
                formik.handleSubmit();
              }
            }}
            isLoading={addLoader || updateLoader}
            variant="navy"
          >
            Хаяг нэмэх
          </Button>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
