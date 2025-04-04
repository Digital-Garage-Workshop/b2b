"use client";
import { GetPriceFilter } from "@/_services";
import { UseApi } from "@/hooks";
import { grey100, grey300, primary } from "@/theme/colors";
import {
  HStack,
  Input,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconMinus, IconPlus } from "@tabler/icons-react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const PriceFilter = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 0]);
  const [sliderValue, setSliderValue] = useState<[number, number]>([0, 0]);
  const searchParams = useSearchParams();
  const params = useParams();
  const router = useRouter();
  const categoryid = params?.categoryid as string;
  const carid = searchParams?.get("car") || null;
  const brandno = searchParams?.get("brand") || null;
  const currentSubCategory = searchParams?.get("sub");

  const [{ data: prices, isLoading: priceLoader }, getPrices] = UseApi({
    service: GetPriceFilter,
  });

  const handleSliderChange = (values: [number, number]) => {
    setSliderValue(values);
  };

  const handleChangeComplete = (values: [number, number]) => {
    setPriceRange(values);
    updateURLWithPriceRange(values);
  };

  const updateURLWithPriceRange = (values: [number, number]) => {
    const params = new URLSearchParams(window.location.search);
    params.set("minPrice", values[0].toString());
    params.set("maxPrice", values[1].toString());
    const newUrl = params.toString()
      ? `${window.location.pathname}?${params.toString()}`
      : window.location.pathname;
    router.replace(newUrl, { scroll: false });
  };

  const handleOpen = async () => {
    setIsExpanded((prev) => !prev);
    if (isExpanded) {
      const searchParams = new URLSearchParams(window.location.search);
      searchParams.delete("minPrice");
      searchParams.delete("maxPrice");

      const newQueryString = searchParams.toString();

      if (newQueryString) {
        const newUrl = newQueryString
          ? `${window.location.pathname}?${newQueryString}`
          : window.location.pathname;
        router.replace(newUrl, { scroll: false });
      } else {
        router.push(window.location.pathname);
      }
    } else {
      await getPrices({
        carid: carid,
        categoryid: currentSubCategory || categoryid,
      });
    }
  };

  const handleMinInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = +e.target.value;
    const newRange: [number, number] = [newMin, priceRange[1]];
    setSliderValue(newRange);
  };

  const handleMaxInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = +e.target.value;
    const newRange: [number, number] = [priceRange[0], newMax];
    setSliderValue(newRange);
  };

  const handleInputBlur = () => {
    setPriceRange(sliderValue);
    updateURLWithPriceRange(sliderValue);
  };

  useEffect(() => {
    const minPrice = searchParams?.get("minPrice");
    const maxPrice = searchParams?.get("maxPrice");

    if (minPrice && maxPrice && prices) {
      const min = Math.max(parseInt(minPrice), prices?.minprice || 0);
      const max = Math.min(parseInt(maxPrice), prices?.maxprice || 100000);
      setPriceRange([min, max]);
      setSliderValue([min, max]);
    }
  }, [searchParams, prices]);

  useEffect(() => {
    if (prices) {
      const newRange: [number, number] = [prices?.minprice, prices?.maxprice];
      setPriceRange(newRange);
      setSliderValue(newRange);
    }
  }, [prices]);

  useEffect(() => {
    if (isExpanded) {
      getPrices({
        carid: carid,
        categoryid: currentSubCategory || categoryid,
      });
    }
  }, [currentSubCategory, categoryid]);

  return (
    <VStack
      p="8px 16px"
      w="full"
      bg="white"
      borderRadius={8}
      height={isExpanded ? 120 : 54}
      overflow={"hidden"}
      transition="height 200ms ease-in-out"
    >
      <HStack
        py={2.5}
        w="full"
        justify="space-between"
        cursor="pointer"
        onClick={handleOpen}
      >
        <Text variant="subtitle3">Үнэ</Text>
        {isExpanded ? <IconMinus size={16} /> : <IconPlus size={16} />}
      </HStack>
      <RangeSlider
        aria-label={["min", "max"]}
        min={prices?.minprice || 0}
        max={prices?.maxprice || 0}
        step={1000}
        value={sliderValue}
        onChange={handleSliderChange}
        onChangeEnd={handleChangeComplete}
        colorScheme={primary}
      >
        <RangeSliderTrack bg={grey100} height={"6px"}>
          <RangeSliderFilledTrack bg={primary} />
        </RangeSliderTrack>
        <RangeSliderThumb
          boxSize={5}
          index={0}
          bg="white"
          border={`6px solid ${primary}`}
        />
        <RangeSliderThumb
          boxSize={5}
          index={1}
          bg="white"
          border={`6px solid ${primary}`}
        />
      </RangeSlider>

      <HStack mt={2} spacing={2} w="full">
        <Input
          value={sliderValue[0]}
          onChange={handleMinInputChange}
          onBlur={handleInputBlur}
          type="number"
          min={prices?.minprice || 0}
          max={sliderValue[1]}
          border="1px solid #E2E8F0"
          borderRadius={8}
          w="50%"
          fontSize={12}
          fontWeight="bold"
          p={2}
          h="26px"
        />
        <Stack w={4} h="1px" bg={grey300} />
        <Input
          value={sliderValue[1]}
          onChange={handleMaxInputChange}
          onBlur={handleInputBlur}
          type="number"
          min={sliderValue[0]}
          max={prices?.maxprice || 500000}
          border="1px solid #E2E8F0"
          borderRadius="md"
          p={2}
          h="26px"
          w="50%"
          fontSize={12}
          fontWeight="bold"
        />
      </HStack>
    </VStack>
  );
};
