import { Grid, GridItem, Text, VStack } from "@chakra-ui/react";
import { PartCard } from "../cards";
const data = [
  { name: "Дугуй", image: "/home/tires.svg" },
  { name: "Рулийн хүрд", image: "/home/tires.svg" },
  { name: "Хөдөлгүүр", image: "/home/tires.svg" },
  { name: "Арын тэнхлэг", image: "/home/tires.svg" },
];

export const TopSellers = () => {
  return (
    <VStack w="full" gap={6} align="flex-start">
      <Text variant="h5">Top sellers in your country</Text>
      <Grid w="full" templateColumns="repeat(4, 1fr)" gap={6}>
        {data.map((item, index) => (
          <GridItem key={index}>
            <PartCard item={item} />
          </GridItem>
        ))}
      </Grid>
    </VStack>
  );
};
