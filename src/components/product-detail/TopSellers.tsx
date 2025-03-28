"use client";
import { grey100, grey50 } from "@/theme/colors";
import {
  Box,
  Flex,
  IconButton,
  Skeleton,
  Text,
  VStack,
} from "@chakra-ui/react";
import { PartCard } from "../cards";
import { UseApi } from "@/hooks";
import { PopularPart } from "@/_services";
import { useEffect, useState, useRef } from "react";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";

export const TopSellers = () => {
  const [{ data: partsData, isLoading }, getPopularParts] = UseApi({
    service: PopularPart,
  });

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragDelta, setDragDelta] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [totalSlides, setTotalSlides] = useState(0);

  useEffect(() => {
    getPopularParts();
  }, []);

  useEffect(() => {
    if (partsData && partsData.length > 0) {
      setTotalSlides(Math.ceil(partsData.length / 4));
    }
  }, [partsData]);

  const nextSlide = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const prevSlide = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStartX(e.clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const delta = e.clientX - dragStartX;
      setDragDelta(delta);
    }
  };

  const handleMouseUp = () => {
    if (isDragging) {
      if (dragDelta > 100 && currentSlide > 0) {
        prevSlide();
      } else if (dragDelta < -100 && currentSlide < totalSlides - 1) {
        nextSlide();
      }
      setIsDragging(false);
      setDragDelta(0);
    }
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragDelta(0);
    }
  };

  const renderSlides = () => {
    if (!partsData || isLoading) {
      return (
        <Flex width="100%" gap={6}>
          {[...Array(4)].map((_, i) => (
            <Skeleton
              key={i}
              startColor={grey50}
              endColor={grey100}
              width="calc(25% - 18px)"
              height={350}
              borderRadius="md"
              flex="0 0 calc(25% - 18px)"
            />
          ))}
        </Flex>
      );
    }

    return (
      <Flex
        width={`${totalSlides * 100}%`}
        transform={`translateX(calc(${-currentSlide * (100 / totalSlides)}% + ${
          isDragging ? dragDelta : 0
        }px))`}
        transition={isDragging ? "none" : "transform 0.5s ease"}
      >
        {Array.from({ length: totalSlides }).map((_, slideIndex) => (
          <Flex key={slideIndex} width={`${100 / totalSlides}%`} gap={6} px={2}>
            {partsData
              .slice(slideIndex * 4, slideIndex * 4 + 4)
              .map((item: any, itemIndex: number) => (
                <Box key={slideIndex * 4 + itemIndex} flex="1">
                  <PartCard item={item} />
                </Box>
              ))}
            {slideIndex === totalSlides - 1 &&
              [...Array(4 - (partsData.length % 4 || 4))].map((_, i) => (
                <Box key={`empty-${i}`} flex="1" />
              ))}
          </Flex>
        ))}
      </Flex>
    );
  };

  return (
    <VStack w="full" gap={4} align="start" h={700}>
      <Text variant="h5">Top sellers in your country</Text>

      <Box pos="relative" w="full" mt={6}>
        <IconButton
          variant={"outline"}
          aria-label="Previous"
          icon={<IconChevronLeft />}
          onClick={prevSlide}
          isDisabled={currentSlide === 0}
          position="absolute"
          left={-20}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          opacity={currentSlide === 0 ? 0.5 : 1}
        />

        <Box
          ref={carouselRef}
          overflow="hidden"
          w="full"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          cursor={isDragging ? "grabbing" : "grab"}
        >
          {renderSlides()}
        </Box>

        <IconButton
          variant={"outline"}
          aria-label="Next"
          icon={<IconChevronRight />}
          onClick={nextSlide}
          isDisabled={currentSlide === totalSlides - 1}
          position="absolute"
          right={-20}
          top="50%"
          transform="translateY(-50%)"
          zIndex={2}
          opacity={currentSlide === totalSlides - 1 ? 0.5 : 1}
        />
      </Box>
    </VStack>
  );
};
