"use client";
import { DeleteUserAddress, GetUserAddresses } from "@/_services/user";
import { UseApi, useCustomToast } from "@/hooks";
import { grey100, grey50, grey500, grey600 } from "@/theme/colors";
import {
  Button,
  HStack,
  Image,
  Skeleton,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  IconEdit,
  IconPackage,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { useEffect, useState } from "react";
import { AddUserAddressModal } from "./AddUserAddressModal";

export const UserAddresses = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [addresses, setAddresses] = useState<any[]>([]);
  const [editingAddress, setEditingAddress] = useState<any | null>(null);
  const [deletedid, setDelid] = useState<number | null>(null);
  const toast = useCustomToast();

  const [{ data: userAddress, isLoading: userAddressLoader }, getUserAddress] =
    UseApi({
      service: GetUserAddresses,
      useAuth: true,
    });

  const [
    { data: delData, isLoading: delloader, successMessage, error },
    delUserAddress,
  ] = UseApi({
    service: DeleteUserAddress,
    useAuth: true,
  });

  const handleDelete = async (id: number) => {
    setDelid(id);
    await delUserAddress({ addressid: id });
  };

  useEffect(() => {
    getUserAddress();
  }, []);

  useEffect(() => {
    if (userAddress) {
      setAddresses(userAddress);
    }
  }, [userAddress]);

  useEffect(() => {
    if (successMessage) {
      setAddresses((prev) => prev.filter((item) => item.id !== deletedid));
      toast({
        type: "success",
        title: "Амжилттай",
        description: successMessage || "",
      });
    } else if (error) {
      toast({
        type: "error",
        title: "Уучлаарай",
        description: error || "",
      });
    }
  }, [successMessage, error]);

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
        <Text variant="h7">Хүргэлтийн хаяг</Text>
        <Button
          variant="navy"
          leftIcon={<IconPlus />}
          onClick={() => {
            setIsEditing(false);
            onOpen();
          }}
        >
          Хаяг нэмэх
        </Button>
      </HStack>

      {userAddressLoader ? (
        <VStack w="full">
          {[1, 2, 3, 4].map((item) => (
            <Skeleton
              key={item}
              w="full"
              startColor={grey50}
              endColor={grey100}
              height="52px"
            />
          ))}
        </VStack>
      ) : addresses?.length > 0 ? (
        <VStack w="full" align="flex-start" spacing={4}>
          {addresses.map((address: any, index: number) => (
            <HStack
              w="full"
              justify="space-between"
              key={address.addressid || index}
            >
              <HStack gap={4}>
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
                  //   onClick={() => handleEditAddress(address)}
                  onClick={() => {
                    setIsEditing(true);
                    setEditingAddress(address);
                    onOpen();
                  }}
                >
                  Засах
                </Button>
                <Button
                  variant="secondary"
                  p={"6px"}
                  borderRadius={"full"}
                  onClick={() => handleDelete(address.id)}
                  isLoading={delloader && address.id === deletedid}
                >
                  <IconTrash />
                </Button>
              </HStack>
            </HStack>
          ))}
        </VStack>
      ) : (
        <VStack w="full" gap={3} alignItems="center" justify="center">
          <Image src="/empty.svg" width={356} height={356} />
          <Text fontSize="lg" fontWeight="medium">
            Хаяг олдсонгүй!
          </Text>
          <Text color={grey500} textAlign="center" maxW={400}>
            Танд хадгалсан хаяг одоогоор байхгүй байна.
          </Text>
        </VStack>
      )}
      <AddUserAddressModal
        isOpen={isOpen}
        onClose={onClose}
        isEditing={isEditing}
        setAddresses={setAddresses}
        address={editingAddress}
        setIsEditing={setIsEditing}
      />
    </VStack>
  );
};
