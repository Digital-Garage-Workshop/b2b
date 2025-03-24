"use client";

import { VStack, Stack, HStack, Divider, Heading } from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import Image from "next/image";

interface Image {
  imgurl400?: string;
  imgurl800?: string;
}

interface CategoryData {
  name: string;
  image: Image;
}

export const CategoryCard = (props: CategoryData) => {
  const { name, image } = props;

  return (
    <VStack
      borderRadius={8}
      top={0}
      w="full"
      h={264}
      padding="16px 8px"
      gap="16px"
      alignItems="center"
      bg="white"
      border="1px solid transparent"
      _hover={{
        border: "1px solid #F75B00",
        transition: "border-color 300ms ease",
      }}
    >
      <Stack h="120px" w="121px" position="relative">
        <Image
          src={image.imgurl800 || image.imgurl400 || "/home/tires/svg"}
          alt={`${name}`}
          width={100}
          height={100}
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
        {name}
      </Heading>
    </VStack>
  );
};
