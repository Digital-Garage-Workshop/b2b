"use client";
import { CarInfoCard, HorizontalPartCard, PartCard } from "@/components";
import { grey200, grey500 } from "@/theme/colors";
import { Grid, HStack, Stack, Text, VStack } from "@chakra-ui/react";
import {
  IconArrowsSort,
  IconLayoutGridFilled,
  IconMenu2,
} from "@tabler/icons-react";
import { useState } from "react";

const data = [
  { name: "Дугуй", image: "/home/tires.svg" },
  { name: "Рулийн хүрд", image: "/home/tires.svg" },
  { name: "Хөдөлгүүр", image: "/home/tires.svg" },
  { name: "Арын тэнхлэг", image: "/home/tires.svg" },
  { name: "Дугуй", image: "/home/tires.svg" },
  { name: "Рулийн хүрд", image: "/home/tires.svg" },
  { name: "Хөдөлгүүр", image: "/home/tires.svg" },
  { name: "Арын тэнхлэг", image: "/home/tires.svg" },
];

export const ProductPagination = () => {
  const [isListView, setListView] = useState(false);
  return (
    <VStack align="flex-start" gap={6} w="full">
      <HStack w="full" gap={6}>
        <CarInfoCard />
        <CarInfoCard />
      </HStack>
      <HStack w="full" justify="space-between">
        <HStack p="6px 16px" borderRadius={8} border={`1px solid ${grey200}`}>
          <IconArrowsSort size={16} color={grey500} />
          <Text fontSize={12}>Sort by:</Text>
          <select
            style={{
              fontSize: 12,
              outline: "none",
              border: "none",
              MozAppearance: "none",
              WebkitAppearance: "none",
              appearance: "none",
              cursor: "pointer",
            }}
            className="selection"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </HStack>
        <HStack>
          <Stack
            w={6}
            h={6}
            align="center"
            justify="center"
            border={`1px solid ${grey200}`}
            borderRadius={4}
            bg={!isListView ? "white" : "black"}
            cursor={"pointer"}
            onClick={() => setListView(true)}
          >
            <IconMenu2 size={16} color={isListView ? "white" : "black"} />
          </Stack>
          <Stack
            w={6}
            h={6}
            align="center"
            justify="center"
            border={`1px solid ${grey200}`}
            borderRadius={4}
            bg={isListView ? "white" : "black"}
            cursor={"pointer"}
            onClick={() => setListView(false)}
          >
            <IconLayoutGridFilled
              color={!isListView ? "white" : "black"}
              size={16}
            />
          </Stack>
        </HStack>
      </HStack>
      <Grid
        w="full"
        templateColumns={isListView ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
        gap={6}
      >
        {data.map((item, index) =>
          isListView ? (
            <HorizontalPartCard key={index} />
          ) : (
            <PartCard item={item} key={index} />
          )
        )}
      </Grid>
    </VStack>
  );
};
