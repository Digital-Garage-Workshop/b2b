"use client";
import { GetPartDetail } from "@/_services";
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
import { UseApi } from "@/hooks";
import { HStack, useEditable, VStack } from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const { articleid } = useParams() as { articleid: string };

  const [
    { data: productDetail, isLoading: productDetailLoader },
    getProductDetail,
  ] = UseApi({
    service: GetPartDetail,
    useAuth: true,
  });

  useEffect(() => {
    getProductDetail({ articleid });
  }, []);

  return (
    <VStack w="full" gap={20} pb={110}>
      <BreadCrumb crumbs={[{ path: "Catalogue", href: "" }]} mb={-14} />
      <HStack w="full" gap={6} align="flex-start">
        <ProductImage
          images={productDetail?.partimages}
          brandlogo={productDetail?.brandlogo}
        />
        <Attributes product={productDetail} />
        <Offers
          inventories={productDetail?.inventories}
          product={productDetail}
        />
      </HStack>
      <SuitableCars />
      <PartOeNumbers />
      <GeneralInfo />
      <TopSellers />
    </VStack>
  );
}
