"use client";
import { grey100, grey200, grey50, grey600 } from "@/theme/colors";
import {
  Button,
  Grid,
  Skeleton,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { CategoryCard } from "../cards";
import { Category } from "@/_services";
import { UseApi } from "@/hooks";
import { useEffect } from "react";

type PartCategories = {} & StackProps;

export const PartCategories = (props: PartCategories) => {
  const { ...restProps } = props;
  const [{ data: categories, isLoading: categoryLoader }, getCategories] =
    UseApi({
      service: Category,
    });

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <VStack w="full" gap={4} align="center" {...restProps}>
      <Stack w={10} h="3px" bg="#F75B00" />
      <Text variant="h5">Сэлбэгийн ангилал</Text>
      <Text maxW={564} textAlign="center" color={grey600} variant="body1">
        Бид дэлхийд тэргүүлэгч брэндүүдээс таны хэрэгцээ шаардлагад нийцсэн
        автомашины сэлбэг эд ангийг нийлүүлдэг.
      </Text>
      <Grid w="full" mt={4} templateColumns="repeat(6, 1fr)" gap={6}>
        {categoryLoader
          ? Array(12)
              .fill("")
              .map((_, index: number) => (
                <Skeleton
                  key={index}
                  startColor={grey100}
                  endColor={grey50}
                  borderRadius={8}
                  h={226}
                  w="full"
                />
              ))
          : categories?.map((item: any, index: number) => (
              <CategoryCard key={index} item={item} />
            ))}
      </Grid>
      <Button
        variant="outline"
        rightIcon={<IconChevronDown />}
        mt={4}
        display={categories?.length > 12 ? "flex" : "none"}
      >
        Катлогийн дэлгэрэнгүй
      </Button>
    </VStack>
  );
};
