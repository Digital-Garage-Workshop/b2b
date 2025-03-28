"use client";
import { grey100, grey200, grey600 } from "@/theme/colors";
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
                  bg={grey100}
                  borderRadius={8}
                  h={226}
                  w="full"
                />
              ))
          : categories?.map((item: any, index: number) => (
              <CategoryCard key={index} item={item} />
            ))}
      </Grid>
      <Button variant="outline" rightIcon={<IconChevronDown />} mt={4}>
        Катлогийн дэлгэрэнгүй
      </Button>
    </VStack>
  );
};
