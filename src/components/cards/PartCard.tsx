import { grey200, grey700, grey800, success } from "@/theme/colors";
import {
  Button,
  Highlight,
  HStack,
  Image,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconShoppingCart } from "@tabler/icons-react";
import { Branches } from "../product-detail";

type PartCard = {
  item: any;
} & StackProps;

export const PartCard = (props: PartCard) => {
  return (
    <VStack
      p={4}
      gap={4}
      borderRadius={8}
      boxShadow="0px 4px 8px -4px rgba(16, 24, 40, 0.05)"
      border={`1px solid ${grey200}`}
      bg="white"
      w="full"
    >
      <HStack h="28px" w="full" justify="space-between">
        <Image src="/home/ridexlogo.svg" width="52px" objectFit="contain" />
      </HStack>
      <Image src="/home/ridex.svg" height={136} w={136} />
      <VStack gap={2} align="flex-start" w="full">
        <Text variant="subtitle2" color={grey800}>
          1862O0009P
        </Text>
        <Text variant="title1">RIDEX PLUS Engine Oil</Text>
        {/* <Text
          variant="body3"
          maxW={"90%"}
          textOverflow="ellipsis"
          overflow="hidden"
          maxHeight={22}
          //   whiteSpace="nowrap"
        >
          Урд тэнхлэгийн тос, Урд тэнхлэгийн тос,йн тосnknlnjknjkm nj kb kn
        </Text> */}
        <Text variant="body3">
          <Highlight query="5300" styles={{ fontWeight: 700 }}>
            Нийт 5300 машинд тохирно
          </Highlight>
        </Text>
      </VStack>
      <VStack gap="10px" w="full" filter={"blur(5px)"}>
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
        {[1, 2].map((item, index) => (
          <div className="w-full flex flex-col gap-[10px]" key={index}>
            <Branches />
            {index < 1 && (
              <HStack w="full" overflow={"hidden"} gap={1}>
                {/* <HStack gap={1} > */}
                {Array(24)
                  .fill("")
                  .map((_, index) => (
                    <Stack height="1px" flex={1} bg={grey200} key={index} />
                  ))}
                {/* </HStack> */}
              </HStack>
            )}
          </div>
        ))}
      </VStack>
      <Button w="full" variant="outline">
        Дэлгэрэнгүй
      </Button>
    </VStack>
  );
};
