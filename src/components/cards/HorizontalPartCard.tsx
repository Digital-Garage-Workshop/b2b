import { grey200 } from "@/theme/colors";
import {
  Button,
  Divider,
  Highlight,
  HStack,
  Image,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Branches } from "../product-detail";

export const HorizontalPartCard = () => {
  return (
    <HStack
      w="full"
      borderRadius={8}
      border={`1px solid ${grey200}`}
      p={4}
      justify="space-between"
      align={"flex-start"}
    >
      <HStack gap={4}>
        <Image src="/home/ridex.svg" w={136} h={151} objectFit={"contain"} />
        <VStack gap={2} align="flex-start">
          <Image src="/home/ridexlogo.svg" w={78} h={6} objectFit={"contain"} />
          <Text variant="subtitle2">1862O0009P</Text>
          <Text variant="title1">RIDEX PLUS Engine Oil</Text>
          <Text variant="body3">
            Урд тэнхлэгийн тос, Урд тэнхлэгийн тос,йн{" "}
          </Text>
          <Text fontSize={14}>
            <Highlight query="5300" styles={{ fontWeight: 700 }}>
              Нийт 5300 машинд тохирно
            </Highlight>
          </Text>
          <Text fontSize={14}>Article Number: SM9913</Text>
        </VStack>
      </HStack>
      <HStack gap={4} align={"flex-start"} w={324}>
        <Divider orientation="vertical" height={187} />
        <VStack flex={1} maxW={300} align={"flex-start"} gap={"19px"}>
          <VStack gap="10px" w="full">
            <HStack w="full" gap={0}>
              <Text w={"22%"} variant="caption" textAlign={"start"}>
                ID:
              </Text>
              <Text w={"27%"} variant="caption" textAlign={"start"}>
                Ширхэг:
              </Text>
              <Text w={"50%"} variant="caption" textAlign={"start"}>
                Үнэ:
              </Text>
            </HStack>
            <Branches />
            <Divider />
            <Branches />
          </VStack>
          <Button w="full" variant="outline" textDecor="underline">
            Өөр 8 саналыг харах
          </Button>
        </VStack>
      </HStack>
    </HStack>
  );
};
