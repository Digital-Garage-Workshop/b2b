"use client";
import { Faqs } from "@/_services";
import { UseApi } from "@/hooks";
import {
  grey200,
  grey500,
  grey600,
  grey700,
  primaryGradient,
} from "@/theme/colors";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

const faq = [
  {
    name: "Хэрэглэгчид И-баримт өгдөг yy ?",
    desc: "Хэрэглэгч та захиалгын төлбөрөө бэлэн мөнгөөр төлөх боломжгүй, харин бүх төрлийн интернэт банк болон бусад төлбөрийн аппликейшн ашиглан төлбөрөө төлөх боломжтой.",
  },
  {
    name: "Захиалгын төлбөрөө хэрхэн төлөх вэ?",
    desc: "Хэрэглэгч та захиалгын төлбөрөө бэлэн мөнгөөр төлөх боломжгүй, харин бүх төрлийн интернэт банк болон бусад төлбөрийн аппликейшн ашиглан төлбөрөө төлөх боломжтой.",
  },
  {
    name: "Санал, сэтгэгдэл, гомдлоо хэрхэн мэдээллэх вэ?",
    desc: "Хэрэглэгч та захиалгын төлбөрөө бэлэн мөнгөөр төлөх боломжгүй, харин бүх төрлийн интернэт банк болон бусад төлбөрийн аппликейшн ашиглан төлбөрөө төлөх боломжтой.",
  },
  {
    name: "Хүргэлтийн дэлгэрэнгүй мэдээллийг хэрхэн мэдээллэх вэ?",
    desc: "Хэрэглэгч та захиалгын төлбөрөө бэлэн мөнгөөр төлөх боломжгүй, харин бүх төрлийн интернэт банк болон бусад төлбөрийн аппликейшн ашиглан төлбөрөө төлөх боломжтой.",
  },
];

export const Faq = () => {
  const [selected, setSelected] = useState("");
  const [selectedId, setSelectedid] = useState(0);
  const [{ data: faqs, isLoading: faqLoader }, getFaqs] = UseApi({
    service: Faqs,
  });

  useEffect(() => {
    getFaqs();
  }, []);

  useEffect(() => {
    if (faqs) setSelected(faqs[0].title);
  }, [faqs]);

  return (
    <VStack w="60%" gap={0} align="center" pos="relative">
      <Stack
        backgroundImage={"/decoration.svg"}
        h={236}
        w={236}
        pos="relative"
        right={-250}
        top={"-70px"}
      />
      <VStack w="full" pos="absolute" top={0}>
        <Stack w={10} h="3px" bg="#F75B00" />
        <Text variant="h5">Түгээмэл асуулт хариултууд</Text>
        <Text maxW={564} textAlign="center" color={grey600} variant="body1">
          Lorem ipsum dolor sit amet consectetur adipiscing elit tortor eu
          egestas morbi sem vulputate etiam facilisis.
        </Text>
      </VStack>
      <VStack gap={8} w="full" mt={"-68px"}>
        <HStack w="full" gap={0}>
          {faqs?.map((item: any, index: number) => (
            <Button
              key={index}
              flex={1}
              variant="ghost"
              p="8px 16px"
              onClick={() => {
                setSelected(item.title);
                setSelectedid(item.categoryid - 1);
              }}
              borderRadius={0}
              color={grey500}
              borderBottom={`1px solid ${
                selected === item?.title ? grey500 : grey200
              }`}
            >
              <Text variant={selected === item?.title ? "subtitle3" : "body3"}>
                {item?.title}
              </Text>
            </Button>
          ))}
        </HStack>
        <Accordion
          gap={4}
          allowMultiple
          w="full"
          transition="height 1s ease-in-out"
        >
          <VStack gap={4}>
            {faqs?.[selectedId]?.faqs?.map((item: any, index: any) => (
              <AccordionItem
                key={index}
                w="full"
                borderRadius={8}
                border={`1px solid ${grey200}`}
                p={"20px 24px"}
                // animation={"ease-in-out"}
                // transitionDuration={"4s"}
                transition="height 1s ease-in-out"
              >
                <h2>
                  <AccordionButton
                    w="full"
                    _hover={{ background: "none" }}
                    p={0}
                  >
                    <Box as="span" textAlign="left" w="full" p={0}>
                      <Text variant={"title2"} color={grey700}>
                        {item.question}
                      </Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pl={-4} w="full" pb={-4}>
                  <Text variant="body3" color={grey600}>
                    {item.answer}
                  </Text>
                </AccordionPanel>
              </AccordionItem>
            ))}
          </VStack>
        </Accordion>
      </VStack>
      <Stack
        pos="absolute"
        w="2px"
        h={247}
        bg={primaryGradient}
        left={-160}
        top={63}
        opacity={0.6}
      />
      <Stack
        pos="absolute"
        w="2px"
        h={247}
        bg={primaryGradient}
        left={-181}
        top={97}
        opacity={0.6}
      />
    </VStack>
  );
};
