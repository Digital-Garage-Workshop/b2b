"use client";
import { grey200 } from "@/theme/colors";
import { HStack, Image, Stack, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";

export const ProductImage = (props: { images: any; brandlogo: any }) => {
  const { images, brandlogo } = props;
  const [selectedImage, setSelected] = useState("");

  useEffect(() => {
    if (images) {
      setSelected(images?.imgurl800 || images?.imgurl400);
    }
  }, [images]);
  return (
    <VStack w={"36%"} gap={4}>
      {brandlogo && (
        <Stack
          pos="relative"
          border={`1px solid ${grey200}`}
          borderRadius={32}
          w="full"
        >
          <Image
            src={
              brandlogo?.imgurl400 ||
              brandlogo?.imgurl200 ||
              "/home/ridexlogo.svg"
            }
            width="78px"
            height={"24px"}
            objectFit="contain"
            pos="relative"
            top="15px"
            left="23px"
          />
          <Image
            src={selectedImage || "/home/ridex.svg"}
            width="full"
            height={"404"}
            objectFit="contain"
          />
        </Stack>
      )}
      <HStack w={"full"} overflow="scroll">
        <HStack w="fit-content">
          {[
            "/home/groupridex.svg",
            "/home/sideridex.svg",
            "/home/backridex.svg",
            "/home/closeupridex.svg",
            "/home/ridex.svg",
            "/home/sideridex.svg",
          ].map((item, index) => (
            <Image
              key={index}
              src={item}
              width={20}
              height={20}
              objectFit="contain"
              borderRadius={8}
              border={`1px solid ${grey200}`}
              onClick={() => setSelected(item)}
            />
          ))}
        </HStack>
      </HStack>
    </VStack>
  );
};
