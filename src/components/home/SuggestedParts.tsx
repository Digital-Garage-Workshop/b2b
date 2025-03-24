import { grey600 } from "@/theme/colors";
import { Grid, GridItem, Stack, Text, VStack } from "@chakra-ui/react";
import { PartCard } from "../cards";
const data = [
  { name: "Дугуй", image: "/home/tires.svg" },
  { name: "Рулийн хүрд", image: "/home/tires.svg" },
  { name: "Хөдөлгүүр", image: "/home/tires.svg" },
  { name: "Арын тэнхлэг", image: "/home/tires.svg" },
];

export const SuggestedParts = () => {
  return (
    <VStack w="full" gap={4} align="center" pos="relative" h={700}>
      <Stack backgroundImage={"/decoration.svg"} h={201} w={236} />
      <VStack w="full" pos="absolute" top={0} h={201}>
        <Stack w={10} h="3px" bg="#F75B00" />
        <Text variant="h5">Discover a world of products </Text>
        <Text maxW={564} textAlign="center" color={grey600} variant="body1">
          Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
          egestas morbi sem vulputate etiam facilisis.
        </Text>
      </VStack>
      <Grid w="full" mt={6} templateColumns="repeat(4, 1fr)" gap={6}>
        {data.map((item, index) => (
          <GridItem key={index} w="full">
            <PartCard item={item} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};
