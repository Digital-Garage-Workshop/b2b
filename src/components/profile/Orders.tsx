"use client";
import { GetOrders, GetUserAddresses } from "@/_services/user";
import { UseApi } from "@/hooks";
import { grey100, grey200, grey50, grey500, primary } from "@/theme/colors";
import {
  Button,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconChevronRight, IconSearch } from "@tabler/icons-react";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency } from "@/utils";
import Link from "next/link";

const status = [
  "Бүгд",
  "Зээлээр",
  "Төлбөр хүлээгдэж буй",
  "Төлбөр төлсөн",
  "Хүргэгдсэн",
  "Цуцалсан",
  "Түүх",
];

const invoices = [
  {
    invoice: "#780",
    paymentStatus: "2024/10/03  11:32",
    totalAmount: "2’000’000₮",
    paymentMethod: "Хүлээгдэж байна",
  },
  {
    invoice: "#781",
    paymentStatus: "2024/10/03  11:32",
    totalAmount: "2’000’000₮",
    paymentMethod: "Төлөгдсөн",
  },
  {
    invoice: "#782",
    paymentStatus: "2024/10/03  11:32",
    totalAmount: "2’000’000₮",
    paymentMethod: "Цуцлагдсан",
  },
  {
    invoice: "#783",
    paymentStatus: "2024/10/03  11:32",
    totalAmount: "2’000’000₮",
    paymentMethod: "Цуцлагдсан",
  },
  {
    invoice: "#784",
    paymentStatus: "2024/10/03  11:32",
    totalAmount: "2’000’000₮",
    paymentMethod: "Төлөгдсөн",
  },
  {
    invoice: "#785",
    paymentStatus: "2024/10/03  11:32",
    totalAmount: "2’000’000₮",
    paymentMethod: "Төлөгдсөн",
  },
  {
    invoice: "#786",
    paymentStatus: "2024/10/03  11:32",
    totalAmount: "2’000’000₮",
    paymentMethod: "Хүлээгдэж байна",
  },
];

export const Orders = () => {
  const [selected, setSelected] = useState("Бүгд");
  const [{ data: orders, isLoading: orderLoader }, getOrders] = UseApi({
    service: GetOrders,
    useAuth: true,
  });

  useEffect(() => {
    getOrders();
  }, []);
  return (
    <VStack
      w="full"
      p={4}
      gap={6}
      borderRadius={8}
      border={`1px solid ${grey100}`}
      boxShadow="0px 2px 24px -4px rgba(16, 24, 40, 0.02)"
      align="flex-start"
    >
      <HStack w="full" justify="space-between">
        <Text variant="h7">Захиалгууд</Text>
        <InputGroup maxW={237}>
          <InputLeftElement>
            <IconSearch size={20} color={grey500} />
          </InputLeftElement>
          <Input
            fontSize={14}
            placeholder="Захиалгын дугаараар хайх"
            pl={8}
            maxW={237}
          />
        </InputGroup>
      </HStack>

      <HStack gap={0}>
        {status?.map((item, index: number) => (
          <Button
            key={index}
            variant="ghost"
            p="8px 16px"
            onClick={() => {
              setSelected(item);
            }}
            borderRadius={0}
            borderBottom={`1px solid ${selected === item ? primary : grey200}`}
          >
            <Text
              variant="subtitle3"
              color={selected === item ? primary : grey500}
            >
              {item}
            </Text>
          </Button>
        ))}
      </HStack>
      {orderLoader ? (
        <VStack w="full">
          <Skeleton w="full" startColor={grey100} endColor={grey50} h={20} />
          <Skeleton w="full" startColor={grey100} endColor={grey50} h={20} />
          <Skeleton w="full" startColor={grey100} endColor={grey50} h={20} />
          <Skeleton w="full" startColor={grey100} endColor={grey50} h={20} />
        </VStack>
      ) : orders?.length > 0 ? (
        <Table style={{ border: "1px solid #F2F4F7" }}>
          <TableHeader
            style={{
              background: "#F2F4F7",
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              padding: "10px 16px",
              width: "100%",
            }}
          >
            <TableRow
              style={{
                background: "#F2F4F7",
                width: "100%",
              }}
            >
              <TableHead
                className="w-[100px]"
                style={{ padding: "10px 16px", fontSize: 14, fontWeight: 600 }}
              >
                Захиалгийн дугаар
              </TableHead>
              <TableHead
                style={{ padding: "10px 16px", fontSize: 14, fontWeight: 600 }}
              >
                Захиалгийн хийсэн өдөр
              </TableHead>
              <TableHead
                style={{ padding: "10px 16px", fontSize: 14, fontWeight: 600 }}
              >
                Дүн
              </TableHead>
              <TableHead
                style={{ padding: "10px 16px", fontSize: 14, fontWeight: 600 }}
              >
                Төлөв
              </TableHead>
              <TableHead />
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders?.map((order: any) => (
              <TableRow
                key={order.id}
                style={{
                  padding: "10px 16px",
                  fontSize: 14,
                  fontWeight: 600,
                  borderBottom: "1px solid #F2F4F7",
                }}
              >
                <TableCell
                  style={{
                    padding: "10px 16px",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  #{order?.id}
                </TableCell>
                <TableCell
                  style={{
                    padding: "10px 16px",
                    fontSize: 14,
                    fontWeight: 400,
                  }}
                >
                  {order?.created}
                </TableCell>

                <TableCell
                  style={{
                    padding: "10px 16px",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  {formatCurrency(order?.totalamount)}
                </TableCell>
                <TableCell
                  style={{
                    padding: "10px 16px",
                    fontSize: 14,
                    fontWeight: 600,
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      background:
                        order?.status === "created"
                          ? "#FFFAEB"
                          : order?.status === "canceled"
                          ? "#FEF3F2"
                          : "#ECFDF3",
                      color:
                        order?.status === "created"
                          ? "#DC6803"
                          : order?.status === "canceled"
                          ? "#D92D20"
                          : "#039855",

                      padding: "0px 8px",
                      borderRadius: 24,
                      alignItems: "center",
                      justifyContent: "center",
                      width: "fit-content",
                    }}
                  >
                    {order?.status}
                  </div>
                </TableCell>
                <TableCell
                  style={{
                    padding: "10px 16px",
                    fontSize: 13,
                    fontWeight: 700,
                  }}
                >
                  <Link
                    href={`/payment/success?purchase=${order?.id}`}
                    target="_blank"
                  >
                    <Button
                      size="sm"
                      variant="ghost"
                      rightIcon={<IconChevronRight color="#354052" size={16} />}
                    >
                      Дэлгэрэнгүй
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <VStack w="full" gap={3} alignItems="center" justify="center">
          <Image src="/empty.svg" width={356} height={356} />
          <Text fontSize="lg" fontWeight="medium">
            Захиалга олдсонгүй!
          </Text>
          <Text color={grey500} textAlign="center" maxW={400}>
            Танд одоогоор захиалгын түүх байхгүй байна.
          </Text>
        </VStack>
      )}
    </VStack>
  );
};
