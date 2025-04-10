"use client";
import { useState, useEffect } from "react";
import {
  Grid,
  Text,
  VStack,
  GridItem,
  HStack,
  Button,
  Stack,
} from "@chakra-ui/react";
import { IconChevronRight } from "@tabler/icons-react";
import { OemNumber } from "@/_services";
import { UseApi } from "@/hooks";
import { useParams } from "next/navigation";
// import { UseApi } from "@/hooks/useApi";
// import { OeNumber } from "@/services";

const data = [
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
  {
    oemnumber: "OE 2HO 698 151 A",
    brandname: "FORD",
  },
];

export const PartOeNumbers = () => {
  const { articleid } = useParams() as { articleid: string };
  const [{ data, isLoading, error }, fetch] = UseApi({
    service: OemNumber,
  });

  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    if (articleid)
      fetch({
        articleid: articleid,
      });
  }, [articleid]);

  const handleShowMore = () => setShowAll(!showAll);

  const itemsToDisplay = showAll ? data : data?.slice(0, 20);

  return (
    <VStack gap={8} w="100%" display={data?.length ? "flex" : "none"}>
      <VStack gap={2} w="100%" align="flex-start">
        <Text fontSize={24} fontWeight={700} color="#1E1E1E">
          Ориг сэлбэгийн дугаар
        </Text>
        <Text color="#1E1E1E">
          OE лавлах дугаар(ууд) нь оригинал сэлбэгийн дугаартай харьцуулах
          боломжтой:
        </Text>
      </VStack>
      <Grid
        w="full"
        templateColumns={{
          base: `repeat(1, 1fr)`,
          sm: `repeat(2, 1fr)`,
          md: `repeat(3, 1fr)`,
          lg: `repeat(4, 1fr)`,
          xl: `repeat(3, 1fr)`,
        }}
        columnGap="61px"
      >
        {itemsToDisplay?.map((item: any, index: number) => (
          <GridItem key={index}>
            <HStack gap={2}>
              <Text color="#F75B00" fontWeight={600} fontSize={14} as="u">
                {`${item.oemnumber} `}
              </Text>
              <Text color="#F75B00" fontWeight={600} fontSize={14}>
                -
              </Text>
              <Text color="#F75B00" fontWeight={600} fontSize={14} as="u">
                {`${item.brandname}`}
              </Text>
            </HStack>
          </GridItem>
        ))}
      </Grid>
      {data?.length > 20 && (
        <Button
          onClick={handleShowMore}
          colorScheme="orange"
          variant="ghost"
          w={115}
          rightIcon={<IconChevronRight />}
        >
          {showAll ? "Хураах" : "Харах"}
        </Button>
      )}
    </VStack>
  );
};
