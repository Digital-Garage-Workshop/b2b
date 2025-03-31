"use client";
import { grey100, grey25 } from "@/theme/colors";
import { VStack, Stack, HStack, Divider, Heading } from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

interface Image {
  imgurl400?: string;
  imgurl800?: string;
}

interface CategoryData {
  item: any;
}

export const CategoryCard = (props: CategoryData) => {
  const { item } = props;

  return (
    <Link
      href={`/product-list/${item.categoryid}?part=${item.name}`}
      style={{ width: "100%" }}
    >
      <VStack
        borderRadius={8}
        top={0}
        w="full"
        h={264}
        padding="16px 8px"
        gap="16px"
        alignItems="center"
        bg={grey25}
        border={`2px solid ${grey100}`}
        _hover={{
          border: "2px solid #F75B00",
          transition: "border-color 300ms ease",
        }}
      >
        <Stack h="120px" w="121px" position="relative">
          <Image
            src={item?.image || "/home/tires/svg"}
            alt={`${item?.name}`}
            width={121}
            height={120}
            loading="lazy"
          />
        </Stack>

        <HStack width={"100%"}>
          <Divider borderColor={"#E4E7EC"} w={"45%"} />
          <Stack borderRadius="full" border="1px solid #F75B00">
            <IconChevronDown color="#F75B00" size={16} />
          </Stack>
          <Divider w={"45%"} borderColor={"#E4E7EC"} />
        </HStack>
        <Heading
          fontWeight={700}
          fontSize={14}
          lineHeight={"150%"}
          textAlign="center"
          w={40}
          h={12}
          overflow="flex"
          textOverflow="flex"
          whiteSpace={"normal"}
        >
          {item?.name}
        </Heading>
      </VStack>
    </Link>
  );
};
