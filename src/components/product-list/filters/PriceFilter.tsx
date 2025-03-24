"use client";
import { grey100, grey300, primary } from "@/theme/colors";
import {
  HStack,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export const PriceFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]);

  const handleChange = (values: [number, number]) => {
    setPriceRange(values);
  };
  return (
    <VStack
      p="8px 16px"
      w="full"
      bg="white"
      borderRadius={8}
      height={isExpanded ? 120 : 54}
      overflow={"hidden"}
      transition="height 200ms ease-in-out"
    >
      <HStack
        py={2.5}
        w="full"
        justify="space-between"
        cursor="pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <Text variant="subtitle3">Үнэ</Text>
        {isExpanded ? <IconMinus size={16} /> : <IconPlus size={16} />}
      </HStack>
      <RangeSlider
        aria-label={["min", "max"]}
        min={0}
        max={500000}
        step={1000}
        value={priceRange}
        onChange={handleChange}
        colorScheme={primary}
      >
        <RangeSliderTrack bg={grey100} height={"6px"}>
          <RangeSliderFilledTrack bg={primary} />
        </RangeSliderTrack>
        <RangeSliderThumb
          boxSize={5}
          index={0}
          bg="white"
          border={`6px solid ${primary}`}
        />
        <RangeSliderThumb
          boxSize={5}
          index={1}
          bg="white"
          border={`6px solid ${primary}`}
        />
      </RangeSlider>

      <HStack mt={2} spacing={2} w="full">
        <Input
          value={priceRange[0]}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setPriceRange([+e.target.value, priceRange[1]]);
          }}
          type="number"
          min={0}
          max={priceRange[1]}
          border="1px solid #E2E8F0"
          borderRadius={8}
          w="50%"
          fontSize={12}
          fontWeight="bold"
          p={2}
          h="26px"
        />
        <Stack w={4} h="1px" bg={grey300} />
        <Input
          value={priceRange[1]}
          onChange={(e) => {
            e.preventDefault();
            e.stopPropagation();
            setPriceRange([priceRange[0], +e.target.value]);
          }}
          type="number"
          min={priceRange[0]}
          max={500000}
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={2}
          h="26px"
          w="50%"
          fontSize={12}
          fontWeight="bold"
        />
      </HStack>
    </VStack>
  );
};
