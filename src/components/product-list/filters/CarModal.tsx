"use client";
import {
  Stack,
  VStack,
  Text,
  HStack,
  Divider,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Skeleton,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  Select,
  Textarea,
} from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import Link from "next/link";
import { addCar } from "@/redux/slices/carSlice";
import { useDispatch } from "react-redux";

type CarModalProps = {
  isOpen: boolean;
  onClose: () => void;
  data: any;
  plate: string;
};

export const CarModal = (props: CarModalProps) => {
  const { isOpen, onClose, data, plate } = props;
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent p="24px" maxW={488} mt={170} mx={{ base: 4, md: 0 }}>
        <VStack gap={6} w="full">
          <Text variant="h8">Та автомашины мэдээллээ шалгана уу!</Text>
          <Image
            width={440}
            height={180}
            alt="car"
            src={
              data?.carimage?.imgurl800 ||
              data?.carimage?.imgurl400 ||
              "/rixe.svg"
            }
          />
          <VStack w="full">
            <HStack w="full" justify="space-between">
              <Text variant="subtitle3">Улсын дугаар:</Text>
              <Text variant="body3">{plate}</Text>
            </HStack>
            <HStack w="full" justify="space-between">
              <Text variant="subtitle3">Үйлдвэрлэгч:</Text>
              <Text variant="body3">{data?.manuname}</Text>
            </HStack>{" "}
            <HStack w="full" justify="space-between">
              <Text variant="subtitle3">Модел:</Text>
              <Text variant="body3">{data?.modelname}</Text>
            </HStack>{" "}
            <HStack w="full" justify="space-between">
              <Text variant="subtitle3">Хөдөлгүүр:</Text>
              <Text variant="body3">
                {data?.carname}
                {data?.motortype}
                {data?.motorcode}
              </Text>
            </HStack>
          </VStack>
          <HStack w="full">
            <Button variant="outline" flex={1} onClick={onClose}>
              Биш
            </Button>
            <Button
              flex={1}
              onClick={() => {
                dispatch(
                  addCar({
                    carid: data?.carid.toString(),
                    manuName: data?.manuname,
                    modelName: data?.modelname,
                    engine: data?.carname,
                    plate: plate,
                    vin: null,
                  })
                );
                // router.push(`?car=${data?.carid}`);
                const searchParams = new URLSearchParams(
                  window.location.search
                );

                searchParams.set("car", data?.carid);

                router.push(`?${searchParams.toString()}`);
                onClose();
              }}
            >
              Мөн, үргэлжлүүлэх
            </Button>
          </HStack>
        </VStack>
      </ModalContent>
    </Modal>
  );
};
