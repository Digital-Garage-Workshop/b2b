"use client";
import { PlateTemplate } from "@/icons";
import { removeCar, selectCar } from "@/redux/slices/carSlice";
import { grey200, primary } from "@/theme/colors";
import {
  Button,
  Checkbox,
  HStack,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { IconTrash } from "@tabler/icons-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";

export const CarInfoCard = (props: { car: any }) => {
  const searchParams = useSearchParams();
  const dispatch = useDispatch();
  const router = useRouter();
  const carid = searchParams?.get("car") || null;
  const { car } = props;
  const isSelected = carid === car?.carid;

  const handleCarClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const searchParams = new URLSearchParams(window.location.search);

    if (isSelected) {
      searchParams.delete("car");

      const newQueryString = searchParams.toString();

      if (newQueryString) {
        router.push(`?${newQueryString}`);
      } else {
        router.push(window.location.pathname);
      }
    } else {
      searchParams.set("car", car.carid);

      router.push(`?${searchParams.toString()}`);
    }
  };

  return (
    <HStack
      w="100%"
      border={`1px solid ${isSelected ? primary : grey200}`}
      p={4}
      borderRadius={8}
      align="flex-start"
      justify={"space-between"}
      cursor="pointer"
      onClick={handleCarClick}
    >
      <HStack gap={4} align="flex-start" w={"100%"}>
        <Checkbox isChecked={isSelected} />
        <VStack ml={2} align="flex-start">
          <HStack
            borderRadius={3}
            border="1px solid black"
            top={0}
            left={0}
            p={1}
            h={"32px"}
            w={14}
            gap={1}
            pos={"relative"}
          >
            <Stack alignSelf={"flex-end"} justifySelf={"flex-end"}>
              <PlateTemplate />
            </Stack>
            <Text
              fontSize={10}
              fontWeight={700}
              wordBreak="break-word"
              maxW={"27px"}
            >
              {car?.plate || "**** AAA"}
            </Text>

            <Stack pos={"absolute"} right={0.5} bottom={1.5}>
              <svg
                width="10"
                height="8"
                viewBox="0 0 10 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M8.875 3C8.875 3.77363 8.40463 4.48932 7.61264 5.01731C6.82153 5.54473 5.7214 5.875 4.5 5.875C3.2786 5.875 2.17848 5.54473 1.38736 5.01731C0.595365 4.48932 0.125 3.77363 0.125 3C0.125 2.22637 0.595365 1.51068 1.38736 0.982686C2.17848 0.455274 3.2786 0.125 4.5 0.125C5.7214 0.125 6.82153 0.455274 7.61264 0.982686C8.40463 1.51068 8.875 2.22637 8.875 3Z"
                  fill="white"
                  stroke="black"
                  strokeWidth="0.25"
                />
                <path
                  d="M1.10795 1.81818H1.4233L2.16477 3.62926H2.19034L2.93182 1.81818H3.24716V4H3V2.34233H2.97869L2.29688 4H2.05824L1.37642 2.34233H1.35511V4H1.10795V1.81818ZM5.50701 1.81818V4H5.25133L4.06241 2.28693H4.0411V4H3.7769V1.81818H4.03258L5.22576 3.53551H5.24707V1.81818H5.50701ZM7.52717 2.5C7.50373 2.42827 7.47283 2.36399 7.43448 2.30717C7.39684 2.24964 7.35174 2.20064 7.29918 2.16016C7.24734 2.11967 7.18839 2.08878 7.12234 2.06747C7.05629 2.04616 6.98384 2.03551 6.90501 2.03551C6.77575 2.03551 6.6582 2.06889 6.55238 2.13565C6.44656 2.20241 6.36239 2.30078 6.29989 2.43075C6.23739 2.56072 6.20614 2.72017 6.20614 2.90909C6.20614 3.09801 6.23775 3.25746 6.30096 3.38743C6.36417 3.5174 6.44975 3.61577 6.55771 3.68253C6.66566 3.74929 6.78711 3.78267 6.92205 3.78267C7.04705 3.78267 7.15714 3.75604 7.25231 3.70277C7.34819 3.64879 7.42276 3.5728 7.47603 3.47479C7.53001 3.37607 7.557 3.25994 7.557 3.12642L7.63796 3.14347H6.98171V2.90909H7.81268V3.14347C7.81268 3.32315 7.77433 3.4794 7.69762 3.61222C7.62163 3.74503 7.51651 3.84801 7.38228 3.92116C7.24876 3.99361 7.09535 4.02983 6.92205 4.02983C6.72887 4.02983 6.55913 3.98438 6.41282 3.89347C6.26722 3.80256 6.15359 3.6733 6.07191 3.50568C5.99094 3.33807 5.95046 3.1392 5.95046 2.90909C5.95046 2.73651 5.97354 2.58132 6.01971 2.44354C6.06658 2.30504 6.13263 2.18714 6.21786 2.08984C6.30309 1.99254 6.40394 1.91797 6.52042 1.86612C6.6369 1.81428 6.76509 1.78835 6.90501 1.78835C7.02006 1.78835 7.12731 1.80575 7.22674 1.84055C7.32688 1.87464 7.41602 1.9233 7.49414 1.98651C7.57298 2.04901 7.63867 2.12393 7.69123 2.21129C7.74379 2.29794 7.78001 2.39418 7.79989 2.5H7.52717Z"
                  fill="black"
                />
              </svg>
            </Stack>
          </HStack>
          <Stack maxW={{ md: "280px", xl: "280px", "2xl": 350 }}>
            <Text
              variant="title2"
              overflow="hidden"
              textOverflow="ellipsis"
              whiteSpace="nowrap"
            >
              {car?.manuName} {car?.modelName} {car?.engine}
            </Text>
          </Stack>
          <HStack>
            <Text variant="body3">Аралын дугаар:</Text>
            <Text variant="body3">{car?.vin || "JTM HX05J604120328"}</Text>
          </HStack>
        </VStack>
      </HStack>
      <Button
        variant="ghost"
        p="6px"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          dispatch(removeCar(car?.carid));
          const searchParams = new URLSearchParams(window.location.search);

          searchParams.delete("car");

          const newQueryString = searchParams.toString();

          if (newQueryString) {
            router.push(`?${newQueryString}`);
          } else {
            router.push(window.location.pathname);
          }
        }}
      >
        <IconTrash />
      </Button>
    </HStack>
  );
};
