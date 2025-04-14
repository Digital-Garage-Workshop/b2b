"use client";
import {
  Button,
  Divider,
  Highlight,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconChevronDown } from "@tabler/icons-react";
import { useState, useRef, useEffect } from "react";

const attrs = [
  { attributename: "Manufacturer", attributevalue: "Ridex" },
  { attributename: "Manufacturer", attributevalue: "Ridex" },
  { attributename: "Manufacturer", attributevalue: "Ridex" },
  { attributename: "Manufacturer", attributevalue: "Ridex" },
];

export const Attributes = (props: { product: any }) => {
  const { product } = props;
  const [showMore, setShowMore] = useState(false);
  const [branchShow, setBranchShow] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  useEffect(() => {
    const checkHeight = () => {
      if (contentRef.current) {
        const contentHeight = contentRef.current.scrollHeight;
        setShowButton(contentHeight > 404);
      }
    };

    // Check on initial render
    checkHeight();

    // Also check after a short delay to ensure content is fully rendered
    const timer = setTimeout(checkHeight, 100);

    // Re-check if window is resized
    window.addEventListener("resize", checkHeight);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", checkHeight);
    };
  }, [product]);

  const attributesToShow = product?.attributes;

  return (
    <VStack align="flex-start" w="36%">
      <Text variant="subtitle2">Сэлбэгийн дугаар: {product?.articleid}</Text>
      <Text variant="h7">
        {product?.brandname} {product?.partname}
      </Text>
      <VStack
        gap={2}
        w="full"
        ref={contentRef}
        maxH={showMore ? "none" : "404px"}
        overflow={showMore ? "visible" : "hidden"}
        position="relative"
        transition="max-height 0.3s ease-in-out"
      >
        {attributesToShow?.map((attribute: any, index: number) => {
          return (
            <VStack gap={2} w="full" key={index}>
              <HStack w="full" align="start">
                <Text
                  fontSize={14}
                  fontWeight={600}
                  alignSelf="flex-start"
                  flexShrink={0}
                >
                  {`${attribute.attributename}:`}
                </Text>

                <Text fontSize={14} sx={{ wordBreak: "break-word" }}>
                  {attribute.attributevalue}
                </Text>
              </HStack>
              {index !== attributesToShow.length - 1 && (
                <Divider borderColor="#CFCFCF" />
              )}
            </VStack>
          );
        })}
        <Divider
          borderColor="#CFCFCF"
          display={product?.description ? "flex" : "none"}
        />
        {product?.description && (
          <VStack gap={2} w="full">
            <HStack w="full" align="start">
              <Text fontSize={14} alignSelf="flex-start">
                <Highlight
                  query="Дэлгэрэнгүй:"
                  styles={{ fontWeight: 600 }}
                >{`Дэлгэрэнгүй: {data?.description} Description: 2.2 D (952AEM250, 952AEA250) (46335975, 55275156, 55284636), year of manufacture 08.2018 - ..., 2143 cc, 160 hp 2.2 D (952AEM250, 952AEA250) (46335975, 55275156, 55284636), year of manufacture 08.2018 - ..., 2143 cc, 160 hp 2.2 D (952AEM250, 952AEA250) (46335975, 55275156, 55284636), year of manufacture 08.2018 - ..., 2143 cc, 160 hp... Description: 2.2 D (952AEM250, 952AEA250) (46335975, 55275156, 55284636), year of manufacture 08.2018 - ..., 2143 cc, 160 hp 2.2 D `}</Highlight>
              </Text>
            </HStack>
            <Divider borderColor="#CFCFCF" />
          </VStack>
        )}

        {!showMore && showButton && (
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50px",
              background:
                "linear-gradient(to bottom, rgba(255,255,255,0), rgba(255,255,255,1))",
            }}
          />
        )}
      </VStack>

      {showButton && (
        <Button
          p="8px 14px"
          rightIcon={
            <IconChevronDown
              color="#1e1e1e"
              size={20}
              style={{
                transform: showMore ? "rotate(180deg)" : "rotate(0deg)",
                transition: "transform 0.3s ease-in-out",
              }}
            />
          }
          variant="ghost"
          alignSelf="center"
          onClick={handleShowMore}
        >
          {showMore ? "Хураах" : "Илүүг харах"}
        </Button>
      )}
    </VStack>
  );
};
