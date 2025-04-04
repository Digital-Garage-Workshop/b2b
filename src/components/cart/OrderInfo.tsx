"use client";
import { GetCompanyRegister } from "@/_services";
import { CreatePayment } from "@/_services/user";
import { UseApi, useCustomToast } from "@/hooks";
import { EbarimtIcon } from "@/icons";
import { grey200, textDefault, warning50, warning600 } from "@/theme/colors";
import { formatCurrency } from "@/utils";
import {
  Button,
  Divider,
  FormControl,
  FormHelperText,
  FormLabel,
  HStack,
  Input,
  InputGroup,
  InputRightElement,
  Radio,
  RadioGroup,
  Spinner,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import {
  IconAlertTriangle,
  IconCircleCheck,
  IconInfoCircle,
} from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ConsultModal } from "../global";

export const OrderInfo = ({
  total,
  selectedAddress,
  items,
  showReg,
  createDataLoader,
  handleCreateData,
  hasInventoryErrors,
}: {
  total: number;
  selectedAddress: string;
  items: number;
  showReg: boolean;
  createDataLoader?: boolean;
  handleCreateData: (
    isOrganization: boolean,
    regNumber: string,
    regData?: any
  ) => void;
  hasInventoryErrors?: boolean;
}) => {
  const [isOrganization, setOrganization] = useState(false);
  const [regNumber, setRegNumber] = useState("");
  const router = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [{ data: regData, isLoading: regDataLoader }, companyFetch] = UseApi({
    service: GetCompanyRegister,
    useAuth: true,
  });

  const toast = useCustomToast();

  const createData = () => {
    handleCreateData(isOrganization, regNumber, regData);
  };

  return (
    <VStack
      flex={2}
      p={4}
      gap={6}
      align="flex-start"
      border={`1px solid ${grey200}`}
      borderRadius={8}
    >
      <Text variant="h8">Таны захиалга:</Text>
      <VStack gap={4} w="full" display={showReg ? "flex" : "none"}>
        <HStack gap={2} w="full" alignSelf="flex-start">
          <EbarimtIcon />
          <Text fontWeight={700}>И-Баримт</Text>
        </HStack>
        <RadioGroup
          value={isOrganization ? "organization" : "individual"}
          onChange={(value) => {
            setOrganization(value === "organization");
          }}
          w="100%"
        >
          <VStack w="full" alignSelf="flex-start">
            <Radio
              colorScheme="primary"
              value="individual"
              alignSelf="flex-start"
            >
              <Text fontSize={14} fontWeight={700} color="#1E1E1E">
                Хувь хүн
              </Text>
            </Radio>
            <Radio
              colorScheme="primary"
              value="organization"
              alignSelf="flex-start"
            >
              <Text fontSize={14} fontWeight={700} color="#1E1E1E">
                Байгууллага
              </Text>
            </Radio>
          </VStack>
        </RadioGroup>
        {isOrganization && (
          <VStack w="full" align="flex-start">
            <FormControl w="full" isRequired>
              <FormLabel fontSize={14}>Байгууллагын регистр</FormLabel>
              <InputGroup>
                <Input
                  name="organizationName"
                  onChange={(e) => {
                    if (e.target.value.length > 6) {
                      companyFetch({ regnumber: e.target.value });
                    }
                  }}
                  placeholder="Байгууллагын регистр  оруулна уу"
                  focusBorderColor="#F75B00"
                  borderColor="#CFCFCF"
                />
                <InputRightElement>
                  {regDataLoader ? <Spinner size="sm" /> : null}
                  {regData ? <IconCircleCheck /> : null}
                </InputRightElement>
              </InputGroup>
              <FormHelperText>{regData?.name}</FormHelperText>
            </FormControl>
          </VStack>
        )}
      </VStack>
      <VStack gap={2} w="full">
        <HStack w="full" justify="space-between">
          <Text variant="body2" color={textDefault}>
            Бараа тоо:
          </Text>
          <Text variant="body2" color={textDefault}>
            {items} ширхэг
          </Text>
        </HStack>
        <HStack w="full" justify="space-between">
          <Text variant="body2" color={textDefault}>
            Хүргэлт:
          </Text>
          <Text variant="body2" color={textDefault}>
            6’000₮
          </Text>
        </HStack>
      </VStack>
      <Divider variant="dashed" my={-2} />

      <HStack w="full" justify="space-between">
        <Text variant="subtitle2" color={textDefault}>
          Нийт төлөх үнэ:
        </Text>
        <Text variant="h7" color={textDefault}>
          {formatCurrency(total)}
        </Text>
      </HStack>
      <Button
        w="full"
        onClick={() => {
          if (showReg) {
            if (selectedAddress) {
              onOpen();
            } else {
              toast({
                type: "error",
                title: "Уучлаарай",
                description: "Та хүргэлтийг хаягийг эхлээд сонгоно уу.",
              });
            }
          } else {
            router.push("/cart/address");
          }
        }}
      >
        Үргэлжлүүлэх
      </Button>
      <HStack bg={warning50} borderRadius={8} p="10px" align="flex-start">
        <IconInfoCircle size={24} color={warning600} />
        <Text color={warning600} variant="body3" w="90%">
          Та Хүргэлтээр болон Очиж авах захиалгуудыг хамтад нь захиалах
          боломжгүйг анхаарна уу.
        </Text>
      </HStack>
      <ConsultModal
        isOpen={isOpen}
        onClose={onClose}
        buttonStr="Төлбөр төлөх"
        buttonLoader={createDataLoader}
        iconBg="#FFFAEB"
        icon={<IconAlertTriangle color="#DC6803" size={29} />}
        buttonAction={createData}
        title="Захиалга үүсэх гэж байна"
        desc="Та төлбөр төлөх гэж дарснаар таны захиалга үүсэж агуулахын тоо ширхэгээс хасагдах болно. Хэрэв та захиалгаа 3 удаа төлбөр төлөлгүй орхисон тохиолдолд манайхаас таныг блоклох болно."
      />
    </VStack>
  );
};
