"use client";
import {
  Button,
  Divider,
  Highlight,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { useState } from "react";

const attrs = [
  { attributename: "Manufacturer", attributevalue: "Ridex" },
  { attributename: "Manufacturer", attributevalue: "Ridex" },
  { attributename: "Manufacturer", attributevalue: "Ridex" },
  { attributename: "Manufacturer", attributevalue: "Ridex" },
];

export const Attributes = () => {
  const [showMore, setShowMore] = useState(false);
  const [branchShow, setBranchShow] = useState(false);
  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  //   const attributes = Array.isArray(data?.attributes) ? data?.attributes : [];

  const attributesToShow =
    // showMore ?
    attrs;
  // : attributes.slice(0, 3);

  return (
    <VStack align="flex-start" w="36%">
      <Text variant="subtitle2">1862O0009P</Text>
      <Text variant="h7">RIDEX PLUS Engine Oil</Text>
      <VStack gap={2} w="full">
        {attributesToShow.map((attribute: any, index: number) => {
          return (
            <VStack gap={2} w="full" key={index}>
              <HStack w="full" align="start">
                <Text
                  fontSize={14}
                  fontWeight={600}
                  // flexBasis="160px"
                  alignSelf="flex-start"
                  flexShrink={0}
                >
                  {`${attribute.attributename}:`}
                </Text>

                <Text
                  fontSize={14}
                  // ml="32px"
                  sx={{ wordBreak: "break-word" }}
                  // flex="1"
                >
                  {attribute.attributevalue}
                </Text>
              </HStack>
              {index !== attributesToShow.length - 1 && (
                <Divider borderColor="#CFCFCF" />
              )}
            </VStack>
          );
        })}
        <Divider borderColor="#CFCFCF" />
        <VStack
          gap={2}
          w="full"
          //   display={data?.description ? "flex" : "none"}
          maxH={showMore ? "1000px" : "100px"}
          transition="max-height 0.5s ease-in-out"
          overflow="hidden"
          textOverflow="ellipsis"
        >
          <HStack w="full" align="start">
            <Text fontSize={14} alignSelf="flex-start">
              <Highlight
                query="Дэлгэрэнгүй:"
                styles={{ fontWeight: 600 }}
              >{`Дэлгэрэнгүй: {data?.description} Description: 2.2 D (952AEM250, 952AEA250) (46335975, 55275156, 55284636), year of manufacture 08.2018 - ..., 2143 cc, 160 hp 2.2 D (952AEM250, 952AEA250) (46335975, 55275156, 55284636), year of manufacture 08.2018 - ..., 2143 cc, 160 hp 2.2 D (952AEM250, 952AEA250) (46335975, 55275156, 55284636), year of manufacture 08.2018 - ..., 2143 cc, 160 hp... Description: 2.2 D (952AEM250, 952AEA250) (46335975, 55275156, 55284636), year of manufacture 08.2018 - ..., 2143 cc, 160 hp 2.2 D `}</Highlight>
            </Text>
          </HStack>
          <Divider borderColor="#CFCFCF" />
        </VStack>

        <Button
          //   display={data?.description ? "flex" : "none"}
          p="8px 14px"
          rightIcon={<IconChevronDown color="#1e1e1e" size={20} />}
          variant="ghost"
          alignSelf="center"
          onClick={handleShowMore}
        >
          {showMore ? "Хураах" : "Илүүг харах"}
        </Button>
      </VStack>
    </VStack>
  );
};
