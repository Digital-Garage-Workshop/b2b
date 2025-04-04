"use client";
import { GetBrandFilter } from "@/_services";
import { UseApi } from "@/hooks";
import { grey500 } from "@/theme/colors";
import {
  Checkbox,
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus, IconSearch } from "@tabler/icons-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useMemo, useRef } from "react";

export const BrandFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();

  const categoryid = params?.categoryid as string;
  const carid = searchParams?.get("car") || null;
  const currentSubCategory = searchParams?.get("sub");
  const part = searchParams?.get("part");

  // Get selected brands as an array
  const brandParamString = searchParams?.get("brand") || "";
  const selectedBrands = useMemo(() => {
    return brandParamString ? brandParamString.split(",") : [];
  }, [brandParamString]);

  const [{ data: brands = [], isLoading: brandLoader }, fetchBrand] = UseApi({
    service: GetBrandFilter,
  });

  // Filter brands based on search term
  const filteredBrands = useMemo(() => {
    if (!brands || !Array.isArray(brands)) return [];

    return brands.filter((item) =>
      item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [brands, searchTerm]);

  const handleCheckboxChange = (
    e: any,
    brandnumber: string,
    brandname: string
  ) => {
    e.stopPropagation(); // Prevent the outer HStack click event

    const brandNumStr = String(brandnumber);
    const currentParams = new URLSearchParams(window.location.search);

    // Get current selected brands
    const currentBrands = currentParams.get("brand") || "";
    const currentBrandArray = currentBrands ? currentBrands.split(",") : [];
    const currentBrandNames = currentParams.get("brandname") || "";
    const currentBrandNameArray = currentBrandNames
      ? currentBrandNames.split(",")
      : [];

    let newBrandArray;
    let newBrandNameArray;

    const brandIndex = currentBrandArray.indexOf(brandNumStr);
    if (brandIndex !== -1) {
      newBrandArray = [...currentBrandArray];
      newBrandNameArray = [...currentBrandNameArray];
      newBrandArray.splice(brandIndex, 1);
      newBrandNameArray.splice(brandIndex, 1);
    } else {
      newBrandArray = [...currentBrandArray, brandNumStr];
      newBrandNameArray = [...currentBrandNameArray, brandname];
    }

    if (newBrandArray.length === 0) {
      currentParams.delete("brand");
      currentParams.delete("brandname");
    } else {
      currentParams.set("brand", newBrandArray.join(","));
      currentParams.set("brandname", newBrandNameArray.join(","));
    }

    const newQueryString = currentParams.toString();
    const newUrl = newQueryString
      ? `${window.location.pathname}?${newQueryString}`
      : window.location.pathname;

    router.replace(newUrl, { scroll: false });
  };

  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (isExpanded) {
      fetchBrand({
        carid: carid,
        categoryid: currentSubCategory || categoryid,
      });
      // hasFetchedRef.current = true;
    } else if (!isExpanded) {
      // hasFetchedRef.current = false;
    }
  }, [isExpanded, categoryid, currentSubCategory, carid, part]);

  return (
    <VStack
      p="8px 16px"
      w="full"
      bg="white"
      borderRadius={8}
      height={isExpanded ? 350 : 54}
      overflow={"hidden"}
      transition="height 400ms ease-in-out"
    >
      <HStack
        py={2.5}
        w="full"
        justify="space-between"
        cursor="pointer"
        onClick={() => setIsExpanded((prev) => !prev)}
      >
        <Text variant="subtitle3">Брэндүүд</Text>
        {isExpanded ? <IconMinus size={16} /> : <IconPlus size={16} />}
      </HStack>

      <InputGroup>
        <InputLeftElement>
          <IconSearch color={grey500} size={20} />
        </InputLeftElement>
        <Input
          placeholder="Search brand"
          pl={8}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </InputGroup>

      <VStack gap={0} w="full" maxH={228} overflow="auto">
        {filteredBrands.map((item, index) => {
          const isChecked = selectedBrands.includes(String(item.brandno));

          return (
            <HStack py={2} w="full" key={index} cursor="pointer" spacing={3}>
              <Checkbox
                isChecked={isChecked}
                onChange={(e) =>
                  handleCheckboxChange(e, item.brandno, item.name)
                }
                onClick={(e) => e.stopPropagation()}
              />
              <Image
                w={8}
                h={6}
                src={
                  item?.img?.imgurl400 || item?.img?.imgurl200 || "/image.svg"
                }
                objectFit="contain"
                alt={item.name || "brand"}
              />
              <Text
                variant="subtitle3"
                onClick={(e) =>
                  handleCheckboxChange(e, item.brandno, item.name)
                }
              >
                {item.name}
              </Text>
            </HStack>
          );
        })}

        {filteredBrands.length === 0 && !brandLoader && (
          <Text py={4} color={grey500}>
            No brands found
          </Text>
        )}

        {brandLoader && (
          <Text py={4} color={grey500}>
            Loading...
          </Text>
        )}
      </VStack>
    </VStack>
  );
};
