"use client";
import { grey200, grey800 } from "@/theme/colors";
import {
  Button,
  Highlight,
  HStack,
  Image,
  Stack,
  StackProps,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Branches } from "../product-detail";
import { useSession } from "next-auth/react";
import { LoginModal } from "../login";
import Link from "next/link";
import { useRouter } from "next/navigation";

type PartCard = {
  item: any;
} & StackProps;

export const PartCard = (props: PartCard) => {
  const { item } = props;
  const { data: session } = useSession();
  const router = useRouter();
  const {
    isOpen: loginIsOpen,
    onClose: loginOnclose,
    onOpen: loginOnOpen,
  } = useDisclosure();
  return (
    <Link
      href={`/product-detail/${item.articleid}?part=${item?.brandname}${item.category}`}
      style={{ width: "100%" }}
    >
      <VStack
        p={4}
        gap={4}
        borderRadius={8}
        boxShadow="0px 4px 8px -4px rgba(16, 24, 40, 0.05)"
        border={`1px solid ${grey200}`}
        bg="white"
        w="full"
      >
        <HStack h="28px" w="full" justify="space-between">
          {item.brandlogo && (
            <Image
              src={
                item.brandlogo?.imgurl400 ||
                item.brandlogo?.imgurl200 ||
                "/home/ridexlogo.svg"
              }
              alt={`${item.brandname} ${item.category}`}
              width="52px"
              objectFit="contain"
              borderRadius="1px solid black"
            />
          )}
        </HStack>
        <Image
          src={
            item.images?.imgurl800 ||
            item.images?.imgurl400 ||
            "/home/ridex.svg"
          }
          alt={`${item.brandname} ${item.category}`}
          height={136}
          w={136}
        />
        <VStack gap={2} align="flex-start" w="full">
          <Text variant="subtitle2" color={grey800}>
            {item.articleid}
          </Text>
          <Text
            variant="title1"
            whiteSpace={"nowrap"}
            w="224px"
            overflow={"hidden"}
            textOverflow="ellipsis"
          >
            {item.brandname} {item.category}
          </Text>
          <Text
            variant="body3"
            w="224px"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            Урд тэнхлэгийн тос, Урд тэнхлэгийн тос,йн тосnknlnjknjkm nj kb kn
          </Text>
          <HStack gap={1}>
            <Text variant="body3">Нийт </Text>
            <Text variant="body3" fontWeight={700}>
              {item?.carquantity}
            </Text>
            <Text variant="body3">машинд тохирно</Text>
          </HStack>

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
        <VStack
          gap="10px"
          w="full"
          filter={session ? "none" : "blur(5px)"}
          minH={142}
        >
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
          {item.inventories?.slice(0, 2).map((branches: any, index: number) => (
            <div className="w-full flex flex-col gap-[10px]" key={index}>
              <Branches product={item} branch={branches} />
              {item.inventories?.length > 1 && index < 1 && (
                <HStack w="full" overflow={"hidden"} gap={1}>
                  {/* <HStack gap={1} > */}
                  {Array(24)
                    .fill("")
                    .map((_, index) => (
                      <Stack height="1px" flex={1} bg={grey200} key={index} />
                    ))}
                  {/* </HStack> */}
                </HStack>
              )}
            </div>
          ))}
        </VStack>

        <Button w="full" variant="outline">
          Дэлгэрэнгүй
        </Button>

        <LoginModal isOpen={loginIsOpen} onClose={loginOnclose} />
      </VStack>
    </Link>
  );
};
