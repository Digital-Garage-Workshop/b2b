import { grey200, grey600, primaryGradient } from "@/theme/colors";
import {
  Button,
  Grid,
  HStack,
  Stack,
  StackProps,
  Text,
  VStack,
} from "@chakra-ui/react";

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

export const Statistics = (props: PartCategories) => {
  const { ...restProps } = props;
  return (
    <HStack
      w="full"
      gap={4}
      {...restProps}
      justify="space-between"
      pos="relative"
    >
      <VStack gap={4} align="flex-start" maxW={347}>
        <Stack w={10} h="3px" bg="#F75B00" />
        <Text variant="h6">Бидний цар хүрээ</Text>
        <Text>
          Бид бүгдийн хамтрал авто бизнесийн салбарт шинэ хуудсыг бичиж байна
        </Text>
      </VStack>
      <Grid templateColumns="repeat(2, 1fr)" w={448}>
        <VStack
          py={6}
          gap={4}
          borderRight={`1px solid ${grey200}`}
          borderBottom={`1px solid ${grey200}`}
        >
          <Text
            variant="h5"
            background="linear-gradient(180deg, #0B192C 0%, #6F7D90 100%)"
            color={"transparent"}
            backgroundClip="text"
            style={{ WebkitBackgroundClip: "text" }}
          >
            200+
          </Text>
          <Text variant="subtitle2" color={grey600}>
            Websites build
          </Text>
        </VStack>
        <VStack py={6} gap={4} borderBottom={`1px solid ${grey200}`}>
          <Text
            background="linear-gradient(180deg, #0B192C 0%, #6F7D90 100%)"
            color={"transparent"}
            backgroundClip="text"
            style={{ WebkitBackgroundClip: "text" }}
            fontSize={32}
            fontWeight={700}
          >
            97%
          </Text>
          <Text variant="subtitle2" color={grey600}>
            Client satisfaction
          </Text>
        </VStack>{" "}
        <VStack py={6} gap={4} borderRight={`1px solid ${grey200}`}>
          <Text
            variant="h5"
            background="linear-gradient(180deg, #0B192C 0%, #6F7D90 100%)"
            color={"transparent"}
            backgroundClip="text"
            style={{ WebkitBackgroundClip: "text" }}
          >
            34+
          </Text>
          <Text variant="subtitle2" color={grey600}>
            Repair center
          </Text>
        </VStack>{" "}
        <VStack py={6} gap={4}>
          <Text
            variant="h5"
            background="linear-gradient(180deg, #0B192C 0%, #6F7D90 100%)"
            color={"transparent"}
            backgroundClip="text"
            style={{ WebkitBackgroundClip: "text" }}
          >
            100+
          </Text>
          <Text variant="subtitle2" color={grey600}>
            Quality brands
          </Text>
        </VStack>
      </Grid>
      <Stack
        w={"2px"}
        h={206}
        opacity={0.6}
        pos={"absolute"}
        right={-20}
        bg={primaryGradient}
      />
      <Stack
        w={"2px"}
        h={206}
        opacity={0.6}
        pos={"absolute"}
        right={-16}
        bottom={0}
        bg={primaryGradient}
      />
    </HStack>
  );
};
