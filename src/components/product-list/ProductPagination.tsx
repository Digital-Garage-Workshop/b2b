"use client";
import { GetProducts } from "@/_services";
import { CarInfoCard, HorizontalPartCard, PartCard } from "@/components";
import { UseApi } from "@/hooks";
import { grey100, grey200, grey50, grey500 } from "@/theme/colors";
import {
  Button,
  Grid,
  GridItem,
  HStack,
  Skeleton,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  IconArrowLeft,
  IconArrowRight,
  IconArrowsSort,
  IconLayoutGridFilled,
  IconMenu2,
  IconPackage,
} from "@tabler/icons-react";
import { useParams, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";

export const ProductPagination = () => {
  const [isListView, setListView] = useState(false);
  const [page, setPage] = useState(1);

  const { categoryid } = useParams() as { categoryid: string };
  const searchParams = useSearchParams();
  const brandno = searchParams?.get("brandno") || null;
  const carid = searchParams?.get("car") || null;
  const currentSubCategory = searchParams?.get("sub");
  // const cars = useSelector((state: { cars: any }) => state.cars.cars);

  const [
    { data: products, isLoading: productLoader, pagination: productPagination },
    getProducts,
  ] = UseApi({
    service: GetProducts,
    useAuth: true,
  });

  useEffect(() => {
    const fetchProducts = () => {
      const params = {
        categoryid: currentSubCategory || categoryid,
        brandno,
        carid,
        page,
      };

      getProducts(params);
    };

    if (currentSubCategory || categoryid) {
      fetchProducts();
    }
  }, [categoryid, brandno, carid, page, currentSubCategory]);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const toggleView = (isListMode: boolean) => {
    setListView(isListMode);
  };

  const renderPaginationButtons = () => {
    if (!productPagination) return null;

    return (
      <HStack spacing={1} w="full" justify="space-between" mt={4}>
        <Button
          onClick={() => handlePageChange(page - 1)}
          isDisabled={page === 1}
          variant="ghost"
          w="fit-content"
          leftIcon={<IconArrowLeft />}
        >
          Өмнөх
        </Button>

        <HStack gap={1}>
          {Array.from({ length: productPagination.last_page }, (_, i) => {
            const pageNum = i + 1;
            const isCurrentPage = pageNum === productPagination.current_page;
            const isFirstOrLastPage =
              pageNum === 1 || pageNum === productPagination.last_page;
            const isNearCurrentPage =
              pageNum >= productPagination.current_page - 1 &&
              pageNum <= productPagination.current_page + 1;

            if (isFirstOrLastPage || isNearCurrentPage) {
              return (
                <Button
                  w="fit-content"
                  key={pageNum}
                  onClick={() => handlePageChange(pageNum)}
                  variant={isCurrentPage ? "solid" : "ghost"}
                  colorScheme={isCurrentPage ? "blue" : "gray"}
                  p="10px"
                >
                  {pageNum}
                </Button>
              );
            }

            if (
              pageNum === productPagination.current_page - 2 ||
              pageNum === productPagination.current_page + 2
            ) {
              return <Text key={pageNum}>...</Text>;
            }

            return null;
          })}
        </HStack>

        <Button
          w="fit-content"
          onClick={() => handlePageChange(page + 1)}
          isDisabled={
            !productPagination.next_page_url ||
            page === productPagination.last_page
          }
          variant="ghost"
          rightIcon={<IconArrowRight />}
        >
          Дараах
        </Button>
      </HStack>
    );
  };

  const renderSkeletons = () => {
    return Array(4)
      .fill(0)
      .map((_, index) => (
        <Skeleton
          key={index}
          startColor={grey100}
          endColor={grey50}
          height={561}
          width="100%"
          borderRadius={8}
        />
      ));
  };

  const renderEmptyState = () => {
    return (
      <GridItem colSpan={3}>
        <VStack w="full" py={10} gap={3} alignItems="center" justify="center">
          <IconPackage size={64} color={grey500} />
          <Text fontSize="lg" fontWeight="medium">
            Бүтээгдэхүүн олдсонгүй
          </Text>
          <Text color={grey500} textAlign="center" maxW={400}>
            Таны хайсан шүүлтүүрээр бүтээгдэхүүн олдсонгүй. Өөр шүүлтүүрээр хайж
            үзнэ үү.
          </Text>
        </VStack>
      </GridItem>
    );
  };

  return (
    <VStack align="flex-start" gap={6} w="full" minH="100vh">
      {/* {cars && (
        <Grid w="full" templateColumns="repeat(2, 1fr)">
          {cars?.map((car: any, index: number) => (
            <GridItem key={index} w="full">
              <CarInfoCard car={car} />
            </GridItem>
          ))}
        </Grid>
      )} */}

      <HStack w="full" justify="space-between">
        <HStack p="6px 16px" borderRadius={8} border={`1px solid ${grey200}`}>
          <IconArrowsSort size={16} color={grey500} />
          <Text fontSize={12}>Sort by:</Text>
          <select
            style={{
              fontSize: 12,
              outline: "none",
              border: "none",
              MozAppearance: "none",
              WebkitAppearance: "none",
              appearance: "none",
              cursor: "pointer",
            }}
            className="selection"
          >
            <option value="asc">Asc</option>
            <option value="desc">Desc</option>
          </select>
        </HStack>

        <HStack>
          <Stack
            w={6}
            h={6}
            align="center"
            justify="center"
            border={`1px solid ${grey200}`}
            borderRadius={4}
            bg={isListView ? "black" : "white"}
            cursor="pointer"
            onClick={() => toggleView(true)}
          >
            <IconMenu2 size={16} color={isListView ? "white" : "black"} />
          </Stack>
          <Stack
            w={6}
            h={6}
            align="center"
            justify="center"
            border={`1px solid ${grey200}`}
            borderRadius={4}
            bg={isListView ? "white" : "black"}
            cursor="pointer"
            onClick={() => toggleView(false)}
          >
            <IconLayoutGridFilled
              color={isListView ? "black" : "white"}
              size={16}
            />
          </Stack>
        </HStack>
      </HStack>

      <Grid
        w="full"
        templateColumns={isListView ? "repeat(1, 1fr)" : "repeat(3, 1fr)"}
        gap={6}
      >
        {productLoader
          ? renderSkeletons()
          : products?.length > 0
          ? products.map((item: any, index: number) =>
              isListView ? (
                <HorizontalPartCard key={index} item={item} />
              ) : (
                <PartCard item={item} key={index} />
              )
            )
          : renderEmptyState()}
      </Grid>

      {!productLoader && products?.length > 0 && renderPaginationButtons()}
    </VStack>
  );
};
