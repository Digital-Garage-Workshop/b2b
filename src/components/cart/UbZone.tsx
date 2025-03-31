"use client";
import { GetDistricts, GetKhoroo } from "@/_services/user";
import { UseApi } from "@/hooks";
import {
  FormHelperText,
  Grid,
  Highlight,
  Input,
  Select,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useEffect } from "react";

export const UbZone = ({ formik }: { formik: any }) => {
  const [{ data: districts, isLoading: districtLoading }, getDistricts] =
    UseApi({
      service: GetDistricts,
    });

  const [{ data: khoroos, isLoading: khorooLoading }, getKhoroo] = UseApi({
    service: GetKhoroo,
  });

  useEffect(() => {
    getDistricts();
  }, []);

  useEffect(() => {
    if (formik.values.district) {
      getKhoroo({ locationid: formik.values.district });
    }
  }, [formik.values.district]);

  return (
    <VStack w="full" gap={4}>
      <Grid w="full" templateColumns="repeat(3, 1fr)" rowGap={4} columnGap={4}>
        <VStack gap="6px" align="flex-start">
          <Text variant="subtitle3">
            <Highlight query="*" styles={{ color: "#D92D20" }}>
              Утасны дугаар *
            </Highlight>
          </Text>
          <Input
            name="phoneNumber"
            flex={1}
            py={0}
            placeholder="+976"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            isInvalid={formik.touched.phoneNumber && formik.errors.phoneNumber}
            onBlur={formik.handleblur}
            type="number"
            maxLength={8}
          />
          {formik.touched.phoneNumber && formik.errors.phoneNumber && (
            <Text fontSize={12} color="#D72C0D">
              {formik.errors.phoneNumber}
            </Text>
          )}
        </VStack>

        <VStack gap="6px" align="flex-start">
          <Text variant="subtitle3">
            <Highlight query="*" styles={{ color: "#D92D20" }}>
              Дүүрэг *
            </Highlight>
          </Text>
          <Select
            name="district"
            value={formik.values.district || ""}
            onChange={formik.handleChange}
            isDisabled={districtLoading}
            placeholder="Сонгоно уу"
            h="44px"
            onBlur={formik.handleblur}
          >
            {districts?.map(
              (item: { name: string; locationid: number }, index: number) => (
                <option
                  key={`district-${item.locationid}`}
                  value={item.locationid}
                  style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
                >
                  {item.name}
                </option>
              )
            )}
          </Select>
          {formik.touched.district && formik.errors.district && (
            <Text fontSize={12} color="#D72C0D">
              {formik.errors.district}
            </Text>
          )}
        </VStack>

        <VStack gap="6px" align="flex-start">
          <Text variant="subtitle3">
            <Highlight query="*" styles={{ color: "#D92D20" }}>
              Хороо *
            </Highlight>
          </Text>
          <Select
            name="khoroo"
            value={formik.values.khoroo || ""}
            onChange={formik.handleChange}
            isDisabled={khorooLoading || !formik.values.district}
            placeholder="Сонгоно уу"
            h="44px"
            onBlur={formik.handleblur}
          >
            {khoroos?.map(
              (item: { name: string; locationid: number }, index: number) => (
                <option
                  key={`khoroo-${item.locationid}`}
                  value={item.locationid}
                  style={{ fontWeight: 700, fontSize: 18, color: "#1E1E1E" }}
                >
                  {item.name}
                </option>
              )
            )}
          </Select>
          {formik.touched.khoroo && formik.errors.khoroo && (
            <Text fontSize={12} color="#D72C0D">
              {formik.errors.khoroo}
            </Text>
          )}
        </VStack>
      </Grid>

      <VStack gap="6px" align="flex-start" w="full">
        <Text variant="subtitle3">Дэлгэрэнгүй хаяг (заавал биш)</Text>
        <Input
          name="moreInfo"
          flex={1}
          placeholder="Энд мессежээ бичнэ үү..."
          value={formik.values.moreInfo || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          variant="custom"
          background="var(--Primary-White, #FFF)"
          _focus={{
            outline: "none",
          }}
        />
      </VStack>
    </VStack>
  );
};
