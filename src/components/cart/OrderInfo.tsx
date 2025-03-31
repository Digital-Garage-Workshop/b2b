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
  VStack,
} from "@chakra-ui/react";
import { IconCircleCheck, IconInfoCircle } from "@tabler/icons-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export const OrderInfo = ({
  total,
  selectedAddress,
  items,
}: {
  total: number;
  selectedAddress: string;
  items: number;
}) => {
  const [isOrganization, setOrganization] = useState(false);
  const [regNumber, setRegNumber] = useState("");
  const router = useRouter();
  const toast = useCustomToast();

  const [
    { data: createPaymentData, isLoading: createDataLoader, errData, error },
    createOrder,
  ] = UseApi({
    service: CreatePayment,
    useAuth: true,
  });

  const [{ data: regData, isLoading: regDataLoader }, companyFetch] = UseApi({
    service: GetCompanyRegister,
    useAuth: true,
  });

  const handleCreateData = () => {
    createOrder({
      etype: isOrganization ? "corporate" : "personal",
      addressid: selectedAddress,
      register: regNumber,
      corporatename: regData?.name,
    });
  };

  useEffect(() => {
    if (createPaymentData) {
      router.push(`/payment?order=${createPaymentData?.id}`);
    } else if (error) {
      toast({
        type: "error",
        title: "Уучлаарай",
        description: error,
      });
    }
  }, [createPaymentData]);
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
      <VStack gap={4} w="full">
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
      <Button w="full" onClick={handleCreateData}>
        Үргэлжлүүлэх
      </Button>
      <HStack bg={warning50} borderRadius={8} p="10px" align="flex-start">
        <IconInfoCircle size={24} color={warning600} />
        <Text color={warning600} variant="body3" w="90%">
          Та Хүргэлтээр болон Очиж авах захиалгуудыг хамтад нь захиалах
          боломжгүйг анхаарна уу.
        </Text>
      </HStack>
    </VStack>
  );
};
