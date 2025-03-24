import {
  Attributes,
  BreadCrumb,
  GeneralInfo,
  Offers,
  PartOeNumbers,
  ProductImage,
  SuitableCars,
  TopSellers,
} from "@/components";
import { HStack, VStack } from "@chakra-ui/react";

export default function Page() {
  return (
    <VStack w="full" gap={20} pb={110}>
      <BreadCrumb crumbs={[{ path: "Catalogue", href: "" }]} mb={-14} />
      <HStack w="full" gap={6} align="flex-start">
        <ProductImage />
        <Attributes />
        <Offers />
      </HStack>
      <SuitableCars />
      <PartOeNumbers />
      <GeneralInfo />
      <TopSellers />
    </VStack>
  );
}
