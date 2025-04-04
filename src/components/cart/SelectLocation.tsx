"use client";
import { grey200, grey600, primary } from "@/theme/colors";
import {
  Button,
  Divider,
  HStack,
  Radio,
  RadioGroup,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  IconEdit,
  IconInfoCircle,
  IconTrash,
  IconTruckDelivery,
} from "@tabler/icons-react";
import { Dispatch, SetStateAction, useEffect, useMemo, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { UseApi } from "@/hooks";
import {
  AddUserAddress,
  DeleteUserAddress,
  GetUserAddresses,
  UpdateAddress,
} from "@/_services/user";
import { UbZone } from "./UbZone";
import { Province } from "./Province";

export const SelectLocation = ({
  selectedAddress,
  setSelectedAddress,
}: {
  selectedAddress: string;
  setSelectedAddress: Dispatch<SetStateAction<string>>;
}) => {
  const [isUb, setIsUb] = useState(true);

  const [showAddressForm, setShowAddressForm] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);

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
        teamid: yup.string().required("Баг сонгоно уу"),
        terminal: yup.string().required("Терминал сонгоно уу"),
        phoneNumber: yup.string().required("Утас оруулна уу"),
        moreInfo: yup.string().max(200),
      });
    }
  }, [isUb]);

  const [{ data: userAddress, isLoading: userAddressLoader }, getUserAddress] =
    UseApi({
      service: GetUserAddresses,
      useAuth: true,
    });

  const [{ data: addAddressData, isLoading: addLoader }, addUserAddress] =
    UseApi({
      service: AddUserAddress,
      useAuth: true,
    });

  const [{ data: updateAddressData, isLoading: updateLoader }, updateAddress] =
    UseApi({
      service: UpdateAddress,
      useAuth: true,
    });

  const [{ data: delData, isLoading: delloader }, delUserAddress] = UseApi({
    service: DeleteUserAddress,
    useAuth: true,
  });
  const formik = useFormik({
    initialValues: {
      phoneNumber: "",
      district: "",
      khoroo: "",
      moreInfo: "",
      address: "",
      cityid: "",
      teamid: "",
      terminal: "",
      province: "",
      id: "",
    },
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
        setIsEditing(false);
        setEditingAddressId(null);
        getUserAddress();
      } catch (error) {
        console.error("Error in form submission:", error);
      }
    },
  });

  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(() => {
    if (userAddress?.length > 0 && !selectedAddress) {
      setSelectedAddress(userAddress[0].id || "0");
    }
  }, [userAddress, selectedAddress]);

  const handleAddAddress = () => {
    setShowAddressForm(true);
    setIsEditing(false);
    formik.resetForm();
  };

  const handleCancelAdd = () => {
    setShowAddressForm(false);
    setIsEditing(false);
    setEditingAddressId(null);
    formik.resetForm();
  };

  const handleEditAddress = (address: any) => {
    const addressIsUb = address.country === "city";
    setIsUb(addressIsUb);

    formik.setValues({
      id: address.id || "",
      phoneNumber: address.phone || "",
      district: address.districtid || "",
      khoroo: address.teamid || "",
      moreInfo: address.address || "",
      address: address.address || "",
      cityid: address.cityid || "",
      teamid: address.teamid || "",
      province: addressIsUb ? "" : address.cityid || "",
      terminal: address.terminalid || "",
    });

    setIsEditing(true);
    setEditingAddressId(address.id);
    setShowAddressForm(true);
  };

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
            <Text variant="subtitle3">Хөдөө орон нутаг</Text>
            <Text variant="caption">
              Таны захиалгын хаягйин дагуу хүргэж өгнө.
            </Text>
          </VStack>
        </HStack>
      </HStack>
      <Divider />

      {userAddress?.length > 0 && (
        <RadioGroup
          w="full"
          value={selectedAddress}
          onChange={setSelectedAddress}
        >
          <VStack w="full" align="flex-start" spacing={4}>
            {userAddress.map((address: any, index: number) => (
              <HStack
                w="full"
                justify="space-between"
                key={address.addressid || index}
              >
                <HStack gap={4}>
                  <Radio
                    value={address.id || index.toString()}
                    colorScheme="orange"
                  />
                  <VStack align="flex-start">
                    <Text variant="subtitle3">
                      {address?.cityname},{address?.districtname},
                      {address?.teamname}
                    </Text>
                    <Text variant="body3">{address?.phone}</Text>
                  </VStack>
                </HStack>
                <HStack>
                  <Button
                    variant="secondary"
                    leftIcon={<IconEdit size={20} color={grey600} />}
                    color={grey600}
                    onClick={() => handleEditAddress(address)}
                  >
                    Засах
                  </Button>
                  <Button
                    variant="secondary"
                    p={"6px"}
                    borderRadius={"full"}
                    onClick={() => delUserAddress({ addressid: address.id })}
                  >
                    <IconTrash />
                  </Button>
                </HStack>
              </HStack>
            ))}
          </VStack>
        </RadioGroup>
      )}

      {showAddressForm && (
        <>
          <Divider />
          {isUb ? <UbZone formik={formik} /> : <Province formik={formik} />}
        </>
      )}

      <HStack align="flex-start">
        <IconInfoCircle color={grey600} size={24} />
        <Text variant="body3" color={grey600}>
          Та тухайн өдрийн 16:00 цагаас хойш захиалга хийсэн бол захиалга нь
          маргааш нь хүргэлтэнд гарах болно.
        </Text>
      </HStack>

      {showAddressForm ? (
        <HStack w="full" spacing={4}>
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
            {isEditing ? "Шинэчлэх" : "Хадгалах"}
          </Button>
          <Button w="full" variant="outline" onClick={handleCancelAdd}>
            Цуцлах
          </Button>
        </HStack>
      ) : (
        <Button w="full" onClick={handleAddAddress} variant="navy">
          Хаяг нэмэх
        </Button>
      )}
    </VStack>
  );
};
