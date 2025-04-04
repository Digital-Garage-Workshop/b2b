"use client";
import { GetPartBrands } from "@/_services";
import { BreadCrumb } from "@/components";
import { UseApi } from "@/hooks";
import { grey600 } from "@/theme/colors";
import { Grid, Image, Stack, Text, VStack } from "@chakra-ui/react";
import { useEffect } from "react";

export default function Page() {
  const [{ data: brands, isLoading: brandLoader }, getBrands] = UseApi({
    service: GetPartBrands,
  });

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <VStack w="full" gap={6} minH="100vh" pb="100px">
      <BreadCrumb crumbs={[{ path: "Catalogue", href: "" }]} mb={-2} />
      <VStack w="full" align="flex-start">
        <Text variant="h5">Бүх брэндүүд</Text>
        <Text variant="body1" color={grey600}>
          Эдийн дугаар, тоо хэмжээ бүхий файлыг байршуулах
        </Text>
      </VStack>
      <Grid w="full" gap={8} templateColumns={"repeat(6, 1fr)"}>
        {brands?.map((item: any, index: number) => (
          <Stack
            flex={1}
            key={index}
            h="72px"
            align="center"
            justify={"center"}
          >
            <Image
              src={item?.img?.imgurl400 || item?.img?.imgurl400 || "/ridex.svg"}
              alt={`slide-${index}`}
              h="87px"
              objectFit="contain"
            />
          </Stack>
        ))}
      </Grid>
    </VStack>
  );
}
