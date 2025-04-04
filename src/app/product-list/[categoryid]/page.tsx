"use client";
import {
  AddCar,
  BrandFilter,
  BreadCrumb,
  CategoryFilter,
  PriceFilter,
  ProductPagination,
} from "@/components";
import { grey100, primary } from "@/theme/colors";
import { Grid, GridItem, HStack, Text, VStack } from "@chakra-ui/react";
import { useRouter, useSearchParams } from "next/navigation";

export default function Page() {
  const searchParams = useSearchParams();
  const part = searchParams?.get("part");
  const router = useRouter();

  const handleClear = () => {
    const searchParams = new URLSearchParams(window.location.search);
    searchParams?.delete("minPrice");
    searchParams?.delete("maxPrice");
    searchParams?.delete("brand");
    searchParams?.delete("brandname");
    searchParams?.delete("car");
    searchParams?.delete("sub");

    const newQueryString = searchParams?.toString();

    if (newQueryString) {
      router.push(`?${newQueryString}`);
    } else {
      router.push(window.location.pathname);
    }
  };
  return (
    <VStack w="full" pb={110} align="flex-start" gap={6} mt="54px">
      <BreadCrumb crumbs={[{ path: "Product List", href: "" }]} mb={-2} />
      <Text variant="h6">{part}</Text>
      <Grid templateColumns={"repeat(7, 1fr)"} gap={6} w="full">
        <GridItem colSpan={2}>
          <VStack p="16px 8px" bg={grey100} borderRadius={8} w="full">
            <HStack w="full" px={4} justify="space-between">
              <Text variant="subtitle2">Шүүлтүүр</Text>
              <Text
                variant="body3"
                color={primary}
                onClick={handleClear}
                cursor="pointer"
              >
                Цэвэрлэх
              </Text>
            </HStack>
            <CategoryFilter />
            <AddCar />
            <BrandFilter />
            <PriceFilter />
          </VStack>
        </GridItem>
        <GridItem colSpan={5}>
          <ProductPagination />
        </GridItem>
      </Grid>
    </VStack>
  );
}
