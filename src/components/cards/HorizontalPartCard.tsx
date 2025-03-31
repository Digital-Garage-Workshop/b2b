"use client";
import { grey200 } from "@/theme/colors";
import {
  Button,
  Divider,
  Highlight,
  HStack,
  Image,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Branches } from "../product-detail";
import Link from "next/link";
import { useSession } from "next-auth/react";

export const HorizontalPartCard = (props: { item: any }) => {
  const { item } = props;
  const { data: session } = useSession();
  return (
    <Link style={{ width: "100%" }} href={`/product-detail/${item.articleid}`}>
      <HStack
        w="full"
        borderRadius={8}
        border={`1px solid ${grey200}`}
        p={4}
        justify="space-between"
        align={"flex-start"}
      >
        <HStack gap={4}>
          <Image
            src={
              item.images?.imgurl800 ||
              item.images?.imgurl400 ||
              "/home/ridex.svg"
            }
            height={151}
            objectFit="contain"
            w={136}
          />
          <VStack gap={2} align="flex-start">
            {item.brandlogo && (
              <Image
                src={
                  item.brandlogo?.imgurl400 ||
                  item.brandlogo?.imgurl200 ||
                  "/home/ridexlogo.svg"
                }
                width="52px"
                objectFit="contain"
              />
            )}
            <Text variant="subtitle2">{item?.articleid}</Text>
            <Text variant="title1">
              {item?.brandname}
              {item?.category}
            </Text>
            <Text variant="body3">{item?.frontattribute}</Text>
            <Text fontSize={14}>
              <Highlight query="5300" styles={{ fontWeight: 700 }}>
                Нийт 5300 машинд тохирно
              </Highlight>
            </Text>
            <Text fontSize={14}>Article Number: {item?.articleid}</Text>
            {item?.warranty && (
              <Text variant="body3">
                <Highlight
                  query="Баталгаат хугацаа:"
                  styles={{ fontWeight: 700 }}
                >
                  Баталгаат хугацаа: 3 жил
                </Highlight>
              </Text>
            )}
          </VStack>
        </HStack>
        <HStack gap={4} align={"flex-start"} w={324}>
          <Divider orientation="vertical" height={187} />
          <VStack
            flex={1}
            maxW={300}
            align={"flex-start"}
            gap={"19px"}
            filter={session ? "none" : "blur(5px)"}
          >
            <VStack gap="10px" w="full" h={"140px"}>
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
              {item?.inventories
                ?.slice(0, 2)
                ?.map((branch: any, index: number) => (
                  <div key={index} className="flex flex-col gap-[10px] w-full">
                    <Branches branch={branch} product={item} />
                    {item?.inventories.length > 1 && index < 1 && (
                      <HStack w="full" overflow={"hidden"} gap={1}>
                        {Array(24)
                          .fill("")
                          .map((_, index) => (
                            <Stack
                              height="1px"
                              flex={1}
                              bg={grey200}
                              key={index}
                            />
                          ))}
                      </HStack>
                    )}
                  </div>
                ))}
            </VStack>
            <Button w="full" variant="outline" textDecor="underline">
              Өөр {item?.inventories?.length - 2 || ""} саналыг харах
            </Button>
          </VStack>
        </HStack>
      </HStack>
    </Link>
  );
};
