"use client";
import { grey500 } from "@/theme/colors";
import {
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export const BrandFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <VStack
      p="8px 16px"
      w="full"
      bg="white"
      borderRadius={8}
      height={isExpanded ? 350 : 54}
      overflow={"hidden"}
      transition="height 400ms ease-in-out"
    >
      <HStack
        py={2.5}
        w="full"
        justify="space-between"
        cursor="pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <Text variant="subtitle3">Брэндүүд</Text>
        {isExpanded ? <IconMinus size={16} /> : <IconPlus size={16} />}
      </HStack>
      <InputGroup>
        <InputLeftElement>
          <IconSearch color={grey500} size={20} />
        </InputLeftElement>
        <Input placeholder="Search brand" pl={8} />
      </InputGroup>
      <VStack gap={0} w="full" maxH={228} overflow="scroll">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <HStack py={2} w="full" key={index}>
            <Image w={8} h={6} src="/image.svg" />
            <Text variant="subtitle3">Runs</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
