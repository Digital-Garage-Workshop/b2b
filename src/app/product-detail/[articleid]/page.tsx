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
import { grey100, grey50 } from "@/theme/colors";
import { HStack, Skeleton, useEditable, VStack } from "@chakra-ui/react";
import { useSession } from "next-auth/react";
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
    <VStack w="full" gap={20} pb={110} mt="54px">
      <BreadCrumb crumbs={[{ path: "Catalogue", href: "" }]} mb={-14} />
      {productDetailLoader ? (
        <HStack w="full" gap={6} align="flex-start">
          <Skeleton
            flex={1}
            h={404}
            borderRadius={16}
            startColor={grey50}
            endColor={grey100}
          />
          <Skeleton
            flex={1}
            h={404}
            borderRadius={16}
            startColor={grey50}
            endColor={grey100}
          />
          <Skeleton
            flex={1}
            h={404}
            borderRadius={16}
            startColor={grey50}
            endColor={grey100}
          />
        </HStack>
      ) : (
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
      )}

      <SuitableCars />
      <PartOeNumbers />
      <GeneralInfo />
      <TopSellers />
    </VStack>
  );
}
