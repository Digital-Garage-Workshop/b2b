"use client";
import { grey100, grey200, grey700, primary, success } from "@/theme/colors";
import {
  Button,
  Checkbox,
  HStack,
  Highlight,
  Image,
  Input,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus, IconX } from "@tabler/icons-react";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Branches } from "../product-detail";
import { useSession } from "next-auth/react";
import { formatCurrency } from "@/utils";

export const ExcelCard = () => {
  const { data: session } = useSession();
  const [quantity, setQuantity] = useState(4);
  return (
    <HStack
      w="full"
      borderRadius={8}
      border={`1px solid ${grey200}`}
      p={4}
      gap="56px"
      boxShadow="0px 4px 8px -4px rgba(16, 24, 40, 0.05)"
    >
      <HStack gap={4} flex={1}>
        <Checkbox />
        <Image
          src={
            //   item.images?.imgurl800 ||
            //   item.images?.imgurl400 ||
            "/home/ridex.svg"
          }
          height={151}
          objectFit="contain"
          w={136}
        />
        <VStack gap={2} align="flex-start">
          <HStack>
            <Text variant="subtitle2">OEM:</Text>
            <Text bg={primary} color="white" variant="subtitle2">
              1862O0009P
            </Text>
          </HStack>
          <Text variant="title1">
            {/* {item?.brandname}
                          {item?.category} */}
            RIDEX PLUS Engine Oil
          </Text>
          <Text fontSize={14}>Article Number: SM9913</Text>
          <Text fontSize={14}>
            <Highlight query="5300" styles={{ fontWeight: 700 }}>
              Нийт 5300 машинд тохирно
            </Highlight>
          </Text>

          {/* {item?.warranty && ( */}
          <Text variant="body3">
            <Highlight query="Баталгаат хугацаа:" styles={{ fontWeight: 700 }}>
              Баталгаат хугацаа: 3 жил
            </Highlight>
          </Text>
          {/* )} */}
        </VStack>
      </HStack>
      <Stack height={140} w="1px" bg={grey200} />
      <HStack flex={1}>
        <HStack p={1} borderRadius={16} bg={grey100}>
          <Stack
            p={1}
            borderRadius="full"
            bg="white"
            cursor="pointer"
            onClick={() => {
              if (quantity > 2) setQuantity((prev) => prev - 1);
            }}
          >
            <IconMinus color={primary} size={13} />
          </Stack>
          <Input
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
            variant="ghost"
            maxW="30px"
            alignItems={"center"}
            textAlign="center"
            h={6}
            p={0}
            fontWeight={600}
          />
          <Stack
            p={1}
            borderRadius="full"
            bg="white"
            cursor="pointer"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            <IconPlus color={primary} size={13} />
          </Stack>
        </HStack>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                style={{ padding: "0px 16px", fontSize: 14, fontWeight: 400 }}
              >
                ID:
              </TableHead>
              <TableHead
                style={{ padding: "0px 16px", fontSize: 14, fontWeight: 400 }}
              >
                Ширхэг:
              </TableHead>
              <TableHead
                style={{ padding: "0px 16px", fontSize: 14, fontWeight: 400 }}
              >
                Үнэ:
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell
                style={{
                  padding: "10px 16px",
                  fontSize: 16,
                  fontWeight: 600,
                }}
              >
                FQ-10
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 16px",
                }}
              >
                <HStack gap={1}>
                  {[1, 2, 3, 4, 5].map((blocks) => (
                    <Stack
                      key={blocks}
                      w={1}
                      h={3}
                      borderRadius={8}
                      bg={7 > (7 / 5) * blocks ? success : grey200}
                    />
                  ))}
                </HStack>
              </TableCell>
              <TableCell
                style={{
                  padding: "10px 0px 10px 16px",
                  width: "fit-content",
                }}
              >
                <VStack gap={0} align="flex-start" w="fit-content">
                  <Text variant="h7">
                    {session ? formatCurrency(115000) : "****"}
                  </Text>
                  <Text fontSize={12} fontWeight={500} color={grey700}>
                    НӨАТ багтсан үнэ
                  </Text>
                </VStack>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <Button borderRadius="full" variant="filled">
          <IconX />
        </Button>
      </HStack>
    </HStack>
  );
};
