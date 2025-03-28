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
import { Brands } from "@/_services";
import { useEffect } from "react";

type PartCategories = {} & StackProps;
const data = [
  { name: "Дугуй", image: "/home/tires.svg" },
  { name: "Рулийн хүрд", image: "/home/tires.svg" },
  { name: "Хөдөлгүүр", image: "/home/tires.svg" },
  { name: "Арын тэнхлэг", image: "/home/tires.svg" },
  { name: "Гар тормоз", image: "/home/tires.svg" },
  { name: "Тоормосны диск", image: "/home/tires.svg" },
  { name: "Гэрлийн чийдэн", image: "/home/tires.svg" },
  { name: "Радиатор", image: "/home/tires.svg" },
  { name: "Хурдны хайрцаг", image: "/home/tires.svg" },
  { name: "Дугуйн обуд", image: "/home/tires.svg" },
  { name: "Шил арчигч", image: "/home/tires.svg" },
  { name: "Утааны яндан", image: "/home/tires.svg" },
  { name: "Моторын таг", image: "/home/tires.svg" },
  { name: "Шатахууны сав", image: "/home/tires.svg" },
  { name: "Тэнхлэг", image: "/home/tires.svg" },
  { name: "Гупер", image: "/home/tires.svg" },
  { name: "Амортизатор", image: "/home/tires.svg" },
  { name: "Жолооны хүрд", image: "/home/tires.svg" },
  { name: "Хажуугийн толь", image: "/home/tires.svg" },
  { name: "Хурдны заалт", image: "/home/tires.svg" },
  { name: "Урд их гэрэл", image: "/home/tires.svg" },
  { name: "Пүрш", image: "/home/tires.svg" },
  { name: "Ремень", image: "/home/tires.svg" },
  { name: "Суудлын бүрээс", image: "/home/tires.svg" },
  { name: "Дотоод гэрэлтүүлэг", image: "/home/tires.svg" },
  { name: "Тоормосны шингэн", image: "/home/tires.svg" },
  { name: "Ус шахагч", image: "/home/tires.svg" },
  { name: "Хурдны хайрцагны тос", image: "/home/tires.svg" },
  { name: "Генератор", image: "/home/tires.svg" },
  { name: "Хөдөлгүүрийн ремень", image: "/home/tires.svg" },
  { name: "Арын гэрэл", image: "/home/tires.svg" },
  { name: "Түлшний насос", image: "/home/tires.svg" },
  { name: "Радиаторын таг", image: "/home/tires.svg" },
  { name: "Гаражийн хаалга", image: "/home/tires.svg" },
  { name: "Агаар шүүгч", image: "/home/tires.svg" },
  { name: "Машины түлхүүр", image: "/home/tires.svg" },
  { name: "Жолоочийн суудал", image: "/home/tires.svg" },
  { name: "Тоормосны наклад", image: "/home/tires.svg" },
  { name: "Яндангийн боолт", image: "/home/tires.svg" },
  { name: "Гар тоормосны татлага", image: "/home/tires.svg" },
  { name: "Хөргөлтийн сэнс", image: "/home/tires.svg" },
  { name: "Жолооны насос", image: "/home/tires.svg" },
  { name: "Гадна толгой", image: "/home/tires.svg" },
  { name: "Капот", image: "/home/tires.svg" },
  { name: "Багажны хайрцаг", image: "/home/tires.svg" },
  { name: "Хяналтын самбар", image: "/home/tires.svg" },
  { name: "Дамжуулгын гол", image: "/home/tires.svg" },
  { name: "Тосны шүүр", image: "/home/tires.svg" },
  { name: "Жолооны дээд гар", image: "/home/tires.svg" },
];

const images = [
  "/image.svg",
  "/whitelogo.svg",
  "/ridex.svg",
  "/image.svg",
  "/whitelogo.svg",
  "/ridex.svg",
  "/image.svg",
];
export const PartBrands = (props: PartCategories) => {
  const { ...restProps } = props;
  const [{ data: brands, isLoading: brandLoader }, getBrands] = UseApi({
    service: Brands,
  });
  const MotionFlex = motion.create(Flex);

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <VStack w="full" gap={4} align="center" {...restProps}>
      <Stack w={10} h="3px" bg="#F75B00" />
      <Text variant="h5">Trusted by top-tier teams worldwide</Text>

      <VStack gap="15px" w="full" pos="relative">
        <Box overflow="hidden" width="100%" position="relative">
          <MotionFlex
            as="div"
            width="200%" // Double width for smooth looping
            animate={{ x: ["0%", "-100%"] }} // Move left continuously
            transition={{
              ease: "linear",
              duration: 20, // Adjust speed
              repeat: Infinity,
            }}
            display="flex"
            gap={"15px"}
          >
            {[...images, ...images].map((src, index) => (
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
                  src={src}
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
            width="200%" // Double width for smooth looping
            animate={{ x: ["-50%", "50%"] }} // Move left continuously
            transition={{
              ease: "linear",
              duration: 20, // Adjust speed
              repeat: Infinity,
            }}
            display="flex"
            gap={"15px"}
          >
            {[...images, ...images].map((src, index) => (
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
                  src={src}
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
      <Button variant="outline" rightIcon={<IconChevronDown />} mt={4}>
        Бүх брэнд харах
      </Button>
    </VStack>
  );
};
