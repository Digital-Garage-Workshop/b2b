import { grey200, grey700, success, textDefault } from "@/theme/colors";
import { Button, HStack, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { IconChevronRight, IconShoppingCart } from "@tabler/icons-react";
import { Branches } from "./Branches";
const banks = [
  {
    svg: "/banks/khanbank.svg",
    name: "Khan Bank",
    desc: "Хэрэглээний лизинг 2.0%",
  },
  {
    svg: "/banks/golomt.svg",
    name: "Golomt Bank",
    desc: "Хэрэглээний лизинг 2.0%",
  },
  {
    svg: "/banks/trade.svg",
    name: "Trade & Development",
    desc: "Хэрэглээний лизинг 2.0%",
  },
  {
    svg: "/banks/storepay.svg",
    name: "StorePay",
    desc: "Хэрэглээний лизинг 2.0%",
  },
  {
    svg: "/banks/pocket.svg",
    name: "Pocket",
    desc: "Хэрэглээний лизинг 2.0%",
  },
];
export const Offers = () => {
  return (
    <VStack gap={6} w={"28%"}>
      <VStack
        w="full"
        borderRadius={26}
        border={`1px solid ${grey200}`}
        boxShadow="0px 2px 8px -4px rgba(16, 24, 40, 0.05)"
        p={4}
        gap={4}
        align="flex-start"
      >
        <Text variant="h8">Саналууд</Text>
        <VStack gap="10px" w="full">
          {[1, 2].map((item, index) => (
            <VStack key={index} gap="10px" w="full">
              <Branches />
              {index < 1 && (
                <HStack gap={1}>
                  {Array(24)
                    .fill("")
                    .map((_, index) => (
                      <Stack
                        height="1px"
                        width={1.5}
                        bg={grey200}
                        key={index}
                      />
                    ))}
                </HStack>
              )}
            </VStack>
          ))}
        </VStack>
      </VStack>
      <VStack
        w="full"
        borderRadius={26}
        border={`1px solid ${grey200}`}
        boxShadow="0px 2px 8px -4px rgba(16, 24, 40, 0.05)"
        p={4}
        gap={4}
        align="flex-start"
      >
        <Text variant="h8">Зээлээр авах төрлүүд</Text>
        <VStack gap={2} w="full">
          {banks.map((item, index) => (
            <HStack
              key={index}
              w="full"
              p="8px 10px"
              gap={2}
              justify="space-between"
              border={`1px solid ${grey200}`}
              borderRadius={16}
              cursor="pointer"
            >
              <HStack>
                <Image src={item.svg} width={8} height={8} />
                <VStack gap={0} align="flex-start">
                  <Text variant="subtitle3" color={textDefault}>
                    {item.name}
                  </Text>
                  <Text variant="caption" color={textDefault}>
                    {item.desc}
                  </Text>
                </VStack>
              </HStack>
              <IconChevronRight />
            </HStack>
          ))}
        </VStack>
      </VStack>
    </VStack>
  );
};
