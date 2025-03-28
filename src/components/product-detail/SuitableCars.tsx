"use client";
import {
  SuitableCarBrand,
  SuitableCarEngine,
  SuitableCarModel,
} from "@/_services";
import { UseApi } from "@/hooks";
import {
  Stack,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Skeleton,
} from "@chakra-ui/react";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo } from "react";

interface CarBrand {
  manuid: string;
  name: string;
}

interface CarModel {
  modelid: string;
  modelname: string;
}

interface CarEngine {
  name: string;
  fueltype: string;
  ccm: string;
  cylinder: string;
  motorcode: string;
}

export const SuitableCars = () => {
  const { articleid } = useParams() as { articleid: string };

  const [{ data: brands = [], isLoading: brandsLoading }, fetchBrands] = UseApi<
    CarBrand[]
  >({
    service: SuitableCarBrand,
  });

  const [{ data: models = [], isLoading: modelsLoading }, fetchModels] = UseApi<
    CarModel[]
  >({
    service: SuitableCarModel,
  });

  const [{ data: engines = [], isLoading: enginesLoading }, fetchEngines] =
    UseApi<CarEngine[]>({
      service: SuitableCarEngine,
    });

  const [expandedBrandIndex, setExpandedBrandIndex] = useState<number | null>(
    null
  );
  const [expandedModelIndex, setExpandedModelIndex] = useState<number | null>(
    null
  );

  const hasData = useMemo(() => brands && brands.length > 0, [brands]);

  useEffect(() => {
    if (articleid) {
      fetchBrands({ articleId: articleid });
    }
  }, [articleid]);

  useEffect(() => {
    if (expandedBrandIndex !== null && brands[expandedBrandIndex]) {
      fetchModels({
        articleId: articleid,
        manuid: brands[expandedBrandIndex].manuid,
      });
      // Reset model selection when brand changes
      setExpandedModelIndex(null);
    }
  }, [expandedBrandIndex, articleid, brands]);

  useEffect(() => {
    if (
      expandedBrandIndex !== null &&
      expandedModelIndex !== null &&
      brands[expandedBrandIndex] &&
      models[expandedModelIndex]
    ) {
      fetchEngines({
        articleId: articleid,
        manuid: brands[expandedBrandIndex].manuid,
        modelid: models[expandedModelIndex].modelid,
      });
    }
  }, [expandedModelIndex, expandedBrandIndex, articleid, brands, models]);

  if (brandsLoading) {
    return (
      <Stack w="full" gap={4} pt={10} maxH={500} overflow="auto">
        <Text fontSize={20} fontWeight={600}>
          Дараах машинуудад тохирно
        </Text>
        {Array(3)
          .fill("")
          .map((_, index) => (
            <Skeleton key={index} width="full" height={40} my={2} />
          ))}
      </Stack>
    );
  }

  if (!hasData) {
    return null;
  }

  return (
    <Stack w="full" gap={4}>
      <Text variant="h7">Дараах машинуудад тохирно</Text>
      <Stack w="full" gap={4} maxH={500} overflow="auto">
        <Accordion
          allowToggle
          onChange={(index) =>
            setExpandedBrandIndex(typeof index === "number" ? index : null)
          }
          sx={{
            borderLeft: "1px solid #D0D5DD",
            borderRight: "1px solid #D0D5DD",
          }}
        >
          {brands?.map((brand: any, brandIndex: number) => (
            <AccordionItem
              key={brand.manuid}
              borderTop="1px solid #D0D5DD"
              borderBottom={
                brandIndex === brands.length - 1
                  ? "1px solid #D0D5DD"
                  : undefined
              }
            >
              <AccordionButton gap={2}>
                <AccordionIcon color="#F75B00" />
                <Box as="span" flex="1" textAlign="left" fontWeight="600">
                  {brand.name}
                </Box>
              </AccordionButton>

              <AccordionPanel pb={4} borderTop="1px solid #D0D5DD">
                {modelsLoading ? (
                  <Text fontSize="sm">Уншиж байна...</Text>
                ) : (
                  <Accordion
                    allowToggle
                    onChange={(index) =>
                      setExpandedModelIndex(
                        typeof index === "number" ? index : null
                      )
                    }
                  >
                    {models?.map((model: any, modelIndex: number) => (
                      <AccordionItem key={model.modelid} border="none">
                        <AccordionButton gap="8px">
                          <AccordionIcon color="#F75B00" />
                          <Box as="span" flex="1" textAlign="left">
                            <Text fontWeight={600} fontSize={14}>
                              {model.modelname}
                            </Text>
                          </Box>
                        </AccordionButton>

                        <AccordionPanel pb={4}>
                          {expandedModelIndex === modelIndex ? (
                            enginesLoading ? (
                              <Text fontSize="sm">Уншиж байна...</Text>
                            ) : (
                              <Box borderLeft="1px solid #D0D5DD" ml={2}>
                                {engines?.length > 0 ? (
                                  engines.map(
                                    (engine: any, engineIndex: number) => (
                                      <Box key={engineIndex} pl={5} mb={2}>
                                        <Text fontSize="sm" color="gray.700">
                                          {engine.name}: Түлшний төрөл -{" "}
                                          {engine.fueltype}, Эзлэхүүн -{" "}
                                          {engine.ccm}, Цилиндр -{" "}
                                          {engine.cylinder}, Хөдөлгүүр № -{" "}
                                          {engine.motorcode}
                                        </Text>
                                      </Box>
                                    )
                                  )
                                ) : (
                                  <Text pl={5} fontSize="sm" color="gray.500">
                                    Мэдээлэл олдсонгүй
                                  </Text>
                                )}
                              </Box>
                            )
                          ) : null}
                        </AccordionPanel>
                      </AccordionItem>
                    ))}
                  </Accordion>
                )}
              </AccordionPanel>
            </AccordionItem>
          ))}
        </Accordion>
      </Stack>
    </Stack>
  );
};
