import { Checkbox, HStack, Text, VStack } from "@chakra-ui/react";
import { IconPlus } from "@tabler/icons-react";

export const CategoryFilter = () => {
  return (
    <VStack p="8px 16px" w="full" bg="white" borderRadius={8}>
      <HStack py={2} w="full" justify="space-between">
        <Text variant="subtitle3">Sub Category</Text>
        <IconPlus size={16} />
      </HStack>
      <VStack gap={0} w="full" maxH={228} overflow="scroll">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, index) => (
          <HStack py={2} w="full" gap={4} key={index}>
            <Checkbox />
            <Text variant="subtitle3">Sub Category</Text>
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
