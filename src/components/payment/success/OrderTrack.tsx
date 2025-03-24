import {
  grey100,
  grey200,
  grey300,
  grey50,
  grey700,
  success,
  success50,
} from "@/theme/colors";
import {
  Box,
  Circle,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  IconCheck,
  IconClock,
  IconPackage,
  IconTruckDelivery,
  IconMapPinCheck,
} from "@tabler/icons-react";

export const OrderTrack = () => {
  const steps = [
    { icon: <IconClock />, isActive: true, isComplete: true },
    { icon: <IconPackage />, isActive: true, isComplete: true },
    { icon: <IconTruckDelivery />, isActive: false, isComplete: false },
    { icon: <IconMapPinCheck />, isActive: false, isComplete: false },
  ];

  // Colors
  const activeColor = useColorModeValue("#0A1929", "#0A1929");
  const inactiveColor = useColorModeValue(grey100, grey100);
  const activeBorderColor = useColorModeValue("#0A1929", "#0A1929");
  const inactiveBorderColor = useColorModeValue(grey100, grey100);
  const completedLineColor = useColorModeValue("#0A1929", "#0A1929");
  const incompleteLineColor = useColorModeValue(grey100, grey100);
  return (
    <VStack
      w="full"
      p={6}
      gap={6}
      border={`1px solid ${grey200}`}
      borderRadius={8}
      boxShadow="0px 2px 8px 0px rgba(16, 24, 40, 0.05)"
      align="flex-start"
    >
      <HStack w="ful" gap={6}>
        <Text variant="h8">#2589</Text>
        <HStack p="2px 8px" bg={success50} borderRadius={8}>
          <IconCheck color={success} size={16} />
          <Text variant="overlineBold" color={success}>
            Төлбөр төлөгдсөн
          </Text>
        </HStack>
      </HStack>
      <HStack w="full" gap={2}>
        <Text variant="body3">Захиалга хийгдсэн огноо:</Text>
        <Text variant="subtitle3">2025/10/21 14:20:10</Text>
      </HStack>
      <VStack
        gap={0}
        w="full"
        borderRadius={16}
        overflow="hidden"
        border={`1px solid ${grey200}`}
      >
        <HStack
          gap={2}
          p={4}
          justify="space-between"
          w="full"
          align="flex-start"
          bg={grey50}
        >
          <HStack gap={3}>
            <VStack gap="3px">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="9"
                viewBox="0 0 8 9"
                fill="none"
              >
                <circle cx="4" cy="4.25" r="4" fill="#F75B00" />
              </svg>
              <Stack w="1px" height="17.5px" bg={grey300} />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="9"
                viewBox="0 0 8 9"
                fill="none"
              >
                <circle cx="4" cy="4.25" r="4" fill="#F75B00" />
              </svg>
            </VStack>
            <VStack gap="10px" align="flex-start">
              <Text variant="subtitle3" color={grey700}>
                Digital Garage warehouse, 13920
              </Text>
              <Text variant="subtitle3" color={grey700}>
                СБД 11-р хороо, Хөгжим бүжиг 13920
              </Text>
            </VStack>
          </HStack>
          <HStack
            p="5px 8px"
            bg="white"
            border={`1px solid ${grey200}`}
            borderRadius={8}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
            >
              <path
                d="M4.19747 1.80015C5.27325 1.80015 6.25298 2.20338 6.99738 2.86823C7.19189 3.04105 7.47284 3.06985 7.69616 2.94024L9.28822 2.02096C9.67483 1.79775 9.68924 1.2457 9.31704 0.998481C8.36612 0.36963 7.22551 0 5.99844 0C2.75429 0 0.115262 2.57061 0 5.78447C0.112861 3.56429 1.94745 1.80015 4.19747 1.80015Z"
                fill="#F75B00"
              />
              <path
                d="M11.8528 4.67076C11.7904 4.39713 11.5478 4.20032 11.2669 4.20032H3.59955C3.59955 4.20032 3.07846 4.20032 3.00883 5.65004C3.00162 5.75804 2.99922 5.87565 2.99922 6.00046C2.99922 6.31249 3.01603 6.57171 3.04725 6.78533C3.17452 7.6806 3.5083 7.78621 3.58514 7.79821H3.59955H7.99392C7.31916 9.21673 5.87358 10.1984 4.19747 10.1984C1.94745 10.2008 0.112861 8.43666 0 6.21648C0.117664 9.52155 2.90557 12.145 6.27219 11.9938C9.34105 11.8569 11.8408 9.37034 11.9921 6.30529C12.0209 5.74124 11.9705 5.194 11.8504 4.67076H11.8528Z"
                fill="#F75B00"
              />
            </svg>
            <Text fontSize={8} fontWeight={500}>
              Digital garage Delivery
            </Text>
          </HStack>
        </HStack>
        <HStack p={4} bg="white" w="full">
          <Box p={0} bg="white" w="full" maxW="full">
            <Flex justify="space-between" align="center" position="relative">
              {/* Horizontal line */}
              <Box
                position="absolute"
                top="45%"
                left="10px"
                right="10px"
                height="8px"
                zIndex={0}
                bg={inactiveBorderColor}
              />

              {/* Completed line */}
              <Box
                position="absolute"
                top="45%"
                left="20px"
                width="45%"
                height="8px"
                zIndex={1}
                bg={completedLineColor}
              />

              {/* Step circles */}
              {steps.map((step, index) => (
                <Flex
                  key={index}
                  direction="column"
                  align="center"
                  justify="center"
                  position="relative"
                  zIndex={2}
                >
                  <Circle
                    size="40px"
                    bg={step.isActive ? activeColor : inactiveColor}
                    border="2px solid"
                    borderColor={
                      step.isActive ? activeBorderColor : inactiveBorderColor
                    }
                    color={step.isActive ? "white" : activeColor}
                  >
                    {step.icon}
                  </Circle>
                </Flex>
              ))}
            </Flex>
          </Box>
        </HStack>
      </VStack>
      <HStack w="full" justify="space-between">
        <VStack align="center">
          <Text variant="caption" color="black">
            Бэлтгэгдэх хугацаа
          </Text>
          <Text variant="overlineBold">2025/10/22 - 2025/10/23</Text>
        </VStack>
        <Stack w="1px" height="42px" bg={grey200} />
        <VStack align="center">
          <Text variant="caption" color="black">
            Агуулахаас гарах хугацаа
          </Text>
          <Text variant="overlineBold">2025/10/22 - 2025/10/23</Text>
        </VStack>
        <Stack w="1px" height="42px" bg={grey200} />
        <VStack align="center">
          <Text variant="caption" color="black">
            Хүргэгдэх хугацаа
          </Text>
          <Text variant="overlineBold">2025/10/22 - 2025/10/23</Text>
        </VStack>
      </HStack>
    </VStack>
  );
};
