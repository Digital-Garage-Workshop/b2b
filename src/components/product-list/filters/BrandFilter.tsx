"use client";
import { GetBrandFilter } from "@/_services";
import { UseApi } from "@/hooks";
import { grey500 } from "@/theme/colors";
import {
  HStack,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import {
  IconCheck,
  IconMinus,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const BrandFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const params = useParams();
  const categoryid = params?.categoryid as string;
  const carid = searchParams?.get("car") || null;
  const brandno = searchParams?.get("brand") || null;
  const currentSubCategory = searchParams?.get("sub");

  const [{ data: brands, isLoading: brandLoader }, fetchBrand] = UseApi({
    service: GetBrandFilter,
  });

  const handleClick = (brandnumber: number) => {
    const searchParams = new URLSearchParams(window.location.search);
    if (brandnumber.toString() == brandno) {
      searchParams.delete("brand");

      const newQueryString = searchParams.toString();

      if (newQueryString) {
        router.push(`?${newQueryString}`);
      } else {
        router.push(window.location.pathname);
      }
    } else {
      searchParams.set("brand", brandnumber.toString());

      router.push(`?${searchParams.toString()}`);
    }
  };

  useEffect(() => {
    fetchBrand({ carid: carid, categoryid: currentSubCategory || categoryid });
  }, []);

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
        <Input placeholder="Search brand" pl={8} />
      </InputGroup>
      <VStack gap={0} w="full" maxH={228} overflow="scroll">
        {brands?.map((item: any, index: number) => (
          <HStack
            py={2}
            w="full"
            key={index}
            onClick={() => handleClick(item.brandno)}
            cursor="pointer"
            justify="space-between"
          >
            <HStack>
              <Image
                w={8}
                h={6}
                src={
                  item?.img?.imgurl400 || item?.img?.imgurl200 || "/image.svg"
                }
                objectFit="contain"
                alt={item.name || "brand"}
              />
              <Text variant="subtitle3">{item.name}</Text>
            </HStack>
            {item.brandno.toString() == brandno && <IconCheck size={16} />}
          </HStack>
        ))}
      </VStack>
    </VStack>
  );
};
