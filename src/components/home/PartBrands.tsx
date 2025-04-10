"use client";
import { grey100 } from "@/theme/colors";
import {
  Box,
  Button,
  Flex,
  Image,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { motion } from "framer-motion";
import { UseApi } from "@/hooks";
import { Brands, GetPartBrands } from "@/_services";
import { useEffect } from "react";
import Link from "next/link";

type PartCategories = {} & StackProps;

export const PartBrands = (props: PartCategories) => {
  const { ...restProps } = props;
  const [{ data: brands, isLoading: brandLoader }, getBrands] = UseApi({
    service: GetPartBrands,
  });
  const MotionFlex = motion.create(Flex);

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <VStack w="full" gap={8} align="center" {...restProps}>
      <Stack w={10} h="3px" bg="#F75B00" />
      <Text variant="h5">Чанараар баталгаажсан Брэндүүд</Text>

      <VStack gap="15px" w="full" pos="relative">
        <Box overflow="hidden" width="100%" position="relative">
          <MotionFlex
            as="div"
            width="200%"
            animate={{ x: ["0%", "-100%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
            display="flex"
            gap={"15px"}
          >
            {brands?.splice(0, 14)?.map((src: any, index: number) => (
              <Stack
                flex={1}
                key={index}
                h="72px"
                align="center"
                justify={"center"}
                border={`1px solid ${grey100}`}
                borderRadius={8}
                boxShadow="0px 1px 4px 0px rgba(25, 33, 61, 0.08)"
              >
                <Image
                  src={
                    src?.img?.imgurl400 || src?.img?.imgurl200 || "/globe.svg"
                  }
                  alt={`slide-${index}`}
                  h={12}
                  objectFit="contain"
                />
              </Stack>
            ))}
          </MotionFlex>
        </Box>
        <Box overflow="hidden" width="100%" position="relative">
          <MotionFlex
            as="div"
            width="200%"
            animate={{ x: ["-50%", "50%"] }}
            transition={{
              ease: "linear",
              duration: 20,
              repeat: Infinity,
            }}
            display="flex"
            gap={"15px"}
          >
            {brands?.splice(0, 14)?.map((src: any, index: number) => (
              <Stack
                key={index}
                flex={1}
                h="72px"
                align="center"
                justify={"center"}
                border={`1px solid ${grey100}`}
                borderRadius={8}
                boxShadow="0px 1px 4px 0px rgba(25, 33, 61, 0.08)"
              >
                <Image
                  src={
                    src?.img?.imgurl400 || src?.img?.imgurl200 || "/globe.svg"
                  }
                  alt={`slide-${index}`}
                  h={12}
                  objectFit="contain"
                />
              </Stack>
            ))}
          </MotionFlex>
        </Box>
        <Stack
          pos={"absolute"}
          bg="linear-gradient(-90deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(-90deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)"
          right={0}
          top={0}
          h={160}
          w={"30%"}
        />
        <Stack
          bg="linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%), linear-gradient(90deg, #FFF 0%, rgba(255, 255, 255, 0.00) 100%)"
          // transform={"rotate(180deg)"}
          pos={"absolute"}
          left={0}
          top={0}
          h={160}
          w={"30%"}
        />
      </VStack>
      <Link href="/brand">
        <Button variant="outline" rightIcon={<IconChevronDown />} mt={4}>
          Бүх брэнд харах
        </Button>
      </Link>
    </VStack>
  );
};
