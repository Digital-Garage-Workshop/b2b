import { useState } from "react";
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
} from "@chakra-ui/react";

const PriceRangeSlider = () => {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]); // Default min/max

  const handleChange = (values: [number, number]) => {
    setPriceRange(values);
  };

  return (
    <Box p={4} bg="white" borderRadius="md" boxShadow="sm">
      {/* Title and Expand Button */}
      <HStack justify="space-between" mb={4}>
        <Text fontSize="md" fontWeight="bold">
          Үнэ
        </Text>
        <Text cursor="pointer" fontSize="lg">
          —
        </Text>
      </HStack>

      {/* Slider */}
      <RangeSlider
        aria-label={["min", "max"]}
        min={0}
        max={500000}
        step={1000}
        value={priceRange}
        onChange={handleChange}
        colorScheme="orange"
      >
        <RangeSliderTrack bg="gray.200">
          <RangeSliderFilledTrack bg="orange.500" />
        </RangeSliderTrack>
        <RangeSliderThumb
          boxSize={5}
          index={0}
          bg="white"
          border="2px solid orange"
        />
        <RangeSliderThumb
          boxSize={5}
          index={1}
          bg="white"
          border="2px solid orange"
        />
      </RangeSlider>

      {/* Price Inputs */}
      <HStack mt={4} spacing={2}>
        <Input
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          type="number"
          min={0}
          max={priceRange[1]}
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={2}
        />
        <Text>—</Text>
        <Input
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          type="number"
          min={priceRange[0]}
          max={500000}
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={2}
        />
      </HStack>
    </Box>
  );
};

export default PriceRangeSlider;
